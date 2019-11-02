import { Component, OnInit } from '@angular/core';
import { Tweet } from '../model/tweet';
import {TweetService} from '../services/tweet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tweets: Tweet[];
  constructor(private tweetService: TweetService) { }
  getTweets(): void {
    this.tweetService.getTweet()
      .subscribe(data => {
        this.tweets = data.slice(1, 10);
        return this.tweets;
      });
  }
  ngOnInit() {
   this.getTweets();
  }


}
