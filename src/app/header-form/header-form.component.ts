import { Component } from '@angular/core';

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.css']
})
export class HeaderFormComponent {
  imglogo:string='assets/logo.png'

  logOut(){
    console.log('Logout');
    
  }

}