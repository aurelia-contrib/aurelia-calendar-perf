import { RegistryService } from "./registy-service";
import { autoinject } from "aurelia-framework";

@autoinject
export class AppCalendar {

  hours: number[];
  days: string[];
  isLoaded: boolean;
  constructor(private registryService: RegistryService) {
    this.days = Array.apply(null, { length: 31 }).map((day, i) => `Oct ${i + 1}`);
    this.hours =  Array.apply(null, { length: 24 }).map((day, i) => i);
  }
   
  load() {
    this.isLoaded = true;
  }

  searchAll() {
    this.registryService.searchAllCells();
  }
}
