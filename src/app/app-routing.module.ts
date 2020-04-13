import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentComponent } from './components/document/document.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards';

const appRoutes: Routes = [
  { path: '', component: DocumentsComponent, canActivate: [AuthGuard] },
  { path: 'document/:id', component: DocumentComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
