import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleApiService, UserInfoDetail } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public userInfo?: UserInfoDetail
  profileForm: FormGroup;

  public redirect() {
    this.router.navigate(['/dashboard', 'chat']);
  }

  constructor(private readonly googleApi: GoogleApiService, private fb: FormBuilder, private router: Router) {
    this.setUserInfo()
    this.configForm();
  }

  configForm() {
    this.setUserInfo()
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
    this.setUserInfo()
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  setUserInfo(): void {
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
