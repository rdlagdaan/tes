import {Component, Input} from '@angular/core';  
@Component({  
    selector: 'tree-view',      
    templateUrl: './tree-view.html',  
    styleUrls: ['./tree-view.css']      
})  
export class TreeView {  
    @Input() menuList: any;  
}  