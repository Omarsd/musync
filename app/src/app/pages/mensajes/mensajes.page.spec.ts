import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensajesPage } from './mensajes.page';

describe('MensajesPage', () => {
  let component: MensajesPage;
  let fixture: ComponentFixture<MensajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
