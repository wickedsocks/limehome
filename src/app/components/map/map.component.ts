import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public latitude: number = 51.673858;
  public longitude: number = 7.815982;
  public showMap = false;
  public hotels = [];

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this._findMe();
  }

  public onChoseLocation(event): void {
    console.log(event);
  }

  private _findMe(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this._setMyPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser. So we show you location by default");
      this.showMap = true;
      this._getHotels();
    }
  }

  private _setMyPosition(position): void {
    if (position && position.coords) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.showMap = true;
      this._getHotels();
    }
  }

  private _getHotels(): void {
    this._apiService.getHotels(this.latitude, this.longitude).subscribe((res) => this.hotels = res);
  }

  public markerClick(hotel) {
    this.hotels.map((hotel) => {
      hotel.icon = '/assets/home.svg';
    });
    hotel.icon = '/assets/home-active.svg';
  }

  public chooseHotel(hotel) {
    this.markerClick(hotel);
  }
}
