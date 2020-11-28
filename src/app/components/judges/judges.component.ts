import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AddJudgeService } from '../../services/add-judge.service';
import Swal from 'sweetalert2';
import { JudgeRegistredService } from '../../services/judge-registred.service';
import { JudgeSelectAllBody } from '../../models/judge.model';
import { forkJoin } from 'rxjs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-judges',
  templateUrl: './judges.component.html',
  styleUrls: ['./judges.component.scss']
})
export class JudgesComponent implements OnInit {

  @ViewChild('swalid') private swalEdit: SwalComponent;
  formAddJudge: FormGroup;
  formEditJudge: FormGroup;
  judgesRegistred: JudgeSelectAllBody[];
  actualJudge: JudgeSelectAllBody;
  constructor(
    private formBuilder: FormBuilder,
    private addJudgeService: AddJudgeService,
    private judgeRegistredService: JudgeRegistredService,
    private utilService: UtilsService
  ) {
    this.formAddJudge = this.formBuilder.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
    this.formEditJudge = this.formBuilder.group({
      id_jueces: [''],
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.utilService._loading = true;
    forkJoin({
      judgesRegistred: this.judgeRegistredService.selectAllJudgesRegistred(),
    }).subscribe( data => {
      this.judgesRegistred = data.judgesRegistred.body;
    }).add(() => this.utilService._loading = false);
  }

  registerJudge() {
    this.utilService._loading = true;
    this.addJudgeService.registerJudge(this.formAddJudge.value)
      .subscribe( data => {
        console.log(data);
        if (!data.error) {
          Swal.fire({
            title: 'Se registro el juez correctamente',
            icon: 'success'
          }).then(() => {
            this.formAddJudge.reset();
            this.ngOnInit();
          });
        } else {
          Swal.fire({
            title: 'Ocurrio un error al registrar el juez',
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  openSwalEdit(judge: JudgeSelectAllBody) {
    this.actualJudge = judge;
    this.swalEdit.fire();
    this.formEditJudge.patchValue({
      id_jueces: this.actualJudge.id_jueces,
      usuario: this.actualJudge.usuario,
      nombre: this.actualJudge.nombre,
    });
  }
  editJudge() {
    this.utilService._loading = true;
    this.judgeRegistredService.editJudgesRegistred(this.formEditJudge.value)
      .subscribe( data => {
        console.log(data);
        if (!data.error) {
          Swal.fire({
            title: 'Se edito el juez correctamente',
            icon: 'success'
          });
          this.ngOnInit();
        } else {
          Swal.fire({
            title: 'Ocurrio un error al editar el juez',
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }

}
