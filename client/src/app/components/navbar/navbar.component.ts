import { Component, OnInit, DoCheck} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserPrivilegeService } from '../../services/user-privilege.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  companyName;
  UserID;
  privileges;
  private subscription: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private userPrivilegeService: UserPrivilegeService,
    private activatedRoute: ActivatedRoute,
  
  ) { }

  // Function to logout user
  onLogoutClick() {
    this.userService.logout(); // Logout user
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    this.router.navigate(['/']); // Navigate back to home page
  }


  ngDoCheck() {
    if(this.userService.loggedIn() && this.userService.loggedSwitch() ) {
      console.log("YATTA");
      this.subscription = this.activatedRoute.params.subscribe(params => {
        this.UserID = localStorage.getItem('UserID');
        this.companyName = localStorage.getItem('CompanyNameUser');
        this.userPrivilegeService.getUserGroupPrivileges(this.UserID, this.companyName).subscribe(privilegelist => {
          this.privileges = privilegelist;
          console.log("PRIVILEGES");
          console.log(this.privileges);
        });
      });
      this.userService.setLoggedSwitch(0);
      


    }
  }

  ngOnInit() {
  }

}
