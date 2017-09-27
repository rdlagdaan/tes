import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CollegeCourseService {

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

  // Function to create college course
  createCollegeCourse(collegeCourse) {
    return this.http.post(this.domain + 'collegeCourseCrud/createCollegeCourse', collegeCourse).map(res => res.json());
  }
  

  // Function to get college course data
  getCollegeCourses() {
    this.createHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'collegeCourseCrud/getCollegeCourses', this.options).map(res => res.json());
  }




}
