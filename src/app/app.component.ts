import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './utils/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Premio estatal';

  constructor(private router: Router, public _utilService: UtilsService) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('session-data'));
    if (userData) {
      if (userData.rol === 'admin' || userData.rol === 'juez') {
        this.router.navigateByUrl('/home/init');
      } else {
        this.router.navigateByUrl('/home/add-applicants');
      }
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
