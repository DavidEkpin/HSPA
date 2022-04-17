import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  constructor() { }

  Property: any = {
    Id: 1,
    Name: "Lake House",
    Type: "House",
    Price: 1200
  }

  ngOnInit(): void {

  }

}
