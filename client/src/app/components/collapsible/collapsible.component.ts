import { Component, OnInit } from '@angular/core';
import {CollapseOnClick} from "./collapse-on-click.directive";
@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.css']
})
export class CollapsibleComponent implements OnInit {

  title = 'app';

  constructor() { }

  ngOnInit() {
  }

}
