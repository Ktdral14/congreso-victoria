import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'congreso';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('session-data')) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
