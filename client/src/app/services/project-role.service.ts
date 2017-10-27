import { Injectable, Inject } from '@angular/core';  
import { Observable } from 'rxjs/Observable';  
import { Http } from '@angular/http';  
import 'rxjs/Rx';  
  
@Injectable()  
export class ProjectRoleService {  
    domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
    

    constructor(private _http: Http) {  
    }      


        getMenuDetails(roleName: string) {  
            let _url = this.domain + "/Menu/GetMenuDetails?roleName=" + roleName;  
  
            return new Promise((resolve, reject) => {  
                this._http.get(_url)  
                    .map(res =>res.json())  
                    .catch((error: any) => {  
                        console.error(error);  
                        reject(error);  
                        return Observable.throw(error.json().error || 'Server error');  
                    })  
                    .subscribe((data) => {  
                        resolve(data);  
                    });  
            });  
        }  
}  