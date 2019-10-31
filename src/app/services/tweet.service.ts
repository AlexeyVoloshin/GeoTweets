import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Tweet } from '../model/tweet';
import {ApiService} from '../api.service';
import {map} from "rxjs/operators";
import { Observable } from "rxjs";
import {Geo} from '../model/geo';

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

 async sendGeo(geo: Geo ): Promise<void> {
    await this._http.post(`${this.userUrl}/admin/geo`, geo).subscribe();
    await this.saveTweets(geo);
  }
 async saveTweets(geo: Geo): Promise<void> {
    await this._http.post(`${this.userUrl}/admin/save`, geo).subscribe();
  }
}
