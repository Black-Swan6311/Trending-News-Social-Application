import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { Subject } from 'rxjs/internal/Subject';

const oauthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '367177344106-pqrqeb1frjlb2a1i3fh564529mqvs7sl.apps.googleusercontent.com',
  scope: 'openid profile email'
} 

export interface UserInfo {
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

  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oauthService: OAuthService) { 
    oauthService.configure(oauthConfig)
    oauthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    oauthService.loadDiscoveryDocument().then(() => {
      oauthService.tryLoginImplicitFlow().then(() => {
        if (!oauthService.hasValidAccessToken()) {
          oauthService.initLoginFlow()
        } else {
          oauthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile))
            this.userProfileSubject.next(userProfile as UserInfo)
          } )
        }
      } )
    } )
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken()
  }
  
    signOut() {
      this.oauthService.logOut()
    }

}

