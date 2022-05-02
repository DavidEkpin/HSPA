import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Property } from 'src/app/Model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  property = new Property();

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingServic: HousingService
  ) {}

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.getProperty();

    this.galleryOptions = [
      {
        width: '100',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
      /* // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      }, */
    ];

    this.galleryImages = [
      {
        small: 'assets/images/house.jpg',
        medium: 'assets/images/house.jpg',
        big: 'assets/images/house.jpg',
      },
      {
        small: 'assets/images/house.jpg',
        medium: 'assets/images/house.jpg',
        big: 'assets/images/house.jpg',
      },
      {
        small: 'assets/images/house.jpg',
        medium: 'assets/images/house.jpg',
        big: 'assets/images/house.jpg',
      },
      {
        small: 'assets/images/house.jpg',
        medium: 'assets/images/house.jpg',
        big: 'assets/images/house.jpg',
      },
      {
        small: 'assets/images/house.jpg',
        medium: 'assets/images/house.jpg',
        big: 'assets/images/house.jpg',
      },
    ];

     console.log(this.galleryImages[0]);


    //Learn and implement angular resolvers
    /* this.route.data.subscribe(
      (data: any) => {
        this.property = data['prp']
      }
    ) */

    /*  this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id']
      }
    ) */
  }

  getProperty() {
    this.housingServic.getProperty(this.propertyId).subscribe({
      next: (data) => {
        this.property = data;
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }
}
