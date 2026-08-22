import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { ProgramService } from '../services/program.service';
import { EditorSection } from './editor-section';
import { emptyServiceTime } from '../models/program.model';
import { COVER_IMAGE_OPTIONS } from '../services/data/cover-images';

@Component({
  selector: 'app-cover-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FormRoot, EditorSection],
  template: `
    <app-editor-section title="Cover & Leadership">
      <form [formRoot]="coverForm">
        <div class="grid">
          <label class="full">
            Church Name
            <textarea rows="3" [formField]="coverForm.cover.churchName"></textarea>
          </label>
          <label>
            Ward Name
            <input type="text" [formField]="coverForm.cover.wardName" />
          </label>
          <label>
            Date
            <input type="text" [formField]="coverForm.cover.date" placeholder="Sunday, August 16, 2026" />
          </label>
          <label class="full">
            Cover Image (optional)
            <select (change)="onCoverSelect($any($event.target).value)">
              @for (opt of options; track opt.url) {
                <option [value]="opt.url" [selected]="opt.url === currentSelection()">{{ opt.label }}</option>
              }
            </select>
            @if (showCustom()) {
              <input
                type="text"
                [value]="coverForm.cover.coverImage().value()"
                (input)="onCustomUrl($any($event.target).value)"
                placeholder="https://www.churchofjesuschrist.org/imgs/..."
              />
              <small class="hint">Paste any image URL (Gospel Art, your own CDN, etc.). Cross-origin URLs are kept as references in the HTML export; relative paths are inlined.</small>
            } @else {
              <small class="hint">Pre-selected images are hosted on the Church's media CDN and are appropriate for ward bulletins. Or pick "Custom URL…" to use your own image.</small>
            }
          </label>
          <label class="full">
            Scripture / Quote
            <textarea rows="3" [formField]="coverForm.cover.scripture"></textarea>
          </label>
          <label class="full">
            Scripture Reference
            <input type="text" [formField]="coverForm.cover.scriptureRef" placeholder="-- Author" />
          </label>
        </div>

        <h4>Service Times</h4>
        <div class="times">
          @for (t of coverForm.cover.times; track t; let i = $index) {
            <div class="row">
              <input type="text" [formField]="t.label" placeholder="Sacrament Meeting" />
              <input type="text" [formField]="t.time" placeholder="12:00 pm" />
              <button type="button" class="remove" (click)="removeTime(i)" aria-label="Remove time">×</button>
            </div>
          }
          <button type="button" class="add" (click)="addTime()">+ Add Service Time</button>
        </div>

        <h4>Leadership</h4>
        <div class="grid">
          <label>Presiding<input type="text" [formField]="coverForm.leadership.presiding" /></label>
          <label>Conducting<input type="text" [formField]="coverForm.leadership.conducting" /></label>
          <label>Organist<input type="text" [formField]="coverForm.leadership.organist" /></label>
          <label>Chorister<input type="text" [formField]="coverForm.leadership.chorister" /></label>
        </div>
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
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .65rem;
    }
    .grid label { display: flex; flex-direction: column; gap: .2rem; font-size: .78rem; color: var(--brown-mid); font-family: 'Cinzel', serif; letter-spacing: .05em; }
    .grid label.full { grid-column: 1 / -1; }
    .grid label small.hint {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: .75rem;
      color: var(--brown-mid);
      letter-spacing: normal;
      text-transform: none;
      font-style: italic;
      line-height: 1.4;
      margin-top: .15rem;
    }
    .times { display: flex; flex-direction: column; gap: .5rem; }
    input, textarea, select {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: .95rem;
      padding: .35rem .5rem;
      border: 1px solid var(--rule);
      border-radius: 3px;
      background: #fff;
      color: var(--text);
      letter-spacing: normal;
      text-transform: none;
      width: 100%;
    }
    select { font-family: 'Cinzel', serif; font-size: .85rem; letter-spacing: .05em; }
    textarea { resize: vertical; min-height: 3rem; }
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: .5rem;
      align-items: center;
    }
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
      font-size: .85rem;
      font-family: 'Cinzel', serif;
      letter-spacing: .1em;
      text-transform: uppercase;
      &:hover { color: var(--brown); border-color: var(--brown); }
    }
  `,
})
export class CoverEditor {
  private readonly programService = inject(ProgramService);
  protected readonly coverForm = form(this.programService.model);
  protected readonly options = COVER_IMAGE_OPTIONS;

  /** The current URL in the model, mapped to whichever option matches (or '__custom__' / ''). */
  protected readonly currentSelection = computed(() => {
    const url = this.programService.model().cover.coverImage;
    if (!url) return '';
    if (COVER_IMAGE_OPTIONS.some((o) => o.url === url && o.url !== '__custom__')) return url;
    return '__custom__';
  });

  protected readonly showCustom = computed(() => this.currentSelection() === '__custom__');

  onCoverSelect(value: string): void {
    if (value === '__custom__') {
      // Don't clear the model; just leave it as-is so the URL field shows the current value.
      return;
    }
    this.programService.model.update((p) => ({
      ...p,
      cover: { ...p.cover, coverImage: value },
    }));
  }

  onCustomUrl(value: string): void {
    this.programService.model.update((p) => ({
      ...p,
      cover: { ...p.cover, coverImage: value },
    }));
  }

  addTime(): void {
    this.programService.model.update((p) => ({
      ...p,
      cover: { ...p.cover, times: [...p.cover.times, emptyServiceTime()] },
    }));
  }

  removeTime(index: number): void {
    this.programService.model.update((p) => ({
      ...p,
      cover: { ...p.cover, times: p.cover.times.filter((_, i) => i !== index) },
    }));
  }
}
