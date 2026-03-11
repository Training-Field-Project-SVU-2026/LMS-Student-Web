import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhySection } from './why-section';

describe('WhySection', () => {
  let component: WhySection;
  let fixture: ComponentFixture<WhySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhySection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
