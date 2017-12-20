import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: `

      <div class="color-sample" [style.background]="'red'">
      Color Sample</div>
      
      <button [disabled]="true">Disabled</button> 
      
      <input [required]="true" value="Hello World !">
              
      `,
  styleUrls: ['./template-syntax-properties.component.css']
})
export class TemplateSyntaxPropertiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
