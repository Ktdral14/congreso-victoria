import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-confirmar-cuenta',
  templateUrl: './pagina-confirmar-cuenta.component.html',
  styleUrls: ['./pagina-confirmar-cuenta.component.scss']
})
export class PaginaConfirmarCuentaComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log(this.route.snapshot.paramMap.get('tk'));
  }

  ngOnInit(): void {
  }

}
