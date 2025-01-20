import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterDetailComponent } from '../newsletter-detail/newsletter-detail.component';
import { Newsletter } from '../newsletter';
import { NewsstandService } from '../newsstand.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NewsletterDetailComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>      </form>
    </section>
    <section class="results">
      <app-newsletter-detail *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-newsletter-detail>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: Newsletter[] = [];
  housingService: NewsstandService = inject(NewsstandService);
  filteredLocationList: Newsletter[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: Newsletter[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
