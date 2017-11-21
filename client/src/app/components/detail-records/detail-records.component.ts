
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { UserPrivilegeService } from '../../services/user-privilege.service';


class User {
  FirstNameUser: string;
  LastNameUser: string;
  UserID: string;
  EmailAddress: string;
}



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
  records: User[];
  
    filteredItems : User[];
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
    private activatedRoute: ActivatedRoute,
  ) 
  { 
    

  }

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
          this.filteredItems = this.records;
          
       
          this.currentIndex = 1;
          this.pageStart = 1;
          this.pages = 4;

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

   prevPage(){
      if(this.currentIndex>1){
         this.currentIndex --;
      } 
      if(this.currentIndex < this.pageStart){
         this.pageStart = this.currentIndex;
      }
      this.refreshItems();
   }

   nextPage(DataElementID , ElementValueID , GroupSystemID , OrgCode, SourceSystemID){
      /*if(this.currentIndex < this.pageNumber){
            this.currentIndex ++;
      }
      if(this.currentIndex >= (this.pageStart + this.pages)){
         this.pageStart = this.currentIndex - this.pages + 1;
      }
 
      this.refreshItems();*/

      console.log("HEY");
      console.log(DataElementID);
      console.log(ElementValueID);
      
      this.router.navigate([{ outlets: { detail: ['detailrecords', DataElementID , ElementValueID , GroupSystemID , OrgCode, SourceSystemID] }}]);
      return false;
    
   }


   setPage(index : number){
         this.currentIndex = index;
         this.refreshItems();
    }



}
