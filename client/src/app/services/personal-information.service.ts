import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class PersonalInformationService {

  options;
  domain = this.userService.domain;


  constructor(
    private userService: UserService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createHeaders() {
    this.userService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.userService.userToken // Attach token
      })
    });
  }


    // Function to get Personal Profiles data
    getPersonalProfiles() {
      this.createHeaders(); // Create headers before sending to API
      return this.http.get(this.domain + 'personalProfileCrud/getPersonalProfiles', this.options).map(res => res.json());
    }
  

}
