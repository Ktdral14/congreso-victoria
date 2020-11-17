import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ApplicantsService } from '../../services/applicants.service';
import swal from 'sweetalert2';
import { UserData } from 'src/app/models/user.model';
import { UtilsService } from '../../utils/utils.service'


@Component({
  selector: 'app-add-applicants',
  templateUrl: './add-applicants.component.html',
  styleUrls: ['./add-applicants.component.scss']
})
export class AddApplicantsComponent implements OnInit {

  formAspirante: FormGroup;
  @ViewChild("carta", {
    read: ElementRef
  }) carta: ElementRef;

  @ViewChild("c_postulacion", {
    read: ElementRef
  }) c_postulacion: ElementRef;

  @ViewChild("justificacion", {
    read: ElementRef
  }) justificacion: ElementRef;

  @ViewChild("estructura", {
    read: ElementRef
  }) estructura: ElementRef;

  userData: UserData;
  registroTerminado = false;
  constructor(
    private formBuilder: FormBuilder,
    private applicants: ApplicantsService,
    private cd: ChangeDetectorRef,
    private _utilService:UtilsService
  ) {
    this.userData = JSON.parse(localStorage.getItem('session-data'));
    const propuestaData = JSON.parse(localStorage.getItem('registro-' + this.userData.id_usuarios));
    if (!propuestaData) {
      localStorage.setItem('registro-' + this.userData.id_usuarios, JSON.stringify({termino: false}));
    }
    this.registroTerminado = JSON.parse(localStorage.getItem('registro-' + this.userData.id_usuarios)).termino;
    this.formAspirante = this.formBuilder.group({
     nombre_propuesta: ['', [Validators.required, Validators.maxLength(30)]],
     p_aspirante: ['', Validators.required],
     s_aspirante: [''],
     t_aspirante: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(files: FileList) {
    this._utilService.loading = true;
    let archivo = this.carta.nativeElement.files[0];
    let archivo2 = this.c_postulacion.nativeElement.files[0];
    let archivo3 = this.justificacion.nativeElement.files[0];
    let archivo4 = this.estructura.nativeElement.files[0];

    let id = JSON.parse(localStorage.getItem('session-data'));
    let valores: any = new FormData();
    // let headers = new Headers();
    // headers.append('Content-Type','multipart/form-data');
    valores.append("id_usuarios", id.id_usuarios);
    console.log(id.id_usuarios+ 'usuario');
    valores.append("nombre_propuesta", this.formAspirante.value.nombre_propuesta);
    valores.append("p_aspirante", this.formAspirante.value.p_aspirante);
    valores.append("s_aspirante", this.formAspirante.value.s_aspirante);
    valores.append("t_aspirante", this.formAspirante.value.t_aspirante);
    valores.append("carta", archivo);
    valores.append("c_postulacion", archivo2);
    valores.append("alineacion", archivo3);
    valores.append("propuesta", archivo4);

    this.applicants.registroPropuesta(valores).subscribe(
      data => {
        swal.fire({
          icon: 'success',
          title: 'Registro exitoso'
        }).then(() => {
          localStorage.setItem('registro-' + this.userData.id_usuarios, JSON.stringify({termino: true}));
          this.registroTerminado = JSON.parse(localStorage.getItem('termino-' + this.userData.id_usuarios)).termino;
          window.location.reload();
        });
        console.log(data);
        this._utilService.loading = false;
      },
      err => {
        swal.fire({
          icon: 'warning',
          title: 'Ha ocurrido un error al registrar',
          text: 'Favor de revisar que todos los campos se encuentren llenos y el peso de los archivos sea el'
        });
        console.log(err);
        this._utilService.loading = false;
      }
    );
  }



}
