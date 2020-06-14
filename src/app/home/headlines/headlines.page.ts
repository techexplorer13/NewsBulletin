import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.page.html',
  styleUrls: ['./headlines.page.scss'],
})
export class HeadlinesPage implements OnInit {
  headlines:any={
    "value":[
      {
      "_type":"NewsArticle",
      "name":"Everton morning headlines as £35m midfielder claim made",
      "url":"https://www.msn.com/en-gb/news/newsliverpool/everton-morning-headlines-as-%C2%A335m-midfielder-claim-made/ar-BB15nYYl",
      "description":"Here are the Everton morning headlines for Friday, June 12. Everton are reportedly one of three Premier League clubs interested in signing Southampton midfielder Pierre-Emile Hojbjerg.  According to talkSPORT,",
      "image":{
        "thumbnail":{
          "contentUrl":"https://www.bing.com/th?id=ON.C4962F63B0174F3E8D18555B525967AE&pid=News"
        }
      }
      },
      {
        "_type":"NewsArticle",
        "name":"Everton morning headlines as £35m midfielder claim made",
        "url":"https://www.msn.com/en-gb/news/newsliverpool/everton-morning-headlines-as-%C2%A335m-midfielder-claim-made/ar-BB15nYYl",
        "description":"Here are the Everton morning headlines for Friday, June 12. Everton are reportedly one of three Premier League clubs interested in signing Southampton midfielder Pierre-Emile Hojbjerg.  According to talkSPORT,",
        "image":{
          "thumbnail":{
            "contentUrl":"https://www.bing.com/th?id=ON.C4962F63B0174F3E8D18555B525967AE&pid=News"
          }
        }
        }
     
      ]
  }
  constructor(private apiService:ApiService) { }

  ngOnInit() {
   /**  this.apiService.getHeadlines().subscribe(res=>{
      console.log(res)
      this.headlines=res;
    })*/
  }

}
