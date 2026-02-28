import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
interface ButtonConfig {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit';
  navigateTo?: string;
}
@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  @Input() config: ButtonConfig = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    isLoading: false,
    type: 'button',
    navigateTo: ''
  };

  constructor(private router: Router) {}

  get classes() {
    const cfg = this.config;

    return {
      btn: true,
      [`btn-${cfg.variant || 'primary'}`]: true,
      [`btn-${cfg.size || 'md'}`]: true,
      [`btn-${cfg.type || 'button'}`]: true,
      'btn-loading': cfg.isLoading ?? false,
      'btn-disabled': cfg.disabled ?? false
    };
  }

  navigate() {

    if (this.config.disabled || this.config.isLoading) return;

    if (!this.config.navigateTo) return;

    this.config.isLoading = true;
    this.config.disabled = true;

    setTimeout(() => {

      this.router.navigate([this.config.navigateTo]).then(() => {
        this.config.isLoading = false;
        this.config.disabled = false;
      });

    }, 200);

  }
}
