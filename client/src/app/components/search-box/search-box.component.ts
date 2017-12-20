import {Component} from "@angular/core";

import { SearchBoxDetailComponent } from './search-box-detail/search-box-detail.component';


@Component({
    selector:'search-box',
    template: `<search-box-detail (search)="onSearch($event)"
                    text="Type Your Search Here">
               </search-box-detail>`
})
export class SearchBoxComponent {
    
    onSearch(text) {
        alert(`From App Component: ${text}`);
    }

}