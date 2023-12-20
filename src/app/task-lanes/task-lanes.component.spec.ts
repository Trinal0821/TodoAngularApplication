import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskLanesComponent } from './task-lanes.component';

describe('TaskLanesComponent', () => {
  let component: TaskLanesComponent;
  let fixture: ComponentFixture<TaskLanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskLanesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
