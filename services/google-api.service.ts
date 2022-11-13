import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {AuthConfig, OAuthService, UserInfo } from 'angular-oauth2-oidc'
import { Subject } from 'rxjs/internal/Subject';

export const oauthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200',
  logoutUrl: 'https://www.google.com/accounts/Logout',
  // postLogoutRedirectUri: "http://localhost:4200",
  // loginUrl: "http://localhost:4200/login",
  clientId: '367177344106-pqrqeb1frjlb2a1i3fh564529mqvs7sl.apps.googleusercontent.com',
  scope: 'openid profile email'
} 

export interface UserInfoDetail extends UserInfo {
  info: {
    sub: string,
    email: string,
    name: string
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfoDetail>()
  
  constructor(private readonly oauthService: OAuthService, private _ngZone:NgZone, private router:Router) { 
    oauthService.configure(oauthConfig)
    oauthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    oauthService.loadDiscoveryDocument().then(() => {
      oauthService.tryLoginImplicitFlow({customRedirectUri: 'http://localhost:4200/login'}).then(() => {
        if (!oauthService.hasValidAccessToken()) {
          if (this.router.url.includes('login')) {
            oauthService.initImplicitFlow()
            this._ngZone.run(() => {
              this.router.navigate(['/dashboard']);
            });
          }
        } else {
          oauthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile))
            this.userProfileSubject.next(userProfile as UserInfoDetail)
          })
        }
      })
    } )
  }

  isLoggedIn(): boolean {
    console.log('service gapi auth, is Logged In', this.oauthService.hasValidAccessToken())
    return this.oauthService.hasValidAccessToken()
  }

  tryLoginImplicitFlow() {
    return this.oauthService.tryLoginImplicitFlow()
  }

  initImplicitFlow() {
    return this.oauthService.initImplicitFlow()
  }
  
  signOut() {
    this.oauthService.logOut()
    
    // this.authService.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

}

