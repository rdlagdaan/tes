
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { UserPrivilegeService } from '../../services/user-privilege.service';
import { PersonalInformationService } from '../../services/personal-information.service';


class User {
  FirstNameUser: string;
  LastNameUser: string;
  UserID: string;
  EmailAddress: string;
}


class PersonalInfo {
  StudentNumber: string;
  LNameStudent: string;
  FNameStudent: string;
  MNameStudent: string;
}



@Component({
  selector: 'app-detail-records',
  templateUrl: './detail-records.component.html',
  styleUrls: ['./detail-records.component.css']
})
export class DetailRecordsComponent implements OnInit, OnDestroy {

  groupSystem;
  companyName;
  UserID;
  private subscription: any;
  dataElementID;
  elementValueID;
  sourceSystemID;
  users: User[];
  personalInfos: PersonalInfo[];
  
  

    filteredItems : User[];
    personalInfoItems : PersonalInfo[];
    
    pages : number = 2;
    pageSize : number = 2;
    pageNumber : number = 0;
    currentIndex : number = 1;
    items: User[];
    pagesIndex : Array<number>;
    pageStart : number = 1;
    inputName : string = '';
    
    selectedUser: User;
  

  constructor(
    private router: Router,
    private userService: UserService,
    private userPrivilegeService: UserPrivilegeService,
    private personalInformationService: PersonalInformationService,
    private activatedRoute: ActivatedRoute,
  ) 
  { 
    

  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.users = null;
      this.personalInfos = null;
      
      this.groupSystem = params['groupSystemID']; // groupSystemID
      this.UserID = localStorage.getItem('UserID'); //UserID
      this.companyName = localStorage.getItem('CompanyNameUser'); //companyName
      this.dataElementID = params['dataElementID']; // dataElementID
      this.elementValueID = params['elementValueID']; // elementValueID
      this.sourceSystemID = params['sourceSystemID']; // sourceSystemID


      this.currentIndex = 1;
      this.pageStart = 1;
      this.pages = 4;
    
      
      if(this.dataElementID == "K12-Promotion-MNU") {
        console.log(this.dataElementID)
      //this.userPrivilegeService.getUserModulePrivileges(this.UserID, this.companyName, this.systemName).subscribe(privilegelist => {
      //  this.privileges = privilegelist;
      //});

      } else if(this.dataElementID == "SUMMARY-Grade-MNU") {
        console.log(this.dataElementID)

      } else if(this.dataElementID == "ACCOUNTS-Users-MNU") {

        this.userService.getUsers().subscribe(userlist => {
          this.users = userlist;
          this.filteredItems = this.users;

          console.log("PAGE START");
          console.log(this.pageStart);
          this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
          if(this.filteredItems.length % this.pageSize != 0){
              this.pageNumber ++;
          }
      
          if(this.pageNumber  < this.pages){
              this.pages =  this.pageNumber;
          }
      
          this.refreshItems();
          console.log("this.pageNumber :  "+this.pageNumber);

        });      
      } else if(this.dataElementID == 'OAR-PersonalProfile-MNU') {

        var start = 0;
        var limit = 20;

        this.personalInformationService.getPersonalProfilesBatch(start, limit).subscribe(reclist => {
          this.personalInfos = reclist;
          this.personalInfoItems = this.personalInfos;

          console.log("PAGE START");
          console.log(this.pageStart);
          this.pageNumber = parseInt(""+ (this.personalInfoItems.length / this.pageSize));
          if(this.personalInfoItems.length % this.pageSize != 0){
              this.pageNumber ++;
          }
      
          if(this.pageNumber  < this.pages){
              this.pages =  this.pageNumber;
          }
      
          this.refreshItems();
          console.log("this.pageNumber :  "+this.pageNumber);

        });      
        


      }
 

      




    });


  }

  fillArray(): any{
    var obj = new Array();
    for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
                obj.push(index);
    }
    return obj;
 }


  refreshItems(){
    this.items = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex =  this.fillArray();
}

   prevPage(DataElementID , ElementValueID , GroupSystemID , OrgCode, SourceSystemID){
      /*if(this.currentIndex>1){
         this.currentIndex --;
      } 
      if(this.currentIndex < this.pageStart){
         this.pageStart = this.currentIndex;
      }
      this.refreshItems();*/

      this.router.navigate([{ outlets: { detail: ['detailrecords', DataElementID , ElementValueID , GroupSystemID , OrgCode, SourceSystemID] }}]);
      return false;

   }

   nextPage(DataElementID , ElementValueID , GroupSystemID , OrgCode, SourceSystemID){
      /*if(this.currentIndex < this.pageNumber){
            this.currentIndex ++;
      }
      if(this.currentIndex >= (this.pageStart + this.pages)){
         this.pageStart = this.currentIndex - this.pages + 1;
      }
 
      this.refreshItems();*/
      
      this.router.navigate([{ outlets: { detail: ['detailrecords', DataElementID , ElementValueID , GroupSystemID , OrgCode, SourceSystemID] }}]);
      return false;
    
   }


   setPage(index : number){
         this.currentIndex = index;
         this.refreshItems();
    }



}
