import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  isVisible = false;
  showAll = false;
  initialCount = 3;
  lightboxOpen = false;
  lightboxIndex = 0;

  @ViewChild('lightboxRef') lightboxRef!: ElementRef;

  images = [
    { src: 'assets/GALLERY/1691577848792052.jpg', title: 'Intense Training', desc: 'The dedication and focus that built a legend.' },
    { src: 'assets/GALLERY/_MG_3766.JPG', title: 'Record Breaking', desc: 'The historic moment when limits were shattered.' },
    { src: 'assets/GALLERY/20220717182523_IMG_8108.JPG', title: 'Athletic Excellence', desc: 'Pure determination and skill in motion.' },
    { src: 'assets/GALLERY/5Y7A6478.jpg', title: 'Victory Moment', desc: 'A champion\'s triumph captured forever.' },
    { src: 'assets/GALLERY/_CHE0074.jpg', title: 'Behind the Scenes', desc: 'Unseen moments of preparation.' },
    { src: 'assets/GALLERY/20220717182454_IMG_8103.JPG', title: 'Legacy Continues', desc: 'The ongoing journey of excellence.' },
    { src: 'assets/GALLERY/_CHE0122.jpg', title: 'Competition', desc: 'Showcasing skill on the world stage.' },
    { src: 'assets/GALLERY/_CHE0183.jpg', title: 'Training Session', desc: 'Perfecting technique and building strength.' },
    { src: 'assets/GALLERY/_CHE0190.jpg', title: 'Performance', desc: 'Executing with precision and power.' },
    { src: 'assets/GALLERY/_DSC3966_websize.jpg', title: 'Championship', desc: 'Competing at the highest level.' },
    { src: 'assets/GALLERY/_MG_3684.JPG', title: 'Dedication', desc: 'Daily commitment for extraordinary achievements.' },
    { src: 'assets/GALLERY/JB_M0393.jpg', title: 'Event Preparation', desc: 'Focusing on the next challenge.' },
    { src: 'assets/GALLERY/JB_M1011.jpg', title: 'Track Action', desc: 'Speed and endurance in the ultimate test.' },
    { src: 'assets/GALLERY/JB_M9505.jpg', title: 'Competition Focus', desc: 'Unleashing potential on the track.' },
    { src: 'assets/GALLERY/K4T_atl (267 of 378).jpg', title: 'Determination', desc: 'Pushing the limits of physical capability.' },
    { src: 'assets/GALLERY/U23_EM_FRIIDRETT_DAG2-058.jpg', title: 'European Championships', desc: 'Representing the nation at U23.' },
    { src: 'assets/GALLERY/US_20250717_Bergen_31669.jpg', title: 'Bergen Championships', desc: 'A shining moment in Bergen.' },
    { src: 'assets/GALLERY/_DSC3985_websize.jpg', title: 'Track Event', desc: 'Dynamic movement in competition.' },
    { src: 'assets/GALLERY/_MG_0725.JPG', title: 'Athletics', desc: 'Setting new records.' },
    { src: 'assets/GALLERY/_MG_2352.JPG', title: 'Field Event', desc: 'Strength and agility combined.' },
    { src: 'assets/GALLERY/_MG_8931.JPG', title: 'Decathlon Moment', desc: 'Ten events, one mindset.' }
  ];

  get displayedImages() {
    return this.showAll ? this.images : this.images.slice(0, this.initialCount);
  }

  constructor(private el: ElementRef) {}

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

  toggleView() {
    this.showAll = !this.showAll;
    if (!this.showAll) {
      const element = document.getElementById('GALLERY');
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }

  openLightbox(index: number) {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.lightboxRef?.nativeElement?.focus();
    }, 50);
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  nextImage(event: Event) {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex + 1) % this.displayedImages.length;
  }

  prevImage(event: Event) {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex - 1 + this.displayedImages.length) % this.displayedImages.length;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.lightboxOpen) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowRight':
        this.lightboxIndex = (this.lightboxIndex + 1) % this.displayedImages.length;
        break;
      case 'ArrowLeft':
        this.lightboxIndex = (this.lightboxIndex - 1 + this.displayedImages.length) % this.displayedImages.length;
        break;
    }
  }
}
