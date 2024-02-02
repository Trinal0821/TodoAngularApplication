import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataModel } from '../models/user-data-model';
import { SendDataService } from '../send-data.service';
import { Observable, Subscription } from 'rxjs';
import { SettingsComponent } from '../settings/settings.component';
import { SettingsModel } from '../models/settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private userDataSubscription: Subscription | undefined;
  userData : UserDataModel | null = null;
  @ViewChild('settings') settingComponent !: SettingsComponent;

  constructor(private sendData: SendDataService, private store: AngularFirestore ) { }

  ngOnInit() {
    // Subscribe to the observable in the service to detect changes
    this.userDataSubscription= this.sendData.getUserDataObservable().subscribe(userData => {
      if(userData != null) {
        this.userData = userData;
      }
   });
 }

 ngOnDestroy() {
   // Unsubscribe to avoid memory leaks
   if (this.userDataSubscription) {
     this.userDataSubscription.unsubscribe();
   }
 }

 Logout() {
  console.log('logout getting clicked');
    this.userData = null;
    this.sendData.setUserData(null);
    this.sendData.setUserDocId("");
    this.sendData.redisplayLoginTask();

 }

 displaySettings() {
  console.log('displaysettings getting called')
  if(this.userData != null) {
    this.settingComponent.openDialog(this.userData);
  }
}
}
