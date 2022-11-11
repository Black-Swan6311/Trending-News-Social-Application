import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private path = environment.apiUrl
  private gloginurl = environment.loginWithGoogleUrl

  constructor(private httpClient: HttpClient) { }

  public signOutExternal = () => {
      localStorage.removeItem("token");
      console.log("token deleted")
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.gloginurl, JSON.stringify(credentials), { headers: header });
  }


}