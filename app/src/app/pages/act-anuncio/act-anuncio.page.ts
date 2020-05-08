import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Anuncio } from 'src/app/model/Anuncio';

@Component({
  selector: 'app-act-anuncio',
  templateUrl: './act-anuncio.page.html',
  styleUrls: ['./act-anuncio.page.scss'],
})
export class ActAnuncioPage implements OnInit {

  anuncio: Anuncio = {
    id: '',
    titulo: '',
    descripcion: '',
    createdAt: ''
  };

  constructor(private activatedRoute: ActivatedRoute, 
    private fbService: FirebaseService, 
    private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getAnuncio(id).subscribe(data => {
        this.anuncio = data;
      });
    }
  }

  updateAnuncio() {
    this.fbService.updateAnuncio(this.anuncio).then(() => {
     this.router.navigate(['/']);
    }, err => {
    });
  }

}
