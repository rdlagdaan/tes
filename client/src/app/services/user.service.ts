import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class UserService {

  domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
  userToken;
  user;
  options;

  constructor( private http: Http ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createUserHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.userToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.userToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
  }
  

  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.userToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }
  

  // Function to create user accounts
  createUser(user) {
    this.createUserHeaders();
    return this.http.post(this.domain + 'userCrud/createUser', user, this.options).map(res => res.json());
  }
 

  // Function to login user
  getUser(user) {
    this.createUserHeaders();
    return this.http.post(this.domain + 'userCrud/getUser', user).map(res => res.json());
  }  

  // Function to login user
  login(user) {
    return this.http.post(this.domain + 'userCrud/login', user).map(res => res.json());
  }
  
  // Function to logout
  logout() {
    this.userToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to get users data
  getUsers() {
    this.createUserHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'userCrud/getUsers', this.options).map(res => res.json());
  }


  // Function to delete user
  deleteUser(ID) {
    this.createUserHeaders();
    console.log("DELETE USER");
    console.log(ID);
    return this.http.delete(this.domain + 'userCrud/deleteUser/' + ID, this.options).map(res => res.json());
  }  
  
 
 // Function to check if EmailAddress is taken
 checkEmailAddress(EmailAddress) {
  this.createUserHeaders(); // Create headers before sending to API
  return this.http.get(this.domain + 'userCrud/checkEmailAddress/' + EmailAddress, this.options).map(res => res.json());
}

  // Function to check if user is logged in
  loggedIn() {
    return tokenNotExpired();
  }  




  ngOnInit() {
    const token = localStorage.getItem('token'); // Check if a token exists in local storage
    // Check if the token actually exists
    console.log("INIT");
    console.log(token);
    if (token) {
      // Check if the token is not expired
      if (this.loggedIn()) {
        this.loadToken(); // Ensue user is logged 
      } else {
        this.logout(); // Should not have token; log user out
      }
    } else {
      this.logout(); // Log the user out
    }

  } 

}
