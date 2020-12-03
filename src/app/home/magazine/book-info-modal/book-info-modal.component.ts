import { Component, Input, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'

@Component({
  selector: 'app-book-info-modal',
  templateUrl: './book-info-modal.component.html',
  styleUrls: ['./book-info-modal.component.scss'],
})
export class BookInfoModalComponent implements OnInit {

  @Input() bookInfo:any
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancelModal(){
    this.modalCtrl.dismiss();
  }
}
