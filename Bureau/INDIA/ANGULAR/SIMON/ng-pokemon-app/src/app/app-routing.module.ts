import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { Pokemon } from './pokemon';
import { POKEMONS } from './moke-pokemon-list';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { PageNotFondComponent } from './page-not-fond/page-not-fond.component';

const routes: Routes = [

  { path: 'pokemons', component: ListPokemonComponent },
  { path: 'pokemon/:id', component: DetailPokemonComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  // Redirect to the list of pokemons
  {
    path: '**', component: PageNotFondComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  pokemonList: Pokemon[] = POKEMONS;

}
