import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkComponent } from './talk.component';

describe('TalkComponent', () => {
  let component: TalkComponent;
  let fixture: ComponentFixture<TalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
