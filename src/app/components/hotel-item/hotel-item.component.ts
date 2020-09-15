import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {IHotel} from '../../models/app.model';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelItemComponent {
  @Input()
  set hotel(hotel: IHotel) {
    this.venueHotel = hotel;
  }

  get hotel(): IHotel {
    return this.venueHotel;
  }

  @Input()
  set selected(selectedHotel: IHotel) {
    this.selectedVenueHotel = selectedHotel;
  }

  get selected(): IHotel {
    return this.selectedVenueHotel;
  }

  @Output() selectHotel = new EventEmitter();

  public venueHotel: IHotel;
  public selectedVenueHotel: IHotel = null;

  constructor() {
  }

  public chooseHotel(): void {
    this.selectHotel.emit(this.hotel)
  }
}
