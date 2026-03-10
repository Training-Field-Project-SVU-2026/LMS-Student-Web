import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreHeader } from './explore-header';

describe('ExploreHeader', () => {
  let component: ExploreHeader;
  let fixture: ComponentFixture<ExploreHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
