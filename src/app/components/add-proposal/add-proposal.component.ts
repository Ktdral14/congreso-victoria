
import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/user.model';
import { ProposalService } from '../../services/proposal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.scss']
})


export class AddProposalComponent implements OnInit {


  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Guardar',
          class: 'btn btn-primary',
          event: () => {
            this.registerProposal();
          }
        },

      ]
    }
  };

  formPropuesta: FormGroup;
  userData: UserData;
  palabrasEscritas = [];
  cantidadPalabras = 0;
  cantidadLimite = false;
  constructor(
    private ngWizardService: NgWizardService,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService
  ) {
    this.userData = JSON.parse(localStorage.getItem('session-data'));
    this.formPropuesta = formBuilder.group({
        id_categorias:  ['1'],
        id_usuarios:    [this.userData.id_usuarios],
        introduccion:   ['', [Validators.required]],
        objetivos:      ['', [Validators.required]],
        importancia:    ['', [Validators.required]],
        alineacion:     ['', [Validators.required]],
        descripcion:    ['', [Validators.required]],
        marco:          ['', [Validators.required]],
        etapas:         ['', [Validators.required]],
        experiencia:    ['', [Validators.required]],
        tipificacion:   ['', [Validators.required]],
        identificacion: ['', [Validators.required]],
        impacto:        ['', [Validators.required]],
        factibilidad:   ['', [Validators.required]],
        resultados:     ['', [Validators.required]],
        url:            ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  registerProposal() {
    console.log(this.formPropuesta.value);
    if (this.formPropuesta.valid && !this.cantidadLimite) {
      this.proposalService.registerProposal(this.formPropuesta.value)
      .subscribe( data => {
        console.log(data);
        if (!data.error) {
          Swal.fire({
            title: 'Su propuesta se registro correctamente',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Ocurrio un error al registrar la propuesta',
            icon: 'error',
          });
        }
      }, err => console.log(err));
    } else {
      Swal.fire({
        title: 'Advertencia',
        icon: 'info',
        text: 'Favor de completar todos los campos o verificar el limite de palabras'
      });
    }
  }

  contadorPalabras(ev: any) {
    let texto = this.formPropuesta.value.introduccion
                + ' '
                + this.formPropuesta.value.objetivos
                + ' '
                + this.formPropuesta.value.importancia
                + ' '
                + this.formPropuesta.value.alineacion
                + ' '
                + this.formPropuesta.value.descripcion
                + ' '
                + this.formPropuesta.value.marco
                + ' '
                + this.formPropuesta.value.etapas
                + ' '
                + this.formPropuesta.value.experiencia
                + ' '
                + this.formPropuesta.value.tipificacion
                + ' '
                + this.formPropuesta.value.identificacion
                + ' '
                + this.formPropuesta.value.impacto
                + ' '
                + this.formPropuesta.value.factibilidad
                + ' '
                + this.formPropuesta.value.resultados;

    texto = texto.trim();
    texto = texto.replace(/^ /, '');
    texto = texto.replace(/ $/, '');
    texto = texto.replace(/[ ]+/g, ' ');
    const listaTemp = texto.split(' ');
    this.palabrasEscritas = listaTemp;
    this.cantidadPalabras = this.palabrasEscritas.length;
    if (this.cantidadPalabras > 2000) {
      this.cantidadLimite = true;
    } else {
      this.cantidadLimite = false;
    }
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }


  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

}



