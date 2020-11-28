import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core'
import { NewdescComponent } from '../news/newdesc/newdesc.component';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.page.html',
  styleUrls: ['./headlines.page.scss'],
})
export class HeadlinesPage implements OnInit {
  headlines: any;
  offset = 0;
  maximumOffset=60; // this is maximum offset till when the query will be fired

  constructor(private apiService: ApiService, private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadingCtrl.create({ spinner: "bubbles", message: "loading.." }).then(loadingel => {
      loadingel.present();
      this.fetchHeadLines(this.offset, loadingel, null)
      setTimeout(() => {
        loadingel.dismiss()
      }, 1200);
    })

  }

  openHeadlinesDescModal(index: any) {
    this.modalCtrl.create({
      component: NewdescComponent,
      componentProps: { newdesc: this.headlines[index] }
    })
      .then(modalel =>
        modalel.present())
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail)
    this.loadingCtrl.create({ spinner: "bubbles", message: "loading.." }).then(loadingel => {
      loadingel.present();
      this.fetchHeadLines(this.offset, loadingel, null)
      setTimeout(() => {
        loadingel.dismiss()
      }, 1200);
    })

  }

  fetchHeadLines(offset, loadingel: HTMLIonLoadingElement, event) {
    console.log(offset)
    this.apiService.getHeadlines(offset).subscribe(res => {
      console.log(res)
      if (this.headlines) {
        this.headlines=this.headlines.concat(res.value)
      } else {
        this.headlines = res.value;
      }
      this.offset = this.offset + 20
      if (loadingel) {
        loadingel.dismiss();
      }
      if (event) {
        event.target.complete();
      }
    })
  }

  loadNews(event) {
    this.fetchHeadLines(this.offset, null,event)
    if(this.offset===this.maximumOffset){
      event.target.disabled=true;
    }
  }
}
