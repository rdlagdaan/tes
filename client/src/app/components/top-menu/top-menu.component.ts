import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { UserPrivilegeService } from '../../services/user-privilege.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  systemName;
  companyName;
  UserID;
  privileges;
  private subscription: any;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private userPrivilegeService: UserPrivilegeService,
    private activatedRoute: ActivatedRoute,
    
  ) { }


  ngOnInit() {

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.systemName = params['groupSystemID']; // (+) converts string 'id' to a number
      this.UserID = localStorage.getItem('UserID');
      this.companyName = localStorage.getItem('CompanyNameUser');
      this.userPrivilegeService.getUserModulePrivileges(this.UserID, this.companyName, this.systemName).subscribe(privilegelist => {
        this.privileges = privilegelist;
      });
    });

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateTo(value) {
    
    var string1 = value.indexOf('>');
    var string2 = value.indexOf('-');
    
    var linkPath1 = value.substring(0, string1);
    var linkPath2 = value.substring(string1+1, string2);
    var linkPath3 = value.substring(string2+1, value.length);
    
    /*if (value) {
        this.router.navigate([{ outlets: { sidemenu: value }}]);
    }
    return false;*/
    console.log("hey");
    console.log(linkPath1);
    console.log(linkPath2);
    console.log(linkPath3);
    
  }

}
