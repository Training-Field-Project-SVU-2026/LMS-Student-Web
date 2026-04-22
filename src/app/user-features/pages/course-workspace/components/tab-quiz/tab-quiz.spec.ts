import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabQuiz } from './tab-quiz';

describe('TabQuiz', () => {
  let component: TabQuiz;
  let fixture: ComponentFixture<TabQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
