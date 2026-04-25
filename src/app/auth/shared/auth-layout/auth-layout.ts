import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.renderer.setAttribute(document.documentElement, 'data-theme', 'light');
    this.renderer.removeClass(document.documentElement, 'dark');
  }

  ngOnDestroy() {
    const saved = localStorage.getItem('theme') ?? 'light';
    this.renderer.setAttribute(document.documentElement, 'data-theme', saved);
    if (saved === 'dark') {
      this.renderer.addClass(document.documentElement, 'dark');
    }
  }
}