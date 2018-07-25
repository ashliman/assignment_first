import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { constants } from '../config';

@Injectable()
export class LoginService {

  private ApiUrl=constants.host;

  constructor( private http:Http) { }

  public login(userdt) {          
    return this.http.post(this.ApiUrl+'/login',userdt) .catch(this.handleError).map(res => res.json());
  }

  handleError(error: Response) {
    console.error("MeetingService error: HTTP status " + error.status);    // status is 200
    return Observable.throw(error.json() || 'Server error: MeetingService');
 }

}
