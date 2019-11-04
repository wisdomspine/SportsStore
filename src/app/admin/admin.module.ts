import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';

const routing = RouterModule.forChild([
    {path: 'auth', component: AuthComponent},
    {path: 'main', component: AdminComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'auth'}
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing],
    declarations: [AuthComponent, AdminComponent],
    providers: [AuthGuard]
})
export class AdminModule {

}
