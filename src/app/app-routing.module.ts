import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
;
import { OffreRComponent } from './offre-r/offre-r.component';

import { CandidaturesCComponent } from './candidatures-c/candidatures-c.component';
import { CandidaturesRComponent } from './candidatures-r/candidatures-r.component';

import { PremieumcComponent } from './premieumc/premieumc.component';

import { ParametrerComponent } from './parametrer/parametrer.component';


import { FicheCComponent } from './fiche-c/fiche-c.component';
import { ListeComponent } from './liste/liste.component';
import { ParametreComponent } from './parametre/parametre.component';

import { SponsorsComponent } from './sponsors/sponsors.component';


import { AdminComponent } from './admin/admin.component';
import { ProfilcComponent } from './profilc/profilc.component';
import { DetailscComponent } from './detailsc/detailsc.component';
import { ProfilrComponent } from './profilr/profilr.component';
import { DetailsrComponent } from './detailsr/detailsr.component';
import { OffrerComponent } from './offrer/offrer.component';
import { PostrComponent } from './postr/postr.component';
import { DetailsaComponent } from './detailsa/detailsa.component';

import { ClientComponent } from './client/client.component';

import { PosteComponent } from './poste/poste.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [

  { path: "contact", component: ContactComponent },
  { path: "premieumc", component: PremieumcComponent },

  { path: "parametrer", component: ParametrerComponent },

 

  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "inscrit", component: InscritComponent },
  { path: "inscrit/:code", component: InscritComponent },
  { path: "Client", component: ClientComponent },
 
  { path: "Fournisseur", component: CandidatComponent },
  { path: "propos", component: ProposComponent },
  { path: "c", component: CComponent },
  { path: "offre", component: OffreComponent },
  { path: "event", component: EventComponent },
  { path: "cow", component: CowComponent },

  { path: "detailoffre/:id", component: DetailoffreComponent },
  { path: "reservation", component: ReservationComponent },
  { path: "postes", component: PosteComponent },
  { path: "r", component: RComponent },

  { path: "offreR", component: OffreRComponent },


  { path: "candidaturesR", component: CandidaturesRComponent },

  { path: "candidaturesC", component: CandidaturesCComponent },

  { path: "ficheC", component: FicheCComponent },
  { path: "liste", component: ListeComponent },
  { path: "parametre", component: ParametreComponent },


  { path: "sponsors", component: SponsorsComponent },
 
  { path: "admin", component: AdminComponent },
  { path: "profilc", component: ProfilcComponent },
  { path: "detailsc", component: DetailscComponent },
  { path: "profilr", component: ProfilrComponent },
  { path: "detailsr", component: DetailsrComponent },
  { path: "offrer", component: OffrerComponent },
  { path: "postp", component: PostrComponent },
  { path: "detailsa", component: DetailsaComponent },
 

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
