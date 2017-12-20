import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BLUE, RED} from "../../../shared/constants";

@Component({
  selector: 'color-picker-detail',
  templateUrl: './color-picker-detail.component.html',
  styleUrls: ['../color-previewer.css']
})
export class ColorPickerDetailComponent implements OnInit {

  text = "Type your Search"; //INTERPOLATION
  @Input('placeholder')
  textInput = "Type your Search";

  @Input()
  color: string;

  clear(input) {
    console.log("Clear...clicked");
    input.value = '';
  }



  @Output("color")
  colorOutput = new EventEmitter();

  choose(color) {
    console.log(color);
    this.colorOutput.emit(color);
  }

  reset() {
    this.colorOutput.emit('black');
  }

  constructor() { }

  ngOnInit() {
  }

}
