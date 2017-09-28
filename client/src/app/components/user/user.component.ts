import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  message;
  messageClass;
  processing = false;
  emailAddressValid;
  emailAddressMessage;
  users;
  label = "Create User";
  buttonName = "Submit";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router

  ) { 
    this.createForm(); // Create Login Form when component is constructed
  }

  // Function to create registration form
  createForm() {
    this.userForm = this.formBuilder.group({
      // Email Input
      EmailAddress: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmailAddress // Custom validation
      ])],
      // LastName Input
      LastNameUser: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(50), // Maximum length is 15 characters
        this.validateLastNameUser // Custom validation
      ])],

      // FirtsName Input
      FirstNameUser: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(50), // Maximum length is 15 characters
        this.validateFirstNameUser // Custom validation
      ])],


      // UserID Input
      UserID: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(50), // Maximum length is 15 characters
        this.validateUserID // Custom validation
      ])],

      // UserNumber Input
      UserNumber: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(50), // Maximum length is 15 characters
        this.validateUserNumber // Custom validation
      ])],



      // Password Input
      Password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],
      
      // Confirm Password Input
      Confirm: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('Password', 'Confirm') }); // Add custom validator to form for matching passwords
  }

  // Function to disable the registration form
  disableForm() {
    this.userForm.controls['UserID'].disable();
    this.userForm.controls['EmailAddress'].disable();
    this.userForm.controls['LastNameUser'].disable();
    this.userForm.controls['FirstNameUser'].disable();
    this.userForm.controls['UserNumber'].disable();
    this.userForm.controls['Password'].disable();
    this.userForm.controls['Confirm'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.userForm.controls['UserID'].enable();
    this.userForm.controls['EmailAddress'].enable();
    this.userForm.controls['LastNameUser'].enable();
    this.userForm.controls['FirstNameUser'].enable();
    this.userForm.controls['UserNumber'].enable();
    this.userForm.controls['Password'].enable();
    this.userForm.controls['Confirm'].enable();
    
  }


  // Function to validate LastName is proper format
  validateUserID(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test LastName against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid LastName
    } else {
      return { 'validateUserID': true } // Return as invalid LastName
    }
  }
  
  // Function to validate EmailAddress is proper format
  validateEmailAddress(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test EmailAddress against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid EmailAddress
    } else {
      return { 'validateEmailAddress': true } // Return as invalid EmailAddress
    }
  }

  // Function to validate LastName is proper format
  validateLastNameUser(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test LastName against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid LastName
    } else {
      return { 'validateLastNameUser': true } // Return as invalid LastName
    }
  }


  // Function to validate FirstName is proper format
  validateFirstNameUser(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test FirstName against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid FirstName
    } else {
      return { 'validateFirstNameUser': true } // Return as invalid FirstName
    }
  }

    // Function to validate FirstName is proper format
    validateUserNumber(controls) {
      // Create a regular expression
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      // Test FirstName against regular expression
      if (regExp.test(controls.value)) {
        return null; // Return as valid FirstName
      } else {
        return { 'validateUserNumber': true } // Return as invalid FirstName
      }
    }
  


  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  // Funciton to ensure passwords match
  matchingPasswords(Password, Confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[Password].value === group.controls[Confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  // Function to submit form
  onCreateSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const user = {
      UserID: this.userForm.get('UserID').value, // Gender input field
      EmailAddress: this.userForm.get('EmailAddress').value, // EmailAddress input field
      LastNameUser: this.userForm.get('LastNameUser').value, // LastName input field
      FirstNameUser: this.userForm.get('FirstNameUser').value, // FirstName input field
      UserNumber: this.userForm.get('UserNumber').value, // BirthDate input field
      Password: this.userForm.get('Password').value // Password input field
    }
    console.log(user);
    // Function from user service to register user
    this.userService.createUser(user).subscribe(data => {
      // Response from registration attempt
      console.log(data);
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        // After 2 second timeout, navigate to the login page
        this.processing = false; // Used to notify HTML that form is in processing, so that it can be disabled
        this.enableForm(); // Re-enable form
        this.userForm = null;
        this.createForm();

       this.userService.getUsers().subscribe(userlist => {
        console.log(userlist);
        this.users = userlist;
      });
         
       
        setTimeout(() => {
          this.router.navigate(['/user']); // Redirect to login view
        }, 2000);
      }
    });

  }

  // Function to check if EmailAddress is taken
  checkEmailAddress() {
    // Function from authentication file to check if EmailAddress is taken
    this.userService.checkEmailAddress(this.userForm.get('EmailAddress').value).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.emailAddressValid = false; // Return email as invalid
        this.emailAddressMessage = data.message; // Return error message
      } else {
        this.emailAddressValid = true; // Return email as valid
        this.emailAddressMessage = data.message; // Return success message
      }
    });
  }


  //Function to delete user
  deleteUser(ID) {
    this.userService.deleteUser(ID).subscribe(data => {
      if(!data.success) {

      } else {

      }
      this.userService.getUsers().subscribe(userlist => {
        console.log(userlist);
        this.users = userlist;
      });
    })
  }


  
  //Function to delete user
  editUser(ID) {
    this.label = "Update User!";
    this.buttonName = "Update";

    this.userService.getUserGet(ID).subscribe(data => {
      this.userForm.patchValue({
        UserID: data[0].UserID,
        LastNameUser: data[0].LastNameUser,
        FirstNameUser: data[0].LastNameUser,
        EmailAddress: data[0].EmailAddress,
        UserNumber: data[0].UserNumber
      });
    });
  }


  ngOnInit() { 
    this.userService.getUsers().subscribe(userlist => {
      console.log(userlist);
      this.users = userlist;
    });
  }

}
