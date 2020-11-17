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

  constructor(private router: Router,public _utilService: UtilsService) { }

  ngOnInit(): void {
    if (localStorage.getItem('session-data')) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
