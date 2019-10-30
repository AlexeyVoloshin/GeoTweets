import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Tweet } from '../model/tweet';
import {ApiService} from '../api.service';

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
}
