import { Component } from '@angular/core';
import { TwitterService } from './services/twitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  twitterData:any;
  status = '';
  title = 'twitter-app';
  gettweetdata = false;
  constructor(private twitterservice : TwitterService, private router: Router) { }

  loginviatwitter(){
    this.gettweetdata = false;
    // this.twitterservice.twitterlogin().subscribe(data => {
    //   console.log(data);
    // })
    window.location.href = 'http://127.0.0.1:3000/auth/twitter';
  }

  gettweets(){
    this.gettweetdata = false;
    this.status = 'Saved tweets in DB';
    this.twitterservice.gettweets().subscribe(data => {
      console.log(data)
      
    })
  }

  gettweetshavingurl(){
    this.gettweetdata = true;
    this.twitterservice.gettweetshavingurl().subscribe(data => {
      this.twitterData = data;
      console.log(data)
      
    }) 
  }

  searchtweets(){
    this.gettweetdata = false;
    this.router.navigate(['/twitter/gettweets']);
  }
}
