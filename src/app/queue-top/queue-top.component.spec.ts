import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTopComponent } from './queue-top.component';

describe('QueueTopComponent', () => {
  let component: QueueTopComponent;
  let fixture: ComponentFixture<QueueTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
