import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { UserComponent } from './components/user/user.component';
import { CitizenshipComponent } from './components/citizenship/citizenship.component';
import { ReligionComponent } from './components/religion/religion.component';
import { CollegeComponent } from './components/college/college.component';
import { SchoolNameComponent } from './components/school-name/school-name.component';
import { CollegeCourseComponent } from './components/college-course/college-course.component';

import { RegistrarComponent } from './components/registrar/registrar.component';
import { FinanceComponent } from './components/finance/finance.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DetailRecordsComponent } from './components/detail-records/detail-records.component';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { TemplateSyntaxPropertiesComponent } from './components/template-syntax-properties/template-syntax-properties.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';

import { TreeViewComponent } from './shared/treeview-menu/treeview.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent, // Default Route
    outlet: 'sidemenu'
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard], // User must NOT be logged in to view this route
    outlet: "detail"
  },

  {
    path: 'user',
    component: UserComponent, // User Route
    canActivate: [AuthGuard] //  User must be logged in to view this route
  },
  
  {
    path: 'citizenship',
    component: CitizenshipComponent, // Citizenship Route
    canActivate: [AuthGuard] //  User must be logged in to view this route
  },

  {
    path: 'religion',
    component: ReligionComponent, // Religion Route
    canActivate: [AuthGuard] //  User must be logged in to view this route
  },

  {
    path: 'college',
    component: CollegeComponent, // College Route
    canActivate: [AuthGuard] //  User must be logged in to view this route
  },


  {
    path: 'schoolname',
    component: SchoolNameComponent, // SchoolName Route
    canActivate: [AuthGuard] //  User must be logged in to view this route
  },


  {
    path: 'collegecourse',
    component: CollegeCourseComponent, // CollegeCourse Route
    canActivate: [AuthGuard] //  User must be logged in to view this route
  },
  { 
    path: 'topmenu/:groupSystemID', 
    component: TopMenuComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
  },

  { 
    path: 'sidemenu/:groupSystemID/:sourceSystemID/:dataElementID', 
    component: SideMenuComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
    outlet: 'sidemenu'
  },
  
  { 
    path: 'detailrecords/:dataElementID/:elementValueID/:groupSystemID/:orgCode/:sourceSystemID', 
    component: DetailRecordsComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
    outlet: 'detail'
  },

  { 
    path: 'helloworld/:dataElementID/:elementValueID/:groupSystemID/:orgCode/:sourceSystemID', 
    component: HelloWorldComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
    outlet: 'detail'
  },

  { 
    path: 'templatesyntaxproperties/:dataElementID/:elementValueID/:groupSystemID/:orgCode/:sourceSystemID', 
    component: TemplateSyntaxPropertiesComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
    outlet: 'detail'
  },

  { 
    path: 'searchbox/:dataElementID/:elementValueID/:groupSystemID/:orgCode/:sourceSystemID', 
    component: SearchBoxComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
    outlet: 'detail'
  },


  { 
    path: 'colorpicker/:dataElementID/:elementValueID/:groupSystemID/:orgCode/:sourceSystemID', 
    component: ColorPickerComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
    outlet: 'detail'
  },

  { 
    path: 'collapsible/:dataElementID/:elementValueID/:groupSystemID/:orgCode/:sourceSystemID', 
    component: CollapsibleComponent, 
    canActivate: [AuthGuard], //  User must be logged in to view this route
    outlet: 'detail'
  },



  { 
    path: 'treeview', component: TreeViewComponent 
  },
  
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false }) ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }