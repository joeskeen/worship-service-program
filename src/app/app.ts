import { DOCUMENT, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ProgramService } from './services/program.service';
import { StandaloneHtmlExportService } from './services/standalone-html-export.service';
import { EditorSidebar } from './editor/editor-sidebar';
import { ProgramPreview } from './preview/program-preview';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EditorSidebar, ProgramPreview, NgClass],
  template: `
    <div class="app-shell" [ngClass]="{ 'editor-collapsed': editorCollapsed() }">
      <header class="toolbar screen-only">
        <div class="brand">Worship Service Program</div>
        <div class="actions">
          <button type="button" (click)="toggleEditor()">
            {{ editorCollapsed() ? 'Show Editor' : 'Hide Editor' }}
          </button>
          <button type="button" (click)="exportJson()">Export JSON</button>
          <button type="button" (click)="exportHtml()" [disabled]="exporting()">
            {{ exporting() ? 'Exporting…' : 'Export HTML' }}
          </button>
          <button type="button" (click)="importJson()">Import JSON</button>
          <input #fileInput class="hidden" type="file" accept="application/json" (change)="onImport($event)" />
          <button
            type="button"
            class="toggle"
            [class.active]="coloringPage()"
            (click)="toggleColoringPage()"
            [attr.aria-pressed]="coloringPage()"
            title="When enabled, the cover image prints as a black-and-white coloring page for kids to color during the meeting."
          >
            {{ coloringPage() ? '✓ ' : '' }}Coloring Page
          </button>
          <button type="button" class="primary" (click)="print()">Print / Save as PDF</button>
          <button type="button" class="danger" (click)="reset()">Reset</button>
        </div>
      </header>
      <main class="main">
        <aside class="sidebar screen-only">
          <app-editor-sidebar />
        </aside>
        <section class="preview" #preview>
          <app-program-preview />
        </section>
      </main>
    </div>
  `,
  styleUrl: './app.scss',
})
export class App {
  private readonly programService = inject(ProgramService);
  private readonly exportService = inject(StandaloneHtmlExportService);
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView!;
  protected readonly editorCollapsed = signal(false);
  protected readonly exporting = signal(false);
  protected readonly coloringPage = signal(false);
  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  private readonly preview = viewChild.required<ElementRef<HTMLElement>>('preview');

  constructor() {
    // Sync the signal with a body-level class so the @media print rules in
    // styles.scss can target .coloring-page for the line-art effect.
    this.document.documentElement.classList.toggle('coloring-page', this.coloringPage());
  }

  toggleEditor(): void {
    this.editorCollapsed.update((v) => !v);
  }

  toggleColoringPage(): void {
    const next = !this.coloringPage();
    this.coloringPage.set(next);
    this.document.documentElement.classList.toggle('coloring-page', next);
  }

  print(): void {
    this.window.print();
  }

  private filenameBase(): string {
    const ward = (this.programService.model().cover.wardName || 'program')
      .replace(/[^a-z0-9]+/gi, '-')
      .toLowerCase();
    const humanDate = this.programService.model().cover.date;
    const isoDate = this.toIsoDate(humanDate) ?? new Date().toISOString().slice(0, 10);
    return `${isoDate}-${ward}`;
  }

  /** Best-effort parse of common "Sunday, August 16, 2026" style dates. */
  private toIsoDate(input: string | undefined): string | null {
    if (!input) return null;
    const trimmed = input.trim();
    // Already ISO (YYYY-MM-DD or YYYY/MM/DD)
    const isoMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
      const [, y, m, d] = isoMatch;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    // Try native Date parsing as a fallback
    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
    return null;
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const a = this.document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  exportJson(): void {
    const blob = this.programService.exportJson();
    this.downloadBlob(blob, `${this.filenameBase()}.json`);
  }

  async exportHtml(): Promise<void> {
    if (this.exporting()) return;
    this.exporting.set(true);
    try {
      const el = this.preview();
      await this.exportService.exportElementAsHtml(
        el.nativeElement,
        `${this.filenameBase()}.html`,
      );
    } catch (err) {
      this.window.alert('Could not export HTML: ' + (err as Error).message);
    } finally {
      this.exporting.set(false);
    }
  }

  importJson(): void {
    this.fileInput().nativeElement.click();
  }

  async onImport(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      await this.programService.importJson(file);
    } catch (err) {
      this.window.alert('Could not import file: ' + (err as Error).message);
    } finally {
      input.value = '';
    }
  }

  reset(): void {
    if (this.window.confirm('Reset all program data to the default example? This cannot be undone.')) {
      this.programService.reset();
    }
  }
}
