import {Component, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ApiService} from '../../services/api.service';
import {IHotel} from '../../models/app.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public latitude = 51.673858;
  public longitude = 7.815982;
  public zoom = 11;
  public showMap = false;
  public hotels: IHotel[] = [];
  public selectedHotel: IHotel;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _apiService: ApiService) {
  }

  ngOnInit(): void {
    this._findMe();
  }

  public onChoseLocation(event): void {
    console.log(event);
  }

  public onZoomChanged(zoom: number): void {
    this.zoom = zoom;
  }

  private _findMe(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this._setMyPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser. So we show you location by default');
      this.showMap = true;
      this._getHotels();
    }
  }

  private _setMyPosition(position: Position): void {
    if (position && position.coords) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.showMap = true;
      this._getHotels();
    }
  }

  private _getHotels(): void {
    this._apiService.getHotels(this.latitude, this.longitude)
      .pipe(takeUntil(this._destroy$))
      .subscribe((hotels: IHotel[]) => this.hotels = hotels);
  }

  public markerClick(selectedHotel: IHotel): void {
    this.selectedHotel = selectedHotel;
    this.hotels.map((hotel) => {
      hotel.icon = '/assets/images/home.svg';
    });
    selectedHotel.icon = '/assets/images/home-active.svg';
    this.zoom = 18;
    this.latitude = selectedHotel.location.latitude;
    this.longitude = selectedHotel.location.longitude;
  }

  public chooseHotel(hotel: IHotel): void {
    this.markerClick(hotel);
  }
}
