import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVideos } from './tab-videos';

describe('TabVideos', () => {
  let component: TabVideos;
  let fixture: ComponentFixture<TabVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabVideos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
