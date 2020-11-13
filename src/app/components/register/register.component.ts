import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { CodigoPostalService } from '../../services/codigo-postal.service';
import { CpInfo } from '../../models/cp.model';
import Swal from 'sweetalert2';

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
    private cpService: CodigoPostalService
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
    this.registerService.registerUser(this.formRegister.value)
      .subscribe( data => {
        if (!data.error) {
          Swal.fire({
            title: 'Se registro con exito',
            text: 'Favor de revisar tu correo para confirmarlo',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Ocurrio un error al registrar',
            icon: 'error'
          });
        }
      }, err => console.log(err));
  }

  cambioCP(ev: any) {
    console.log(ev.target.value);
    this.cpService.consultCP(ev.target.value)
      .subscribe( data => {
        console.log(data);
        this.formRegister.patchValue({
          estado: [data[0].response.estado],
          ciudad: [data[0].response.ciudad],
        });
        this.validCP = true;
      }, err => {
        console.log(err);
        this.validCP = false;
      });
  }

}
