import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {

  api_key = '4754c927a17f458fa4e9ba4a49581500';
  locationDetails = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + this.api_key;

  constructor(private http: HttpClient) { }

  getGeolocationData():Observable<any>{
    return this.http.get(this.locationDetails)
    
  }
}
