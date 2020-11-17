import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { CodigoPostalService } from '../../services/codigo-postal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilsService } from '../../utils/utils.service'



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  validCP = false;
  colonia = [];
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private cpService: CodigoPostalService,
    private router: Router,
    private _utilService:UtilsService
  ) {
    this.formRegister = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    a_paterno: ['', [Validators.required]],
    a_materno: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    fecha_nacimiento: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    colonia: ['', [Validators.required]],
    calle: ['', [Validators.required]],
    num_int: [''],
    num_ext: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  registerUser() {
    this._utilService.loading = true;
    this.registerService.registerUser(this.formRegister.value)
      .subscribe( data => {
        console.log(data);
        if (!data.error) {
          Swal.fire({
            title: 'Se registro con exito',
            text: 'Favor de revisar tu correo para confirmarlo',
            icon: 'success'
          }).then ( () => this.router.navigateByUrl('/'));
          this._utilService.loading = false;
        } else {
          Swal.fire({
            title: 'Ocurrio un error al registrar',
            icon: 'error'
          });
          console.log(data.error);
          this._utilService.loading = false;
        }
      }, err => console.log(err)).add(() => this._utilService.loading = false );

  }

  cambioCP(ev: any) {
    console.log(ev.target.value);
    this.cpService.consultCP(ev.target.value)
      .subscribe( data => {
        console.log(data);
        const estado = data[0].response.estado.toString();
        const ciudad = data[0].response.ciudad.toString();
        this.formRegister.patchValue({
          estado,
          ciudad,
        });
        this.validCP = true;
      }, err => {
        console.log(err);
        this.validCP = false;
      });
  }

}
