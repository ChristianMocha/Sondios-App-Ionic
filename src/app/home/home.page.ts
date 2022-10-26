import { Component } from '@angular/core';
import { ANIMALES } from 'src/data/data.animales';
import { Animal } from 'src/interfaces/animal.interface';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  timeAudio: any;

  constructor() {
    this.animales  = ANIMALES.slice(0);
  }

  play(animal: Animal){
    this.stopAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.timeAudio = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private stopAudio(animalSel: Animal){
    clearTimeout(this.timeAudio);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (const animal of this.animales) {
      if ( animal.nombre != animalSel.nombre) animal.reproduciendo = false;
    }
  }

  deleteAnimal(i: number){
    this.animales.splice(i, 1);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.animales  = ANIMALES.slice(0);
      event.target.complete();
    }, 2000);
  };

  reordenarAnimal(event: any){
    console.log(event);
  }

}
