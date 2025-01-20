import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewsstandService } from '../newsstand.service';
import { Newsletter } from '../newsletter';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule],
  template: `
    <article>
      <img class="newsletter-photo" [src]="newsletterDetail?.photo"
           alt="Photo of {{newsletterDetail?.name}}"/>
      <section class="newsletter-description">
        <h2 class="newsletter-heading">{{ newsletterDetail?.name }}</h2>
        <p class="newsletter-location">{{ newsletterDetail?.city }}, {{ newsletterDetail?.state }}</p>
      </section>
      <section class="newsletter-features">
        <h2 class="section-heading">About this newsletter</h2>
        <ul>
          <li>Units available: {{ newsletterDetail?.availableUnits }}</li>
          <li>Does this location have wifi: {{ newsletterDetail?.wifi }}</li>
          <li>Does this location have laundry: {{ newsletterDetail?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  newsstandService = inject(NewsstandService);
  newsletterDetail: Newsletter | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.newsstandService.getHousingLocationById(housingLocationId).then(newsletterDetail => {
      this.newsletterDetail = newsletterDetail;
    });
  }

  submitApplication() {
    this.newsstandService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
