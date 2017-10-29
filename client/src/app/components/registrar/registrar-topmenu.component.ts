import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { UserPrivilegeService } from '../../services/user-privilege.service';

@Component({
  selector: 'app-registrar-topmenu',
  templateUrl: './registrar-topmenu.component.html',
  styleUrls: ['./registrar-topmenu.component.css']
})
export class RegistrarTopmenuComponent implements OnInit {

  systemName = "REGISTRAR";
  privileges = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private userPrivilegeService: UserPrivilegeService,
  ) { }

  ngOnInit() {
    this.userPrivilegeService.getUserModulePrivileges('rdlagdaan', 'TUA', this.systemName).subscribe(privilegelist => {
      console.log("PRIVILEGES: ");
      console.log(privilegelist);
      this.privileges = privilegelist;
    });
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
