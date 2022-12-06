import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { retry } from 'rxjs';
import { Observable , } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
   // Authorization: 'my-auth-token'
  })
};
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
export class AuthService {
  private path = environment.apiUrl
  private gloginurl = environment.loginWithGoogleUrl
  private guserInfoUrl = environment.userInfoGoogleUrl
  private updateUserInfoUrl=environment.updateUserSetting
  constructor(private httpClient: HttpClient,private readonly oauthService: OAuthService) { }
  public signOutExternal = () => {
    localStorage.removeItem("token");
    console.log("token deleted")
  }
  LoginWithGoogle(credentials: string): Observable<any> {

    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.gloginurl , JSON.stringify(credentials), { headers: header }) .pipe(retry(1), catchError(this.handleError));
  }

  getUserInfo(): Observable<any> {

   
    const header = new HttpHeaders().set('Content-type', 'application/json').set( 'Authorization','Bearer '+localStorage.getItem('tokengoogleapi'));
   
    return this.httpClient.get(this.guserInfoUrl ,  { headers: header });
  }
  updateUserInfo(credentials: string): Observable<any> {

    const header = new HttpHeaders().set('Content-type', 'application/json').set( 'Authorization','Bearer '+localStorage.getItem('tokengoogleapi'));
   
    return this.httpClient.post(this.updateUserInfoUrl , credentials, { headers: header });
  }

  handleError(error:any) {
  
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }
 
}