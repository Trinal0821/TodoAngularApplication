import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTasksBtnComponent } from './add-tasks-btn.component';

describe('AddTasksBtnComponent', () => {
  let component: AddTasksBtnComponent;
  let fixture: ComponentFixture<AddTasksBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTasksBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTasksBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
