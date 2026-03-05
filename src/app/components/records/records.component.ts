import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  titleVisible = false;
  cardsVisible = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.titleVisible = true;
          setTimeout(() => this.cardsVisible = true, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.el.nativeElement);
  }
}
