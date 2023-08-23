import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddDevicesComponent } from './add-devices/add-devices.component';


const routes: Routes = [
  { path: 'shsfrontendla/src/app/homepage', component: HomepageComponent },
  { path: 'shsfrontendla/src/app/add-devices', component: AddDevicesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
