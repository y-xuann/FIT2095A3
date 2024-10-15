import { Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { SocketTranslateComponent } from './socket-translate/socket-translate.component';
import { SocketTextToSpeechComponent } from './socket-text-to-speech/socket-text-to-speech.component';
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-driver', component: AddDriverComponent, canActivate:[authGuard]},
    { path: 'add-package', component: AddPackageComponent, canActivate:[authGuard]},
    { path: 'delete-driver', component: DeleteDriverComponent, canActivate:[authGuard]},
    { path: 'delete-package', component: DeletePackageComponent, canActivate:[authGuard] },
    { path: 'invalid-data', component: InvalidDataComponent },
    { path: 'list-drivers', component: ListDriversComponent, canActivate:[authGuard] },
    { path: 'list-packages', component: ListPackagesComponent, canActivate:[authGuard] },
    { path: 'statistics', component: StatisticsComponent, canActivate:[authGuard] },
    { path: 'update-driver', component: UpdateDriverComponent, canActivate:[authGuard] },
    { path: 'update-package', component: UpdatePackageComponent, canActivate:[authGuard] },
    { path: 'socket-translate', component: SocketTranslateComponent, canActivate:[authGuard] },
    { path: 'socket-text-to-speech', component: SocketTextToSpeechComponent, canActivate:[authGuard]},
    { path: 'generative-ai', component:GenerativeAiComponent, canActivate:[authGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', component: PageNotFoundComponent }
];
 