import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryComponent } from './list-category.component';

describe('ListCategoryComponent', () => {
  let component: ListCategoryComponent;
  let fixture: ComponentFixture<ListCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
