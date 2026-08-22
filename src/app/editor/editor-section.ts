import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-editor-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" [class.collapsed]="collapsed()">
      <button type="button" class="header" (click)="toggle()">
        <span class="title">{{ title() }}</span>
        <span class="chevron" aria-hidden="true">{{ collapsed() ? '+' : '−' }}</span>
      </button>
      @if (!collapsed()) {
        <div class="body">
          <ng-content></ng-content>
        </div>
      }
    </section>
  `,
  styles: `
    .section {
      border-bottom: 1px solid var(--rule);
      &:last-child { border-bottom: none; }
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: .9rem 1rem;
      background: transparent;
      border: none;
      cursor: pointer;
      font-family: 'Cinzel', serif;
      font-size: .85rem;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--brown);
      text-align: left;
      &:hover { background: rgba(196, 168, 79, .08); }
    }
    .title { font-weight: 600; }
    .chevron {
      font-size: 1.2rem;
      color: var(--gold);
      font-family: serif;
      line-height: 1;
    }
    .body {
      padding: .5rem 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: .85rem;
    }
  `,
})
export class EditorSection {
  readonly title = input.required<string>();
  readonly startOpen = input<boolean>(true);
  protected readonly collapsed = signal(false);

  constructor() {
    this.collapsed.set(!this.startOpen());
  }

  toggle(): void {
    this.collapsed.update((v) => !v);
  }
}
