import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StandaloneHtmlExportService {
  private readonly document = inject(DOCUMENT);

  async exportElementAsHtml(
    element: HTMLElement,
    fileName: string = 'snapshot.html',
  ): Promise<void> {
    if (!element) {
      throw new Error('Target element is null or undefined.');
    }

    // 1. Build a fresh HTML document as the export shell.
    const title = this.document.title || 'Worship Service Program';
    const docShell = this.document.implementation.createHTMLDocument(title);

    // 2. Clone the element into the new document body.
    const clonedContent = element.cloneNode(true) as HTMLElement;
    docShell.body.appendChild(clonedContent);

    // 3. Gather every active stylesheet and inline it into the new <head>.
    const styleTag = docShell.createElement('style');
    styleTag.textContent = this.collectCss();
    docShell.head.appendChild(styleTag);

    // 4. Inline any <img> srcs as data: URIs so the export is self-contained.
    const ogImage = await this.inlineImages(clonedContent);
    if (ogImage) {
      const ogMeta = docShell.createElement('meta');
      ogMeta.setAttribute('property', 'og:image');
      ogMeta.setAttribute('content', ogImage);
      docShell.head.appendChild(ogMeta);
      const twMeta = docShell.createElement('meta');
      twMeta.setAttribute('name', 'twitter:image');
      twMeta.setAttribute('content', ogImage);
      docShell.head.appendChild(twMeta);
    }

    // 5. Set the <title> in the shell.
    const titleEl = docShell.createElement('title');
    titleEl.textContent = title;
    docShell.head.appendChild(titleEl);

    // 6. Download via a blob URL.
    const finalizedHtml = docShell.documentElement.outerHTML;
    const blob = new Blob([finalizedHtml], { type: 'text/html;charset=utf-8' });
    const downloadAnchor = this.document.createElement('a');
    downloadAnchor.href = URL.createObjectURL(blob);
    downloadAnchor.download = fileName.endsWith('.html') ? fileName : `${fileName}.html`;
    downloadAnchor.click();
    URL.revokeObjectURL(downloadAnchor.href);
  }

  private collectCss(): string {
    let css = '';
    for (const sheet of Array.from(this.document.styleSheets)) {
      try {
        const rules = sheet.cssRules;
        if (rules) {
          for (let i = 0; i < rules.length; i++) {
            css += rules[i].cssText + '\n';
          }
        }
      } catch {
        // Skip cross-origin sheets we can't read (e.g. Google Fonts CSS).
      }
    }
    return css;
  }

  private async inlineImages(root: HTMLElement): Promise<string | null> {
    const imgs = Array.from(root.querySelectorAll('img'));
    let ogImage: string | null = null;
    for (const img of imgs) {
      const src = img.getAttribute('src');
      if (!src || src.startsWith('data:')) continue;
      let absoluteUrl: string;
      try {
        absoluteUrl = new URL(src, this.document.baseURI).toString();
      } catch {
        continue;
      }
      // Cross-origin URLs (e.g. churchofjesuschrist.org/imgs/...) can't be
      // fetched+inlined without CORS. Leave them as references in the
      // exported HTML; the browser will load them from the CDN at runtime.
      if (new URL(absoluteUrl).origin !== this.document.location.origin) {
        if (!img.alt && img.closest('.col-cover')) ogImage = absoluteUrl;
        continue;
      }
      try {
        const dataUri = await this.fetchAsDataUri(absoluteUrl);
        img.setAttribute('src', dataUri);
        if (!img.alt && img.closest('.col-cover')) ogImage = dataUri;
      } catch {
        // Leave src unchanged on failure.
      }
    }
    return ogImage;
  }

  private async fetchAsDataUri(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }
}
