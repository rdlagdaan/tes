import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
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
  public items: Array<any> = []; 

  //public items = new Array();
  
  resize: boolean;
  btndisplay: boolean;
  selectIndex: number;
  
  
  constructor(
    private router: Router,
    private userService: UserService,
    private userPrivilegeService: UserPrivilegeService,
    private activatedRoute: ActivatedRoute,
    
  ) { }


  ngOnInit() {
    //this.items.push("hello");
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.items.length = 0;
      this.systemName = params['groupSystemID']; // (+) converts string 'id' to a number
      this.UserID = localStorage.getItem('UserID');
      this.companyName = localStorage.getItem('CompanyNameUser');
      this.userPrivilegeService.getUserModulePrivileges(this.UserID, this.companyName, this.systemName).subscribe(privilegelist => {
        this.privileges = privilegelist;

       /* for(var i in privilegelist) {
          this.items.push(privilegelist[i]['Modules']);
          //this.items.push('i');
        }

        console.log(this.items);
        console.log("ITEMS");        */

      });
    });

  }


  /*filterPrvileges(event) {
    let query = event.query;
    this.countryService.getCountries().then(countries => {
        this.filteredCountriesSingle = this.filterCountry(query, countries);
    });

    this.userPrivilegeService.getUserModulePrivileges(this.UserID, this.companyName, this.systemName).subscribe(privilegelist => {
      this.privileges = this.filterCountry(query, privilegelist);

     for(var i in privilegelist) {
        this.items.push(privilegelist[i]['Modules']);
        //this.items.push('i');
      }

      console.log(this.items);
      console.log("ITEMS");        

    });


}*/



  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.items.length = 0;
  }

  navigateTo(value) {
    

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.systemName = params['groupSystemID']; // (+) converts string 'id' to a number
      var string1 = value.indexOf('>');
      var string2 = value.indexOf('-');
      
      var sourceSystemID = value.substring(0, string1);
      var linkPath2 = value.substring(string1+1, string2);
      var linkPath3 = value.substring(string2+1, value.length);
      var dataElementID = linkPath2 + '-' +linkPath3;
      
      if (value) {
          this.router.navigate([{ outlets: { sidemenu: ['sidemenu', this.systemName, sourceSystemID, dataElementID] }}]);
      }
      return false;
      
    });
    
  }



  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
  
  private get disabledV():string {
    return this._disabledV;
  }
  
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
  
  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }
  
  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }
  
  public typed(value:any):void {
    console.log('New search input: ', value);
  }
  
  public refreshValue(value:any):void {
    console.log("REFRESH");
    console.log(value);
    this.value = value;
  }

}
