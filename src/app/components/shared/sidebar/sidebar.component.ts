import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  public toggleClass: boolean = false;


  ngOnInit(): void {
  }

  toggle(){
    if (!this.toggleClass) {
      this.toggleClass = true;
    } else {
      this.toggleClass = false;
    }
  }

  cerrar() {
    localStorage.removeItem('registro-' + JSON.parse(localStorage.getItem('session-data')).id_usuarios);
    localStorage.removeItem('termino-' + JSON.parse(localStorage.getItem('session-data')).id_usuarios);
    localStorage.removeItem('session-data');
    localStorage.removeItem('aspirantes');
    window.location.reload();
  }

}
