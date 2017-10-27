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
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
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
    path: 'treeview', component: TreeViewComponent 
  },
  { 
    path: 'registrar', component: TreeViewComponent 
  },
  
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }