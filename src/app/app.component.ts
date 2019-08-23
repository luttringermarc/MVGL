import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBxiIgZoMtX8_sh_YmY8pccYAomVMbyyng",
      authDomain: "mvgl-dbacc.firebaseapp.com",
      databaseURL: "https://mvgl-dbacc.firebaseio.com",
      projectId: "mvgl-dbacc",
      storageBucket: "gs://mvgl-dbacc.appspot.com",
      messagingSenderId: "795102619273",
      appId: "1:795102619273:web:01a1bf0d854d303f"
    };
    
    firebase.initializeApp(firebaseConfig);
  }
}
