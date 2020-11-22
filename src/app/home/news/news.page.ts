import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { TestService } from '../service/testService';
import { LoadingController } from '@ionic/angular';
import {ModalController} from  '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private categories: string[]
  private information: any[] = [];

  automaticClose = false;
  constructor(private apiService: ApiService, private loadingCtrl: LoadingController,
    private testService:TestService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.categories = ["Finance", "Science","Sports"];

    this.loadingCtrl.create({ spinner: "bubbles", message: "loading.." }).then(loadingel => {
      loadingel.present();
      this.categories.forEach((cat) => this.fetchNewsByCategories(cat));
      //this.fetchNewsByCategories(this.categories[0])
      setTimeout(() => {
        loadingel.dismiss()
        console.log(this.information)
      }, 1200)
    })

  }

  fetchNewsByCategories(cat) {

  /**    this.testService.getNewsTest().subscribe(res=>{
      res.information[0].open=true;
      this.information.push(res.information[0])
      res.information[0].open=false;
      this.information.push(res.information[1])
      res.information[0].open=false;
      this.information.push(res.information[2])
    })*/
   this.apiService.getNews(cat).subscribe(res => {
      console.log(res)
      res.cat = cat;
      this.information.push(res);
    })

  }

  toggleSection(index) {
    this.information[index].open = !this.information[index].open
    this.information.filter((item,itemIndex)=> itemIndex!=index).map(item=>item.open=false)
  }
}
