import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BodyProyectsMultiselect } from '../../models/proyects.model';
import { BodyJudgesMultiselect } from '../../models/judge.model';
import { forkJoin } from 'rxjs';
import { ProyectsService } from '../../services/proyects.service';
import { JudgesService } from '../../services/judges.service';
import { UtilsService } from '../../utils/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-judges-proyects',
  templateUrl: './judges-proyects.component.html',
  styleUrls: ['./judges-proyects.component.scss']
})
export class JudgesProyectsComponent implements OnInit {

  settingsJueges: IDropdownSettings;
  settingsProyects: IDropdownSettings;
  judges: BodyJudgesMultiselect[];
  proyectsSelected = [];
  proyects: BodyProyectsMultiselect[];
  formJudgeProyects: FormGroup;
  constructor(
    private proyectsService: ProyectsService,
    private judgesService: JudgesService,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder
  ) {
    this.formJudgeProyects = this.formBuilder.group({
      id_jueces: ['', Validators.required],
      ids_proyectos: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.utilsService.loading = true;
    forkJoin({
      proyectsMultiselect: this.proyectsService.getAllProyectsMultiselect(),
      judgesSelect: this.judgesService.getAllJudgesSelect()
    }).subscribe(data => {
      if (!data.judgesSelect.error && !data.proyectsMultiselect.error) {
        this.judges = data.judgesSelect.body;
        this.proyects = data.proyectsMultiselect.body;
      }
    }, err => console.log(err)).add(() => this.utilsService.loading = false);

    this.settingsProyects = {
      singleSelection: false,
      idField: 'id_proyectos',
      textField: 'nombre_propuesta',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }
  asignProyects() {
    console.log(this.formJudgeProyects.value);
    this.judgesService.asignProyectsAtJudge(this.formJudgeProyects.value)
      .subscribe(data => {
        console.log(data);
        if (!data.error) {
          Swal.fire({
            title: 'Exito',
            icon: 'success',
            text: 'Se asignaron los proyectos correctamente'
          });
          this.formJudgeProyects.reset();
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Ocurrio un error al asignar'
          });
        }
      }, err => console.log(err)).add(() => this.utilsService.loading = false);
  }
}
