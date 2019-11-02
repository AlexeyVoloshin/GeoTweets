import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Tweet} from '../model/tweet';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {Geo} from '../model/geo';


@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private userUrl = environment.apiUrl;
  tweets: Tweet[];
  constructor(private _http: ApiService) { }

  getTweet(): Observable<Tweet[]> {
    return  this._http.get(`${this.userUrl}/admin/tweets`, this.tweets);
  }
  async sendTweets(tweet: Tweet ): Promise<void> {
    await this._http.post(`${this.userUrl}/admin/tweets`, tweet).subscribe();
  }
 async sendGeo(geo: Geo ): Promise<void> {
    await this._http.post(`${this.userUrl}/admin/geo`, geo).subscribe();
  }

  async getTweets(geo: Geo): Promise<Tweet> {
    return new Promise((resolve, reject ) => {
     this._http.post(`${this.userUrl}/admin/save`, geo).subscribe((tweet) => {
       resolve(tweet);
    });
  });
}
}
