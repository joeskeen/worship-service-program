import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Field, FormField, FormRoot, form } from '@angular/forms/signals';
import { ProgramService } from '../services/program.service';
import { EditorSection } from './editor-section';
import { emptyCalendarEvent, emptyInfoBlock } from '../models/program.model';

@Component({
  selector: 'app-calendar-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FormRoot, EditorSection],
  template: `
    <app-editor-section title="Calendar">
      <form [formRoot]="form">
        <h4>Events</h4>
        @for (ev of form.calendar; track ev; let i = $index) {
          <fieldset class="block">
            <legend>
              <span class="idx">{{ i + 1 }}.</span>
              <button type="button" class="remove" (click)="removeEvent(i)" aria-label="Remove">×</button>
            </legend>
            <label>Date / Range<input type="text" [formField]="ev.date" placeholder="Wednesday, August 19th" /></label>
            <label>Time<input type="text" [formField]="ev.time" placeholder="6:00 - 7:30 PM" /></label>
            <label class="full">Title<input type="text" [formField]="ev.title" /></label>
            <label class="full">Description<textarea rows="3" [formField]="ev.description"></textarea></label>
            <label class="checkbox full"><input type="checkbox" [formField]="ev.bold" /> Bold title</label>
          </fieldset>
        }
        <button type="button" class="add" (click)="addEvent()">+ Add Event</button>

        <h4>Info Blocks</h4>
        @for (block of form.infoBlocks; track block; let i = $index) {
          <fieldset class="block">
            <legend>
              <span class="idx">Block {{ i + 1 }}</span>
              <button type="button" class="remove" (click)="removeInfoBlock(i)" aria-label="Remove">×</button>
            </legend>
            <label class="full">Title<input type="text" [formField]="block.title" /></label>
            <label class="full">Body<textarea rows="3" [formField]="block.body"></textarea></label>
            <label class="full">Bullets (one per line)
              <textarea rows="4" [value]="bulletsText(block.bullets)" (input)="setBullets(block.bullets, $any($event.target).value)"></textarea>
            </label>
          </fieldset>
        }
        <button type="button" class="add" (click)="addInfoBlock()">+ Add Info Block</button>
      </form>
    </app-editor-section>
  `,
  styles: `
    h4 {
      font-family: 'Cinzel', serif;
      font-size: .72rem;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--gold);
      margin-top: .5rem;
      border-bottom: 1px solid var(--rule);
      padding-bottom: .25rem;
    }
    .block {
      border: 1px solid var(--rule);
      border-radius: 4px;
      padding: .4rem .7rem .7rem;
      margin: 0 0 .5rem;
      background: rgba(255, 255, 255, .5);
    }
    .block legend {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 .15rem;
      font-family: 'Cinzel', serif;
      color: var(--gold);
      font-size: .75rem;
      letter-spacing: .08em;
    }
    .block label {
      display: flex;
      flex-direction: column;
      gap: .2rem;
      font-size: .78rem;
      color: var(--brown-mid);
      font-family: 'Cinzel', serif;
      letter-spacing: .05em;
      margin-top: .4rem;
    }
    .block label.full { width: 100%; }
    .block label.checkbox {
      flex-direction: row;
      align-items: center;
      gap: .5rem;
      font-family: 'EB Garamond', Georgia, serif;
      letter-spacing: normal;
      color: var(--brown);
      text-transform: none;
      font-size: .85rem;
      input { width: auto; }
    }
    .block input, .block textarea {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: .95rem;
      padding: .3rem .45rem;
      border: 1px solid var(--rule);
      border-radius: 3px;
      background: #fff;
      color: var(--text);
      letter-spacing: normal;
      text-transform: none;
      width: 100%;
    }
    .block textarea { resize: vertical; min-height: 3rem; }
    .remove {
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
    .add {
      background: transparent;
      border: 1px dashed var(--rule);
      color: var(--brown-mid);
      padding: .35rem .5rem;
      border-radius: 3px;
      cursor: pointer;
      font-size: .78rem;
      font-family: 'Cinzel', serif;
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-top: .25rem;
      &:hover { color: var(--brown); border-color: var(--brown); }
    }
  `,
})
export class CalendarEditor {
  private readonly programService = inject(ProgramService);
  protected readonly form = form(this.programService.model);

  protected bulletsText(field: Field<string[]>): string {
    return (field().value() ?? []).join('\n');
  }

  protected setBullets(field: Field<string[]>, text: string): void {
    const bullets = text
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    field().value.set(bullets);
  }

  protected addEvent(): void {
    this.programService.model.update((p) => ({
      ...p,
      calendar: [...p.calendar, emptyCalendarEvent()],
    }));
  }

  protected removeEvent(index: number): void {
    this.programService.model.update((p) => ({
      ...p,
      calendar: p.calendar.filter((_, i) => i !== index),
    }));
  }

  protected addInfoBlock(): void {
    this.programService.model.update((p) => ({
      ...p,
      infoBlocks: [...p.infoBlocks, emptyInfoBlock()],
    }));
  }

  protected removeInfoBlock(index: number): void {
    this.programService.model.update((p) => ({
      ...p,
      infoBlocks: p.infoBlocks.filter((_, i) => i !== index),
    }));
  }
}
