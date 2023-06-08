import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { FilePickerModule } from 'ngx-awesome-uploader';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './login/login.component';
import { InscritComponent } from './inscrit/inscrit.component';
import { CandidatComponent } from './candidat/candidat.component';
import { ProposComponent } from './propos/propos.component';
import { CComponent } from './c/c.component';
import { OffreComponent } from './offre/offre.component';
import { EventComponent } from './event/event.component';
import { CowComponent } from './cow/cow.component';

import { DetailoffreComponent } from './detailoffre/detailoffre.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RComponent } from './r/r.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidaturesCComponent } from './candidatures-c/candidatures-c.component';

import { ChangeBgDirective } from './change-bg.directive';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CandidaturesRComponent } from './candidatures-r/candidatures-r.component';
import { DatePipe } from '@angular/common';
import { FicheCComponent } from './fiche-c/fiche-c.component';
import { ListeComponent } from './liste/liste.component';

import { PComponent } from './p/p.component';

import { SponsorsComponent } from './sponsors/sponsors.component';

import { ParametreComponent } from './parametre/parametre.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilcComponent } from './profilc/profilc.component';
import { DetailscComponent } from './detailsc/detailsc.component';
import { ProfilrComponent } from './profilr/profilr.component';
import { DetailsrComponent } from './detailsr/detailsr.component';
import { OffrerComponent } from './offrer/offrer.component';
import { PostrComponent } from './postr/postr.component';
import { DetailsaComponent } from './detailsa/detailsa.component';
import { ParametrComponent } from './parametr/parametr.component';
import { ParametrerComponent } from './parametrer/parametrer.component';
import { PremieumcComponent } from './premieumc/premieumc.component';
import { VariablesGlobales } from './_helpers/variablesGlobales';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientComponent } from './client/client.component';
import { HeadComponent } from './head/head.component';

import { PosteComponent } from './poste/poste.component';
import { ContactComponent } from './contact/contact.component';





@NgModule({
  declarations: [

    AppComponent,
    PosteComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    InscritComponent,
    CandidatComponent,
    ProposComponent,
    CComponent,
    OffreComponent,
    EventComponent,
    CowComponent,
    DetailoffreComponent,
    ReservationComponent,
    RComponent,

 
    CandidaturesCComponent,
    CandidaturesRComponent,
    FicheCComponent,
    ListeComponent,

    ChangeBgDirective,
    PComponent,
  
    SponsorsComponent,

    ParametreComponent,
    AdminComponent,
    ProfilcComponent,
    DetailscComponent,
    ProfilrComponent,
    DetailsrComponent,
    OffrerComponent,
    PostrComponent,
    DetailsaComponent,
    CanvasJSChart,
    ParametrComponent,
    ParametrerComponent,
    PremieumcComponent,

    ClientComponent,
    HeadComponent,
    PosteComponent,
    ContactComponent,
   
  ],
  imports: [
   
    MatSnackBarModule,
    MatSnackBarModule,
    MatDialogModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FilePickerModule
  ],
  providers: [authInterceptorProviders, DatePipe, VariablesGlobales],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class HeaderModule { }