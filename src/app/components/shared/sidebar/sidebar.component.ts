import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAJudge = false;
  isAAdmin = false;
  constructor( ) { }

  public toggleClass: boolean = false;


  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('session-data'));
    if (userData.rol === 'admin') {
      this.isAAdmin = true;
      this.isAJudge = false;
    } else if (userData.rol === 'juez') {
      this.isAAdmin = false;
      this.isAJudge = true;
    } else {
      this.isAAdmin = false;
      this.isAJudge = false;
    }
  }

  toggle() {
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
