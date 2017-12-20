import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";

@Component({
  selector: 'search-box-detail',
  templateUrl: './search-box-detail.component.html',
  styleUrls: ['./search-box-detail.component.css']
})
export class SearchBoxDetailComponent implements OnInit {

  @Input()
  text:string;

  @Output()
  search = new EventEmitter();

  clear(box) {
      box.value = '';
  }

  onSearch(searchText) {
    console.log(searchText);
      this.search.emit(searchText);
      
  }

  constructor() { }

  ngOnInit() {
  }

}
