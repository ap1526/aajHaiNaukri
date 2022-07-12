import { City } from './city.model';

export class State {
  id!: string;
  name!: string;
  cities: City[] = [];
}
