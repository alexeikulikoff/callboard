import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueFooterComponent } from './queue-footer.component';

describe('QueueFooterComponent', () => {
  let component: QueueFooterComponent;
  let fixture: ComponentFixture<QueueFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
