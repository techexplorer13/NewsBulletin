import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewdescComponent } from './newdesc.component';

describe('NewdescComponent', () => {
  let component: NewdescComponent;
  let fixture: ComponentFixture<NewdescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdescComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewdescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
