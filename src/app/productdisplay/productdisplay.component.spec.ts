import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdisplayComponent } from './productdisplay.component';

describe('ProductdisplayComponent', () => {
  let component: ProductdisplayComponent;
  let fixture: ComponentFixture<ProductdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
