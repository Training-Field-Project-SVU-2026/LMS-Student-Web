import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="min-h-screen bg-[var(--background)] p-8">
      <h1 class="text-2xl font-bold text-[var(--text-primary)]">
        My Courses 🎓
      </h1>
      <p class="text-[var(--text-tertiary)] mt-2">
        Your courses will appear here.
      </p>
    </div>
  `,
})
export class HomeUser {}
