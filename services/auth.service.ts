import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

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
  constructor(private httpClient: HttpClient) { }
  public signOutExternal = () => {
    localStorage.removeItem("token");
    console.log("token deleted")
  }
  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.gloginurl , JSON.stringify(credentials), { headers: header });
  }

  // getUserInfo(credentials: string): Observable<any> {

  //   const header = new HttpHeaders().set('Content-type', 'application/json');
  //   return this.httpClient.post(this.guserInfoUrl , JSON.stringify(credentials), { headers: header });
  // }

}