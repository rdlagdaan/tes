/*---------------------------
-MODULES---------------------
-----------------------------*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpInterceptor } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';  
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './app.routing.module';

import { Observable } from 'rxjs/Observable';  

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';
import { EJAngular2Module } from 'ej-angular2';
/*---------------------------
-COMPONENTS---------------------
-----------------------------*/
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CitizenshipComponent } from './components/citizenship/citizenship.component';
import { ReligionComponent } from './components/religion/religion.component';
import { CollegeComponent } from './components/college/college.component';
import { SchoolNameComponent } from './components/school-name/school-name.component';
import { CollegeCourseComponent } from './components/college-course/college-course.component';

import { TreeViewComponent } from './shared/treeview-menu/treeview.component';

/*---------------------------
-SERVICES---------------------
-----------------------------*/
import { UserService } from './services/user.service';
import { CollegeCourseService } from './services/college-course.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ReligionService } from './services/religion.service';
import { CollegeService } from './services/college.service';
import { CitizenshipService } from './services/citizenship.service';
import { SchoolNameService } from './services/school-name.service';
import { UserComponent } from './components/user/user.component';
import { BuildingComponent } from './components/building/building.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CitizenshipComponent,
    ReligionComponent,
    CollegeComponent,
    SchoolNameComponent,
    CollegeCourseComponent,
    UserComponent,
    BuildingComponent,
    TreeViewComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdMenuModule,
    MdToolbarModule,
    EJAngular2Module.forRoot()
  ],
  providers: [
    UserService, CollegeCourseService, AuthGuard, 
    NotAuthGuard, ReligionService, CollegeService, 
    CitizenshipService, SchoolNameService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
