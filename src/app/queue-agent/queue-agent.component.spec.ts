import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueAgentComponent } from './queue-agent.component';

describe('QueueAgentComponent', () => {
  let component: QueueAgentComponent;
  let fixture: ComponentFixture<QueueAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
