import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoverEditor } from './cover-editor';
import { OrderEditor } from './order-editor';
import { CalendarEditor } from './calendar-editor';
import { AnnouncementsEditor } from './announcements-editor';

@Component({
  selector: 'app-editor-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CoverEditor, OrderEditor, CalendarEditor, AnnouncementsEditor],
  template: `
    <div class="editor">
      <app-cover-editor />
      <app-order-editor />
      <app-calendar-editor />
      <app-announcements-editor />
    </div>
  `,
  styles: `
    :host { display: block; height: 100%; overflow-y: auto; }
    .editor {
      background: var(--cream);
      border-right: 1px solid var(--rule);
      min-height: 100%;
    }
  `,
})
export class EditorSidebar {}
