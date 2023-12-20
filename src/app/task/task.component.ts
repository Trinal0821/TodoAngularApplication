import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AddNewTaskModel } from '../models/add-new-task-model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() list : AddNewTaskModel[] | undefined
}
