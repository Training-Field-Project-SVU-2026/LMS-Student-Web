import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-package-details',
  imports: [],
  templateUrl: './package-details.html',
  styleUrl: './package-details.css',
})
export class PackageDetails implements OnInit {
  private route = inject(ActivatedRoute);
  slug: string | null = null;

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log('Package slug:', this.slug);

  }
}
