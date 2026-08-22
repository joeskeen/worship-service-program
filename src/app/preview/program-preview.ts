import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProgramService } from '../services/program.service';
import { HideOnErrorDirective } from '../shared/hide-on-error.directive';
import { ProgramItem } from '../models/program.model';

@Component({
  selector: 'app-program-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, HideOnErrorDirective],
  templateUrl: './program-preview.html',
  styleUrl: './program-preview.scss',
})
export class ProgramPreview {
  private readonly programService = inject(ProgramService);
  protected readonly program = this.programService.model.asReadonly();

  trackByIndex = (i: number) => i;

  protected showCoverImage = (): boolean => !!this.program().cover.coverImage;

  protected isHymnOrMusical(item: ProgramItem): boolean {
    return item.kind === 'hymn' || item.kind === 'musical';
  }

  protected isPrayer(item: ProgramItem): boolean {
    return item.kind === 'prayer';
  }

  protected isSpeaker(item: ProgramItem): boolean {
    return item.kind === 'speaker';
  }

  protected isTitleItem(item: ProgramItem): boolean {
    return item.kind === 'business' || item.kind === 'sacrament' || item.kind === 'text' || item.kind === 'testimony';
  }

  protected speakers(item: ProgramItem): { label: string; name: string }[] {
    const label = item.label || 'Speaker';
    return (item.people ?? []).map((name) => ({ label, name }));
  }

  protected hasLyrics(item: ProgramItem): boolean {
    return item.kind === 'musical' && !!item.lyrics;
  }
}
