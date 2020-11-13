
import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/user.model';


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
          text: 'Guardar', class: 'btn btn-primary', event: () => {
            alert('Se registró correctamente!!!');
          }
        },

      ]
    }
  };

  formPropuesta: FormGroup;
  userData: UserData;
  constructor(private ngWizardService: NgWizardService, private fb: FormBuilder) {
    this.userData = JSON.parse(localStorage.getItem('session-data'));
    this.formPropuesta = fb.group({
        id_categorias: ['1'],
        id_usuario: [this.userData.id_usuarios],
        introduccion : ['', [Validators.required]],
        objetivos : ['', [Validators.required]],
        importancia : ['', [Validators.required]],
        alineacion : ['', [Validators.required]],
        descripcion : ['', [Validators.required]],
        marco : ['', [Validators.required]],
        etapas : ['', [Validators.required]],
        experiencia : ['', [Validators.required]],
        tipificacion : ['', [Validators.required]],
        impacto : ['', [Validators.required]],
        factibilidad : ['', [Validators.required]],
        resultados : ['', [Validators.required]],
        url : ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
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



