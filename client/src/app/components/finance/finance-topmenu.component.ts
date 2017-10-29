import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { UserPrivilegeService } from '../../services/user-privilege.service';

@Component({
  selector: 'app-finance-topmenu',
  templateUrl: './finance-topmenu.component.html',
  styleUrls: ['./finance-topmenu.component.css']
})
export class FinanceTopmenuComponent implements OnInit {

  systemName = "FINANCE";
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

}
