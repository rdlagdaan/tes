import { Component, OnInit } from '@angular/core';

@Component({
  selector:'hello-world',
  template: `<h1>Hello World !</h1>`
})
export class HelloWorldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

