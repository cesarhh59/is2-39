import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  public alergenos: string [] = [];
  constructor() {
    this.alergenos.push('Lactosa');
    this.alergenos.push('Celiaco');
  }

  getAlergenos(): string[] {
    return this.alergenos;
  }
}
