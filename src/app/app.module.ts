import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { VgListComponent } from './vg-list/vg-list.component';
import { SingleVgComponent } from './vg-list/single-vg/single-vg.component';
import { VgFormComponent } from './vg-list/vg-form/vg-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { VgsService } from './services/vgs.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { VgEditComponent } from './vg-edit/vg-edit.component';

const appRoutes: Routes = [
  {path : 'auth/signup', component: SignupComponent},
  {path : 'auth/signin', component: SigninComponent},
  {path : 'vgs', canActivate: [AuthGuardService], component: VgListComponent},
  {path : 'vgs/new', canActivate: [AuthGuardService],  component: VgFormComponent},
  {path : 'vgs/edit/:id', canActivate: [AuthGuardService],  component: VgEditComponent},
  {path : 'vgs/view/:id', canActivate: [AuthGuardService],  component: SingleVgComponent},
  {path : '', redirectTo: 'vgs', pathMatch: 'full'},
  {path : '**', redirectTo: 'vgs'},
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    VgListComponent,
    SingleVgComponent,
    VgFormComponent,
    VgEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    VgsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
