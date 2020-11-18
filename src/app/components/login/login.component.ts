import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { UtilsService } from '../../utils/utils.service';


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
    private loginService: LoginService,
    private _utilService:UtilsService
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
    this._utilService.loading = true;
    this.loginService.signIn(this.formSignIn.value)
      .subscribe( data => {
        console.log(data);
        if (!data.error) {
          localStorage.setItem('session-data', JSON.stringify(data.body));
          this.router.navigateByUrl('/home');
          this._utilService.loading = false;
        } else {
          Swal.fire({
            title: 'Ocurrio un error',
            text: 'Ocurrio un error al iniciar sesión, la contraseña o el correo son incorrectos',
            icon: 'error'
          });
          this._utilService.loading = false;
        }
      }, err => {
        console.log(err);
        this._utilService.loading = false;
      });
  }

}
