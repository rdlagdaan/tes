import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { UserPrivilegeService } from '../../services/user-privilege.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  systemName;
  companyName;
  UserID;
  privileges;
  sourceSystemID;
  dataElementID;
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
      this.sourceSystemID = params['sourceSystemID']; // (+) converts string 'id' to a number
      this.dataElementID = params['dataElementID']; // (+) converts string 'id' to a number
      
      
      this.UserID = localStorage.getItem('UserID');
      this.companyName = localStorage.getItem('CompanyNameUser');
      this.userPrivilegeService.getUserMenuPrivileges(this.UserID, this.companyName, this.systemName, this.sourceSystemID, this.dataElementID + '-MNU').subscribe(privilegelist => {
        this.privileges = privilegelist;
        console.log(this.privileges);
      });
    });



  }

  navigate(data) {
      if(data.DataElementID == "ANGULAR-Beginner-MNU" && data.ElementValueID == "HelloWorld") {
        this.router.navigate([{ outlets: { detail: ['helloworld',data.DataElementID ,data.ElementValueID ,data.GroupSystemID ,data.OrgCode, data.SourceSystemID] }}]);
      } else if(data.DataElementID == "ANGULAR-Beginner-MNU" && data.ElementValueID == "TemplateSyntaxProperties") {
        this.router.navigate([{ outlets: { detail: ['templatesyntaxproperties',data.DataElementID ,data.ElementValueID ,data.GroupSystemID ,data.OrgCode, data.SourceSystemID] }}]);
      } else if(data.DataElementID == "ANGULAR-Beginner-MNU" && data.ElementValueID == "SearchBox") {
        this.router.navigate([{ outlets: { detail: ['searchbox',data.DataElementID ,data.ElementValueID ,data.GroupSystemID ,data.OrgCode, data.SourceSystemID] }}]);
      } else if(data.DataElementID == "ANGULAR-Beginner-MNU" && data.ElementValueID == "ColorPicker") {
        this.router.navigate([{ outlets: { detail: ['colorpicker',data.DataElementID ,data.ElementValueID ,data.GroupSystemID ,data.OrgCode, data.SourceSystemID] }}]);
      } else if(data.DataElementID == "ANGULAR-Beginner-MNU" && data.ElementValueID == "Collapsible") {
        this.router.navigate([{ outlets: { detail: ['collapsible',data.DataElementID ,data.ElementValueID ,data.GroupSystemID ,data.OrgCode, data.SourceSystemID] }}]);
      } else {
        this.router.navigate([{ outlets: { detail: ['detailrecords',data.DataElementID ,data.ElementValueID ,data.GroupSystemID ,data.OrgCode, data.SourceSystemID] }}]);
      }
      return false;
  }
}