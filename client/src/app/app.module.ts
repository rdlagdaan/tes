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

import {SelectModule} from 'ng2-select';
import { Observable } from 'rxjs/Observable';  

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { EJAngular2Module } from 'ej-angular2';
//import {AutoCompleteModule} from 'primeng/primeng';

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
import { UserComponent } from './components/user/user.component';
import { BuildingComponent } from './components/building/building.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { FinanceComponent } from './components/finance/finance.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DetailRecordsComponent } from './components/detail-records/detail-records.component';


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
import { UserPrivilegeService } from './services/user-privilege.service';
import { PersonalInformationService } from './services/personal-information.service';


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
    TreeViewComponent,
    RegistrarComponent,
    FinanceComponent,
    TopMenuComponent,
    SideMenuComponent,
    DetailRecordsComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    EJAngular2Module.forRoot(),
    SelectModule
  ],
  providers: [
    UserService, CollegeCourseService, AuthGuard, 
    NotAuthGuard, ReligionService, CollegeService, 
    CitizenshipService, SchoolNameService, UserPrivilegeService, PersonalInformationService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
