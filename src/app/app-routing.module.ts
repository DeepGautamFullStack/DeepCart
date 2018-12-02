import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { authGuardGuard } from './gaurd/auth-guard.guard';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { MycartComponent } from './mycart/mycart.component';

const routes: Routes = [
  {path:"",component:ProductdisplayComponent},
  {path:"profile",component:ProfileComponent,canActivate:[authGuardGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate:[authGuardGuard]},
  {path:"admin",component:AdminComponent,canActivate:[authGuardGuard]},
  {path:"productdisplay",component:ProductdisplayComponent},
  {path:"mycart",component:MycartComponent},
  {path:"**",component:ProductdisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
