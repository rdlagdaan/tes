import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registrar-topmenu',
  templateUrl: './registrar-topmenu.component.html',
  styleUrls: ['./registrar-topmenu.component.css']
})
export class RegistrarTopmenuComponent implements OnInit {

  systemName = "REGISTRAR";

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
