import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-applicants',
  templateUrl: './add-applicants.component.html',
  styleUrls: ['./add-applicants.component.scss']
})
export class AddApplicantsComponent implements OnInit {
   
  formAspirante: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formAspirante = this.formBuilder.group({
     nombre_propuesta: ['', [Validators.required, Validators.maxLength(30)]],
     p_aspirante: ['', Validators.required],
     s_aspirante: [''],
     t_aspirante: [''],
     carta: ['', Validators.required],
     c_postulacion: ['', Validators.required],
     alineacion: ['', Validators.required],
     propuesta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
