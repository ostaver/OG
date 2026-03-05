import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  isVisible = false;
  safeYoutubeUrl1: SafeResourceUrl;
  safeYoutubeUrl2: SafeResourceUrl;

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {
    this.safeYoutubeUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/EVlSgEJduNI');
    this.safeYoutubeUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/QL4mlXGGbv8?si=tLFlFgRr2y7wU0fM');
  }

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}
