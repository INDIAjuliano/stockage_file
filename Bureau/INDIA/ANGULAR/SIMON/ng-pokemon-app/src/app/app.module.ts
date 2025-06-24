import { NgModule } from '@angular/core'; //  @NgModule depuis le core d’Angular. Ce décorateur est utilisé pour définir un module Angular.
import { BrowserModule } from '@angular/platform-browser';
//BrowserModule, un module nécessaire pour toute application Angular qui s'exécute dans un navigateur.
import { AppRoutingModule } from './app-routing.module'; // AppRoutingModule) qui contient les définitions de routes pour naviguer entre les composants.
import { AppComponent } from './app.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { PageNotFondComponent } from './page-not-fond/page-not-fond.component'; // AppComponent, le composant principal de l'application.

//Déclaration du Module Angular
@NgModule({
  declarations: [
    AppComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    ListPokemonComponent,
    DetailPokemonComponent,
    PageNotFondComponent
  ],
  // Le tableau declarations contient les composants, directives et pipes qui appartiennent à ce module.

  // Le tableau imports contient d'autres modules dont ce module a besoin.
  imports: [
    BrowserModule,
    AppRoutingModule
  ],

  // Le tableau providers est utilisé pour déclarer les services qui seront disponibles dans l'application.
  // Le tableau bootstrap contient le composant principal qui sera chargé au démarrage de l'application.
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
