import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Tweet } from '../model/tweet';
import {ApiService} from '../api.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Geo} from "../model/geo";

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private userUrl = environment.apiUrl;
  tweets: Array<Tweet> = [];
  constructor(private _http: ApiService) { }

  getTweets() {
    return this._http.get(`${this.userUrl}/admin/tweets`, this.tweets);
  }

  sendGeo(geo: Geo) {
    debugger
    this._http.post(`${this.userUrl}/admin/geo`, geo);
  }
}
