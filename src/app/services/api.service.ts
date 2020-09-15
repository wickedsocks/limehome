import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {IHotel} from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {
  }

  public getHotels(lat, lng): Observable<any> {
    const params = new HttpParams()
      .set('client_id', environment.foursquareClientId)
      .set('client_secret', environment.foursquareClientSecret)
      .set('venuePhotos', '1')
      .set('v', '20131124')
      .set('ll', `${lat},${lng}`)
      .set('query', 'hotel')
      .set('limit', '10');

    return this._http
      .get(`${environment.foursquareURL}`, {params})
      .pipe(
        map((res: any) => this._mapResponseToList(res.response))
      )
  }

  private _mapResponseToList(response) {
    const {items} = response.groups[0];
    const mapToList = items.map((hotel) => {
      const {venue} = hotel;
      return {
        id: venue.id,
        name: venue.name,
        location: {
          address: venue.location.address || 'empty',
          distance: venue.location.distance,
          latitude: venue.location.lat,
          longitude: venue.location.lng,
          state: venue.location.state || 'empty',
        },
        photos: venue.photos.groups[0] || '/assets/images/no-photo.jpeg',
        icon: '/assets//images/home.svg',
      } as IHotel;
    });
    return mapToList;
  }
}
