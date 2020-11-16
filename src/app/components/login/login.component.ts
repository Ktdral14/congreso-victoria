import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formSignIn: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.formSignIn = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  recovery() {
    this.router.navigateByUrl('/recovery');
  }

  login() {
    this.loginService.signIn(this.formSignIn.value)
      .subscribe( data => {
        console.log(data);
        if (!data.error) {
          localStorage.setItem('session-data', JSON.stringify(data.body));
          this.router.navigateByUrl('/home');
        } else {
          Swal.fire({
            title: 'Ocurrio un error',
            text: 'Ocurrio un error al iniciar sesión',
            icon: 'error'
          });
        }
      }, err => console.log(err));
    this.router.navigateByUrl('/home');
  }

}
