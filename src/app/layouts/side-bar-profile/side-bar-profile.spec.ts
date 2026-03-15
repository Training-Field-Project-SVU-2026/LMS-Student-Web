import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarProfile } from './side-bar-profile';

describe('SideBarProfile', () => {
  let component: SideBarProfile;
  let fixture: ComponentFixture<SideBarProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
