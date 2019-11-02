import {Component, OnInit} from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Tweet } from '../model/tweet';
import { Geo } from '../model/geo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private tweetService: TweetService) {}
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  radius: number = 5000;
  search: string;
  tweets: Tweet;

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      radius: 5000,
      label: 'A',
      draggable: true,
      circleDraggable: false
    },
  ];

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

  radiusChange(event) {
    this.radius = event;

    console.log('RadiusX', event);
  }

  centerChange(m: marker, $event) {

    console.log('eventCenterChange', $event);
  }

 async onSave(lat: string, lng: string, rad: string, search?: string): Promise<void> {
    lat = lat.trim();
    lng = lng.trim();
    rad = rad.trim();
    search = search.trim();
    console.log('object', {lat, lng, rad, search});
    await this.tweetService.sendGeo({lat, lng, rad, search} as Geo);
    await this.tweetService.sendTweets(this.tweets as Tweet);
  }

  onClear() {
    console.log('clear', this.tweets);
    this.tweets = null;

  }

 async onScan(lat: string, lng: string, rad: string, search?: string): Promise<Tweet> {
    lat = lat.trim();
    lng = lng.trim();
    rad = rad.trim();
    search = search.trim();
    if (!lat) { return; }
    console.log('object', {lat, lng, rad, search});
    await this.tweetService.getTweets({lat, lng, rad, search} as Geo).then(data => {
      console.log(data);
      this.tweets = data;
      });
    return this.tweets;
    }
}
// just an interface for type safety.
// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  radius: number;
  label?: string;
  draggable: boolean;
  circleDraggable: boolean;
}
