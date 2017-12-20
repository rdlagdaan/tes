import { Component, OnInit } from '@angular/core';
import { ColorPreviewer}  from "./color-previewer";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  title = 'app';

  constructor() { }

  ngOnInit() {
  }

}
