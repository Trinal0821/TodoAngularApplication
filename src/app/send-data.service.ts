import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, take } from 'rxjs';
import { AddNewTaskModel } from './models/add-new-task-model';
import { DeleteTaskModel } from './models/delete-task-model';
import { DisplayTasksModal } from './display-task/display-task.component';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataModel } from './models/user-data-model';


@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  data = new Subject<AddNewTaskModel>;
  public data$ = this.data.asObservable();
  
  deleteTaskTitle = new Subject<DeleteTaskModel>;
  public delete = this.deleteTaskTitle.asObservable();

  userData = new Subject<UserDataModel>;
  public user = this.userData.asObservable();


  constructor(private store: AngularFirestore) { }

  setUserData(temp : UserDataModel) {
    this.userData.next(temp);
  }

  getUserDataObservable() : Observable<UserDataModel> {
    return this.userData;
  }

  setData(temp: AddNewTaskModel) : void {
    this.data.next(temp);
  }

  getDataObservable(): Observable<AddNewTaskModel> {
    return this.data$;
  }

  setDeleteTaskTitle(temp : DeleteTaskModel) : void {
    this.deleteTaskTitle.next(temp);
  }

  getDeleteDataObservable() : Observable<DeleteTaskModel> {
    return this.delete;
  }

  getPriority(): Observable<String[]> {
    return this.store.collection('Priority').snapshotChanges()
      .pipe(
        map(actions => {
          const priorityArray: String[] = [];
          actions.forEach(a => {
            const data = a.payload.doc.data() as String
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                priorityArray.push(data[key]);
              }
            }
          });
          return priorityArray;
        })
      );
  }

  getTasks(): Observable<AddNewTaskModel[]> {
    return this.store.collection('Tasks').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as AddNewTaskModel;
            const id = a.payload.doc.id;
            return {  ...data, id };
          });
        })
      );
  }

}
