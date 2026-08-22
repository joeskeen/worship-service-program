import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Field, FormField, FormRoot, form } from '@angular/forms/signals';
import { ProgramService } from '../services/program.service';
import { EditorSection } from './editor-section';
import { emptyProgramItem, ProgramItemKind } from '../models/program.model';

const KIND_LABELS: Record<ProgramItemKind, string> = {
  hymn: 'Hymn',
  speaker: 'Speaker',
  musical: 'Musical Number',
  prayer: 'Prayer',
  business: 'Business / Announcement',
  sacrament: 'Sacrament',
  testimony: 'Testimony',
  text: 'Other Title',
};

@Component({
  selector: 'app-order-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FormRoot, EditorSection],
  template: `
    <app-editor-section title="Order of Service">
      <form [formRoot]="orderForm">
        @for (item of orderForm.orderOfService; track item; let i = $index) {
          <fieldset class="item">
            <legend>
              <span class="idx">{{ i + 1 }}.</span>
              <select [formField]="item.kind" (change)="resetItem($any($event.target).value, i)">
                @for (k of kinds; track k) {
                  <option [value]="k">{{ kindLabel(k) }}</option>
                }
              </select>
              <button type="button" class="remove" (click)="remove(i)" aria-label="Remove item">×</button>
            </legend>

            @if (kindValue(item.kind) === 'hymn' || kindValue(item.kind) === 'musical') {
              <label>Label<input type="text" [formField]="item.label" /></label>
              <label>Number<input type="text" [formField]="item.number" placeholder="#170" /></label>
              <label class="full">Title<input type="text" [formField]="item.title" /></label>
              <label class="full">Note<input type="text" [formField]="item.note" /></label>
              @if (kindValue(item.kind) === 'musical') {
                <label class="full">Lyrics (optional)<textarea rows="6" [formField]="item.lyrics"></textarea></label>
              }
            } @else if (kindValue(item.kind) === 'prayer') {
              <label>Label<input type="text" [formField]="item.label" placeholder="Invocation / Benediction" /></label>
              <label>Note<input type="text" [formField]="item.note" placeholder="As Directed" /></label>
            } @else if (kindValue(item.kind) === 'speaker') {
              <label>Role / Speaker Type<input type="text" [formField]="item.label" placeholder="Speaker / Youth Speaker" /></label>
              <label class="full">Names (one per line)
                <textarea rows="3" [value]="peopleText(item.people)" (input)="setPeople(item.people, $any($event.target).value)"></textarea>
              </label>
            } @else {
              <label class="full">Title<input type="text" [formField]="item.title" /></label>
              <label class="full">Note (optional)<input type="text" [formField]="item.note" /></label>
            }
          </fieldset>
        }
        <div class="add-row">
          <button type="button" (click)="add('hymn')">+ Hymn</button>
          <button type="button" (click)="add('speaker')">+ Speaker</button>
          <button type="button" (click)="add('musical')">+ Musical</button>
          <button type="button" (click)="add('prayer')">+ Prayer</button>
          <button type="button" (click)="add('business')">+ Business</button>
          <button type="button" (click)="add('sacrament')">+ Sacrament</button>
          <button type="button" (click)="add('text')">+ Other</button>
        </div>
      </form>
    </app-editor-section>
  `,
  styles: `
    .item {
      border: 1px solid var(--rule);
      border-radius: 4px;
      padding: .5rem .75rem .75rem;
      margin: 0;
      background: rgba(255, 255, 255, .5);
    }
    .item legend {
      display: flex;
      align-items: center;
      gap: .5rem;
      width: 100%;
      padding: 0 .25rem;
    }
    .item legend .idx {
      font-family: 'Cinzel', serif;
      color: var(--gold);
      font-size: .8rem;
      min-width: 1.5rem;
    }
    .item legend select {
      flex: 1;
      font-family: 'Cinzel', serif;
      font-size: .85rem;
      background: #fff;
      border: 1px solid var(--rule);
      border-radius: 3px;
      padding: .25rem .35rem;
      color: var(--brown);
    }
    .item legend .remove {
      background: transparent;
      border: 1px solid var(--rule);
      color: var(--brown-mid);
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 3px;
      cursor: pointer;
      font-size: 1rem;
      &:hover { color: var(--brown); border-color: var(--brown); }
    }
    .item label {
      display: flex;
      flex-direction: column;
      gap: .2rem;
      font-size: .78rem;
      color: var(--brown-mid);
      font-family: 'Cinzel', serif;
      letter-spacing: .05em;
      margin-top: .5rem;
    }
    .item label.full { width: 100%; }
    .item input, .item textarea {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: .95rem;
      padding: .3rem .45rem;
      border: 1px solid var(--rule);
      border-radius: 3px;
      background: #fff;
      color: var(--text);
      letter-spacing: normal;
      text-transform: none;
    }
    .item textarea { resize: vertical; min-height: 3rem; }
    .add-row {
      display: flex;
      flex-wrap: wrap;
      gap: .4rem;
      margin-top: .25rem;
    }
    .add-row button {
      background: transparent;
      border: 1px dashed var(--rule);
      color: var(--brown-mid);
      padding: .3rem .55rem;
      border-radius: 3px;
      cursor: pointer;
      font-size: .78rem;
      font-family: 'Cinzel', serif;
      letter-spacing: .08em;
      text-transform: uppercase;
      &:hover { color: var(--brown); border-color: var(--brown); }
    }
  `,
})
export class OrderEditor {
  private readonly programService = inject(ProgramService);
  protected readonly orderForm = form(this.programService.model);

  protected readonly kinds: ProgramItemKind[] = [
    'hymn',
    'speaker',
    'musical',
    'prayer',
    'business',
    'sacrament',
    'testimony',
    'text',
  ];

  protected kindLabel(kind: ProgramItemKind): string {
    return KIND_LABELS[kind];
  }

  protected kindValue(field: Field<ProgramItemKind>): ProgramItemKind {
    return field().value();
  }

  protected peopleText(field: Field<string[]>): string {
    return (field().value() ?? []).join('\n');
  }

  protected setPeople(field: Field<string[]>, text: string): void {
    const people = text
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    field().value.set(people);
  }

  protected resetItem(newKind: ProgramItemKind, index: number): void {
    this.programService.model.update((p) => {
      const next = [...p.orderOfService];
      next[index] = { ...emptyProgramItem(newKind) };
      return { ...p, orderOfService: next };
    });
  }

  protected add(kind: ProgramItemKind): void {
    this.programService.model.update((p) => ({
      ...p,
      orderOfService: [...p.orderOfService, emptyProgramItem(kind)],
    }));
  }

  protected remove(index: number): void {
    this.programService.model.update((p) => ({
      ...p,
      orderOfService: p.orderOfService.filter((_, i) => i !== index),
    }));
  }
}
