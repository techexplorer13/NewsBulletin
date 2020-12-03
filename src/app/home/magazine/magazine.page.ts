import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { BookInfoModalComponent } from './book-info-modal/book-info-modal.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { switchMap, switchMapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.page.html',
  styleUrls: ['./magazine.page.scss'],
})
export class MagazinePage implements OnInit {

  searchField: FormControl;
  searchForm: FormGroup;
  bookList: any;

  
  constructor(private http: HttpClient, private api: ApiService,
    private modalCtrl: ModalController, private fb: FormBuilder) {

    this.searchField = new FormControl();
    this.searchForm = fb.group({ search: this.searchField });
    /**
     * here we are using switchMap ,what switchMap does is
     * it check for the change in value of searchField once change it will call the getbooks
     * api which return us observable and we subscribe to it
     * 
     */
    this.searchField.valueChanges.pipe(switchMap((value: string) => {
      if (value.length > 2) { return this.api.getBooks(value); }
      else{
        return new Observable;
      }
    }))
      .subscribe(resultOfBooks => {
        this.bookList = resultOfBooks;
      })
  }

  ngOnInit() {
    this.api.getBooks("Fiction").subscribe(res=>{
      this.bookList=res
    })
  }

  openBookInfoModal(i) {
    this.modalCtrl.create({
      component: BookInfoModalComponent,
      componentProps: { bookInfo: this.bookList.items[i] }
    }).then(modalel =>
      modalel.present())
  }

}
