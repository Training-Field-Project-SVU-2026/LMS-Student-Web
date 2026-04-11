import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMaterials } from './tab-materials';

describe('TabMaterials', () => {
  let component: TabMaterials;
  let fixture: ComponentFixture<TabMaterials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabMaterials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabMaterials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
