import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-recuperacion',
  templateUrl: './pagina-recuperacion.component.html',
  styleUrls: ['./pagina-recuperacion.component.scss']
})
export class PaginaRecuperacionComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log(this.route.snapshot.paramMap.get('tk'));
  }

  ngOnInit(): void {
  }

}
