import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  user:any;
  public currentUser = {
    email: '',
    password: '',
    settings : {
      editView: true, 
      htmlView: true,
      autoSave: true,
      preview:  true
    }
  };

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.user = user;
    });
    
    this.user = this.authService.getUser();
    console.log('nginit: ', this.user);
  }

  updatedUserSettings(user){
    const currentUser = user;
    this.user = currentUser;
    this.user.settings = {...currentUser.settings};
    console.log(this.user);
  }

  saveChanges(){
    const data = {
      settings: { 
        editView: this.user.settings.editView,
        htmlView: this.user.settings.htmlView,
        autoSave: this.user.settings.autoSave,
        preview: this.user.settings.preview,
      }
    }
    this.updatedUserSettings(data);
    this.authService.updateData(data)
    .then(()=> {
      //this.updatedUserSettings(data);
      console.log('updated settings');
    })
    .catch(err => {
      console.error(err);
    })
    
  };

}
