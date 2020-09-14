import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.css']
})
export class HotelItemComponent implements OnInit {
  @Input() hotel: any;
  @Output() selectHotel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  chooseHotel() {
    this.selectHotel.emit(this.hotel)
  }

}
