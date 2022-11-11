import { Component, OnInit , NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { GoogleApiService } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private clientId = environment.clientId
  
  // userProfileSubject = new Subject<UserInfoDetail>()

  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone,
    private readonly googleApi: GoogleApiService) {
      if (!googleApi.isLoggedIn()) {
        googleApi.tryLoginImplicitFlow().then(() => {
          googleApi.initImplicitFlow()
        })
      } else {
        this._ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      }
    }


  ngOnInit(): void {

      
    
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("buttonDiv"),
        { theme: "outline", size: "large"} 
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    let errorMessage: string | null = null
    this.service.LoginWithGoogle(response.credential).subscribe(
      {
        next: (x) => {
          if (!x.token) {
            errorMessage = 'no token'
            return
          }
          console.log(x)
          // debugger
          localStorage.setItem("token", x.token);
          // this.service.getUserInfo(response.credential).subscribe({
          //   next: (userInfo) => {
          //     if (!userInfo) return
          //     debugger
          //   },
          //   error: (e) => {
          //     console.error(e)
          //   },
          //   complete() {
          //     console.log('userinfo request complete')
          //   }
          // })
        },
        error: (e) => {
          errorMessage = e.message
          console.error(e)
        },
        complete: () => {
          if (errorMessage !== null) return
          this._ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          });
        } 
      }
    );  
}

}
