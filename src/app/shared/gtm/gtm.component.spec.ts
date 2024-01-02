import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtmComponent } from './gtm.component';

describe('GtmComponent', () => {
  let component: GtmComponent;
  let fixture: ComponentFixture<GtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GtmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
