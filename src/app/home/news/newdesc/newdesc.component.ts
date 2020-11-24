import { Component, OnInit,Input } from '@angular/core';
import {ModalController} from '@ionic/angular'

@Component({
  selector: 'app-newdesc',
  templateUrl: './newdesc.component.html',
  styleUrls: ['./newdesc.component.scss'],
})
export class NewdescComponent implements OnInit {

  @Input() newdesc:any
  constructor(private modalcntrl:ModalController) { }

  ngOnInit() {}

  cancelModal(){
    this.modalcntrl.dismiss()
  }

  openLink(url:string){
    window.location.href=url
  }

}
