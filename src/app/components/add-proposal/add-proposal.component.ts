
import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';


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
            alert("Se registró correctamente!!!");
          }
        },
        
      ]
    }
  }



  constructor(private ngWizardService: NgWizardService) { }

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



