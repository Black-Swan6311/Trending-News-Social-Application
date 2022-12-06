import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleApiService, UserInfoDetail } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  
  public redirect() {
    this.router.navigate(['/dashboard', 'chat']);
  }

  public userInfo?: UserInfoDetail

  profileForm: FormGroup;

  constructor(private readonly googleApi: GoogleApiService, private fb: FormBuilder, private router: Router) {
    this.configForm();
  }

  configForm() {
    this.profileForm = this.fb.group({
      email: localStorage.getItem('emailinfo'),
      pic: localStorage.getItem('picinfo'),
      name: localStorage.getItem('nameinfo') == null ? 'assets/img/faces/face-0.jpg' : localStorage.getItem('nameinfo'),
    });
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  ngOnInit(): void {
    this.googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info;
      localStorage.setItem('emailinfo', info.info.email);
      localStorage.setItem('nameinfo', info.info.name);
      localStorage.setItem('picinfo', info.info.picture);
      this.profileForm.patchValue({
        email: info.info.email,
        pic: info.info.picture,
        name: info.info.name,
      });
    })
  }

}
