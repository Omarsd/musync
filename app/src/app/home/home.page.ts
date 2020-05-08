import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Anuncio} from '../model/Anuncio';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private anuncios: Observable<Anuncio[]>;
  constructor(private fbService: FirebaseService) {}

  ngOnInit(): void {
    this.anuncios = this.fbService.getAllAnuncio();
  }

}
