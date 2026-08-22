import { Injectable, effect, signal } from '@angular/core';
import { Program } from '../models/program.model';
import { DEFAULT_PROGRAM } from './default-program';

const STORAGE_KEY = 'worship-service-program:v1';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  readonly model = signal<Program>(this.loadInitial());

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.model()));
      } catch {
        // ignore quota / private mode errors
      }
    });
  }

  reset(): void {
    this.model.set(structuredClone(DEFAULT_PROGRAM));
  }

  replace(program: Program): void {
    this.model.set(structuredClone(program));
  }

  exportJson(): Blob {
    return new Blob([JSON.stringify(this.model(), null, 2)], { type: 'application/json' });
  }

  async importJson(file: File): Promise<void> {
    const text = await file.text();
    const parsed = JSON.parse(text) as Program;
    this.replace(parsed);
  }

  private loadInitial(): Program {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as Program;
      }
    } catch {
      // fall through to default
    }
    return structuredClone(DEFAULT_PROGRAM);
  }
}
