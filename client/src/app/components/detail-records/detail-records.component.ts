
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { UserPrivilegeService } from '../../services/user-privilege.service';


@Component({
  selector: 'app-detail-records',
  templateUrl: './detail-records.component.html',
  styleUrls: ['./detail-records.component.css']
})
export class DetailRecordsComponent implements OnInit, OnDestroy {

  systemName;
  companyName;
  UserID;
  private subscription: any;
  dataElementID;
  elementValueID;
  sourceSystemID;
  records;

  constructor(
    private router: Router,
    private userService: UserService,
    private userPrivilegeService: UserPrivilegeService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.records = null;
      this.systemName = params['groupSystemID']; // (+) converts string 'id' to a number
      this.UserID = localStorage.getItem('UserID');
      this.companyName = localStorage.getItem('CompanyNameUser');
      this.dataElementID = params['dataElementID']; // (+) converts string 'id' to a number
      this.elementValueID = params['elementValueID']; // (+) converts string 'id' to a number
      this.sourceSystemID = params['sourceSystemID']; // (+) converts string 'id' to a number
      
      if(this.dataElementID == "K12-Promotion-MNU") {
        console.log(this.dataElementID)
      //this.userPrivilegeService.getUserModulePrivileges(this.UserID, this.companyName, this.systemName).subscribe(privilegelist => {
      //  this.privileges = privilegelist;
      //});

      } else if(this.dataElementID == "SUMMARY-Grade-MNU") {
        console.log(this.dataElementID)

      } else if(this.dataElementID == "ACCOUNTS-Users-MNU") {

        this.userService.getUsers().subscribe(recordlist => {
          this.records = recordlist;
        });      
      }
 
    });
    



  }

}
