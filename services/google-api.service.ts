import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService, UserInfo } from 'angular-oauth2-oidc'
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '../services/auth.service';
export const oauthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200',
  logoutUrl: 'https://www.google.com/accounts/Logout',
  postLogoutRedirectUri: "https://localhost:7264/api/Auth/LoginWithGoogle",
  // loginUrl: "http://localhost:4200/login",
  clientId: '602947275663-3s2fg3f286k7r5167q23sc5g3jcevtmb.apps.googleusercontent.com',
  scope: 'openid profile email'
}
export interface ResponseCustom {
  token: string,
  username: string
}
export interface UserInfoDetail extends UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfoDetail>()

  constructor(private customAuthService: AuthService, private readonly oauthService: OAuthService, private _ngZone: NgZone, private router: Router) {
    oauthService.configure(oauthConfig)
    oauthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    oauthService.loadDiscoveryDocument().then(() => {
      oauthService.tryLoginImplicitFlow({ customRedirectUri: 'http://localhost:4200/login' }).then(() => {
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
            console.log('this.oauthService.getAccessToken()')
            console.log(this.oauthService.getAccessToken())

            customAuthService.LoginWithGoogle(this.oauthService.getIdToken()).subscribe((response: any) => {
              console.log('response  tokennnnnn');
              console.log(response);
              //let jsonObject: any = JSON.parse(response);
              // console.log(jsonObject);
              let _response: ResponseCustom = <ResponseCustom>response;
              // console.log(_response.token);
              localStorage.setItem('tokengoogleapi', _response.token);

            });
            // customAuthService.LoginWithGoogle('ha.sadeghi.esf');
            this.userProfileSubject.next(userProfile as UserInfoDetail)
          })
        }
      })
    })
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

  clearUserInfoFromLocalStorage(): void {
    window.localStorage.removeItem('emailinfo')
    window.localStorage.removeItem('picinfo')
    window.localStorage.removeItem('nameinfo')
  }

  signOut() {
    this.clearUserInfoFromLocalStorage()
    this.oauthService.logOut()
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

}

