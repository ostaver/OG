import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isScrolled = false;
  isMenuOpen = false;
  activeSection = '';

  navItems = [
    { id: 'ABOUT', label: 'about' },
    { id: 'RECORDS', label: 'records' },
    { id: 'GALLERY', label: 'gallery' },
    { id: 'LINKS', label: 'links' },
    { id: 'CONTACT', label: 'contact' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  scrollTo(elementId: string): void {
    if (elementId === 'header') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  private updateActiveSection(): void {
    const sections = this.navItems.map(item => item.id);
    const scrollPos = window.scrollY + 150;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        this.activeSection = sections[i];
        return;
      }
    }

    this.activeSection = '';
  }
}
