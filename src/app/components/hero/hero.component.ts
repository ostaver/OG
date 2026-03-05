import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  scale = 1;
  blur = 0;
  opacity = 1;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const fromTop = window.scrollY;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    this.scale = 1 + (fromTop / 2000);
    this.blur = fromTop / 100;
    this.opacity = Math.max(0, 1 - ((fromTop / documentHeight) * 1.3));
  }
}
