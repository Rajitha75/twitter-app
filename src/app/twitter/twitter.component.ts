import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  twitterData:any;
  constructor(private twitterservice : TwitterService) { }

  ngOnInit() {
    console.log('ss')
    this.twitterservice.gettweets().subscribe(data => {
      this.twitterData = data;
      console.log(this.twitterData)
    })
  }

  searchhashtagtweets(searchtweets){
    this.twitterservice.gethashtagsearchtweets(searchtweets).subscribe(data => {
      this.twitterData = data;
      console.log(this.twitterData)
    })
  }

  searchlocationtweets(searchtweets){
    this.twitterservice.getlocationsearchtweets(searchtweets).subscribe(data => {
      this.twitterData = data;
      console.log(this.twitterData)
    })
  }

}
