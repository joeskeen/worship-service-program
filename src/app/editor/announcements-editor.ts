import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { ProgramService } from '../services/program.service';
import { EditorSection } from './editor-section';
import { emptyAnnouncement, emptyContact } from '../models/program.model';

@Component({
  selector: 'app-announcements-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FormRoot, EditorSection],
  template: `
    <app-editor-section title="Announcements & Contacts">
      <form [formRoot]="form">
        <h4>Announcements</h4>
        @for (ann of form.announcements; track ann; let i = $index) {
          <fieldset class="block">
            <legend>
              <span class="idx">#{{ i + 1 }}</span>
              <button type="button" class="remove" (click)="removeAnnouncement(i)" aria-label="Remove">×</button>
            </legend>
            <label class="full">Title (optional)<input type="text" [formField]="ann.title" /></label>
            <label class="full">Body<textarea rows="3" [formField]="ann.body"></textarea></label>
            <label>Link URL<input type="text" [formField]="ann.link" placeholder="mailto: or tel:" /></label>
            <label>Link Text<input type="text" [formField]="ann.linkLabel" /></label>
          </fieldset>
        }
        <button type="button" class="add" (click)="addAnnouncement()">+ Add Announcement</button>

        <h4>External Events</h4>
        <label>Note (optional)<input type="text" [formField]="form.externalEventsNote" /></label>
        <label class="full">URL<input type="text" [formField]="form.externalEventsUrl" /></label>

        <h4>Ward Leadership &amp; Contacts</h4>
        @for (c of form.contacts; track c; let i = $index) {
          <fieldset class="block">
            <legend>
              <span class="idx">Contact {{ i + 1 }}</span>
              <button type="button" class="remove" (click)="removeContact(i)" aria-label="Remove">×</button>
            </legend>
            <label class="full">Role<input type="text" [formField]="c.role" /></label>
            <label class="full">Name<input type="text" [formField]="c.name" /></label>
            <label>Phone<input type="text" [formField]="c.phone" /></label>
            <label>Email<input type="text" [formField]="c.email" /></label>
          </fieldset>
        }
        <button type="button" class="add" (click)="addContact()">+ Add Contact</button>
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
    .block label.full { grid-column: 1 / -1; }
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
    form > label {
      display: flex;
      flex-direction: column;
      gap: .2rem;
      font-size: .78rem;
      color: var(--brown-mid);
      font-family: 'Cinzel', serif;
      letter-spacing: .05em;
      margin-top: .4rem;
    }
    form > label.full { width: 100%; }
    form > label input {
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
export class AnnouncementsEditor {
  private readonly programService = inject(ProgramService);
  protected readonly form = form(this.programService.model);

  protected addAnnouncement(): void {
    this.programService.model.update((p) => ({
      ...p,
      announcements: [...p.announcements, emptyAnnouncement()],
    }));
  }

  protected removeAnnouncement(index: number): void {
    this.programService.model.update((p) => ({
      ...p,
      announcements: p.announcements.filter((_, i) => i !== index),
    }));
  }

  protected addContact(): void {
    this.programService.model.update((p) => ({
      ...p,
      contacts: [...p.contacts, emptyContact()],
    }));
  }

  protected removeContact(index: number): void {
    this.programService.model.update((p) => ({
      ...p,
      contacts: p.contacts.filter((_, i) => i !== index),
    }));
  }
}
