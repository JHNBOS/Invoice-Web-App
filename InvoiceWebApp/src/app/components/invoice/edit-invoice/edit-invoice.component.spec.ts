import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceComponent } from './edit-invoice.component';

describe('EditInvoiceComponent', () => {
  let component: EditInvoiceComponent;
  let fixture: ComponentFixture<EditInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
