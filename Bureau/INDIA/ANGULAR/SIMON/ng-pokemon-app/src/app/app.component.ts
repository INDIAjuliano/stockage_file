import { Component, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { POKEMONS } from './moke-pokemon-list';
// import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root', // nom de composant
  templateUrl: './app.component.html', // template HTML
  standalone: false,
  styleUrls: ['./app.component.css'], // fichier CSS
})
export class AppComponent {
  // pokemonList: Pokemon[] = POKEMONS;
  // pokemonSelected: Pokemon | undefined;
  Title = 'Liste de Pokemons';

  // ngOnInit(): void {
  //   console.table(this.pokemonList);
  // }

  // selectPokemon(event: MouseEvent): void {
  //   const index: number = +(event.target as HTMLInputElement).value
  //   console.log(`Vous avez selectioné sur : ${this.pokemonList[index].name}`);
  // }


  // selectPokemon(pokemonId: string): void {
  //   // const id = +pokemonId;
  //   const pokemon: Pokemon | undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId);
  //   // const index = id + 1;
  //   if (pokemon) {
  //     console.log(`Vous avez démandé le pokémon : ${pokemon.name} `);
  //     this.pokemonSelected = pokemon;
  //   } else {
  //     console.log(`Vous avez selectioné un pokemon qui n'existe pas`);
  //   }
  // }
  menuVisible = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}
