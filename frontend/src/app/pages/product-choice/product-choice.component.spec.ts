import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductChoiceComponent } from './product-choice.component';

describe('ProductChoiceComponent', () => {
  let component: ProductChoiceComponent;
  let fixture: ComponentFixture<ProductChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
