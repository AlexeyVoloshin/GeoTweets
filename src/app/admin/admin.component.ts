import {Component, EventEmitter, NgZone, OnInit} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {FormControl} from '@angular/forms';
import {TweetService} from '../services/tweet.service';
import { Tweet} from '../model/tweet';
import {Geo} from '../model/geo';

// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  radius: number = 5000;

  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked(event) {
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true,
      radius: this.radius,
      circleDraggable: false,
    });
  }

  markerDragEnd(m: marker, event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;

    this.markers = this.markers.filter(item => item !== m);

    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true,
      radius: this.radius,
      circleDraggable: false
    });
    console.log('dragEnd', m, event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      radius: 5000,
      label: 'A',
      draggable: true,
      circleDraggable: false
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      radius: 5000,
      label: 'B',
      draggable: true,
      circleDraggable: false
    },
  ];

  radiusChange(event) {
    this.radius = event;

    console.log('RadiusX', event);
  }

  centerChange(m: marker, $event) {

    console.log('eventCenterChange', $event);
  }

  onSubmit(lat: string, lng: string, rad: string, search?: string) {
    lat = lat.trim();
    lng = lng.trim();
    rad = rad.trim();
    search = search.trim();
    console.log('object', {lat, lng, rad, search})
    this.tweetService.sendGeo({lat, lng, rad, search});
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  radius: number;
  label?: string;
  draggable: boolean;
  circleDraggable: boolean;
}
