import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular'

@Component({
  selector: 'app-headlinesdesc',
  templateUrl: './headlinesdesc.component.html',
  styleUrls: ['./headlinesdesc.component.scss'],
})
export class HeadlinesdescComponent implements OnInit {
  @Input() headlinesdesc:any

  constructor(private modalcntrl:ModalController) { }

  ngOnInit() {
  
  }

  cancelModal(){
    this.modalcntrl.dismiss()
  }

}
