import { Injectable } from '@angular/core';
import {Newsletter} from './newsletter';

@Injectable({
  providedIn: 'root'
})
export class NewsstandService {

  constructor() { }

  //readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<Newsletter[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<Newsletter | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
