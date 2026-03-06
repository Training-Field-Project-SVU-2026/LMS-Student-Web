import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSection } from './featured-section';

describe('FeaturedSection', () => {
  let component: FeaturedSection;
  let fixture: ComponentFixture<FeaturedSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
