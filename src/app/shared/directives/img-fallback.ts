import {
  Directive, Input, HostListener, OnChanges,
  SimpleChanges, ElementRef
} from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true
})
export class ImgFallback implements OnChanges {

  @Input() src: string | null | undefined = '';
  @Input() srcFallback: string = '/images/default_image.jpeg';
  @Input() errorFallback: string = '/images/error_image.png';

  private hasError = false;

  constructor(private el: ElementRef<HTMLImageElement>) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src']) {
      this.hasError = false;
      this.resolveImage();
    }
  }

  private resolveImage() {
    let val = this.src;

    // 1. Check for missing or stringified null/undefined
    if (!val || val === 'null' || val === 'undefined' || val === '') {
      this.el.nativeElement.src = this.srcFallback;
      return;
    }

    // 2. Handle relative URLs (Django often returns paths starting with /media/)
    if (!val.startsWith('http') && !val.startsWith('data:') && !val.startsWith('blob:')) {
      const baseUrl = environment.baseUrl.endsWith('/')
        ? environment.baseUrl.slice(0, -1)
        : environment.baseUrl;

      const path = val.startsWith('/') ? val : `/${val}`;
      val = `${baseUrl}${path}`;
    }

    this.el.nativeElement.src = val;
  }

  @HostListener('error')
  onError() {
    if (!this.hasError) {
      this.hasError = true;
      this.el.nativeElement.src = this.errorFallback;
    }
  }
}