import { Component, OnInit, ViewChild } from '@angular/core';
import { JudgesService } from '../../services/judges.service';
import { UserData } from '../../models/user.model';
import { forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalificarProyectoService } from '../../services/calificar-proyecto.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('swalidVid') private swalVideo: SwalComponent;

  public isCollapsed = true;

  userData: any;
  proyectos = [];
  proyectosCalificados = [];
  idJueces: any;
  proyectoActual: any;
  video = '';
  cal = false;
  formCalificaciones: FormGroup;
  innovador: number;
  elementos_tecnologicos: number;
  contribuye: number;
  aplica_teorias: number;
  promueve: number;
  indice: number;
  introduccion: number;
  objetivos1: number;
  objetivos2: number;
  objetivos3: number;
  importancia1: number;
  importancia2: number;
  descripcion: number;
  identificacion: number;
  marco1: number;
  marco2: number;
  etapas: number;
  experiencia: number;
  vinculacion: number;
  impacto1: number;
  impacto2: number;
  factibilidad1: number;
  factibilidad2: number;
  factibilidad3: number;
  evidencia: number;
  resultados1: number;
  resultados2: number;
  resultados3: number;
  resultados4: number;
  valores: any;
  validacionProjectos: string;
  terminoEvaluacion: any;
  constructor(
    private juecesServices: JudgesService,
    private calificarProyecto: CalificarProyectoService,
    private formBuilder: FormBuilder
  ) {
    this.userData = JSON.parse(localStorage.getItem('session-data'));
    this.innovador = 0;
    this.elementos_tecnologicos = 0;
    this.contribuye = 0;
    this.aplica_teorias = 0;
    this.promueve = 0;
    this.indice = 0;
    this.introduccion = 0;
    this.objetivos1 = 0;
    this.objetivos2 = 0;
    this.objetivos3 = 0;
    this.importancia1 = 0;
    this.importancia2 = 0;
    this.descripcion = 0;
    this.identificacion = 0;
    this.marco1 = 0;
    this.marco2 = 0;
    this.etapas = 0;
    this.experiencia = 0;
    this.vinculacion = 0;
    this.impacto1 = 0;
    this.impacto2 = 0;
    this.factibilidad1 = 0;
    this.factibilidad2 = 0;
    this.factibilidad3 = 0;
    this.evidencia = 0;
    this.resultados1 = 0;
    this.resultados2 = 0;
    this.resultados3 = 0;
    this.resultados4 = 0;
    this.generarForm();
    }

  ngOnInit(): void {
    this.idJueces = {
      'id_jueces': this.userData.id_jueces
    }
    console.log(this.userData.finished);
    console.log(this.userData.id_jueces);
    forkJoin({
      projectsJudges: this.juecesServices.getProjectsJudge(this.idJueces),
      proyectosCalificados: this.calificarProyecto.obtenerProyectosCalificados(),
      //validarProjectos: this.juecesServices.getValidacionProyectos(this.idJueces)
    }).subscribe(
      data => {
        console.log(data);
        this.proyectos = data.projectsJudges.body;
        this.proyectosCalificados = data.proyectosCalificados.body;
        console.log(this.proyectosCalificados);
      //this.validacionProjectos = data.validarProjectos.termino;
        //console.log(this.validacionProjectos);
      },
      err => console.log(err)
    );
  }

  abrirVideo(url: string) {
    console.log(url);
    this.video = url;
    this.swalVideo.fire().then(() => {
      window.open(this.video, '_blank');
    });
  }

  generarForm() {
    const Reg = RegExp('^[0-9]+$');
    this.formCalificaciones = this.formBuilder.group({
      innovador: [0, [Validators.required]],
      elementos_tecnologicos: [0, [Validators.required, Validators.max(25), Validators.min(0), Validators.pattern(Reg)]],
      contribuye: [0, [Validators.required, Validators.max(25), Validators.min(0), Validators.pattern(Reg)]],
      aplica_teorias: [0, [Validators.required, Validators.max(25), Validators.min(0), Validators.pattern(Reg)]],
      promueve: [0, [Validators.required, Validators.max(25), Validators.min(0), Validators.pattern(Reg)]],
      indice: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      introduccion: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      objetivos1: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      objetivos2: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      objetivos3: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      importancia1: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      importancia2: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      descripcion: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      identificacion: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      marco1: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      marco2: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      etapas: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      experiencia: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      vinculacion: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      impacto1: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      impacto2: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      factibilidad1: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      factibilidad2: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      factibilidad3: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      evidencia: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      resultados1: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      resultados2: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      resultados3: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
      resultados4: [0, [Validators.required, Validators.max(10), Validators.min(0), Validators.pattern(Reg)]],
    });
  }
  setProyectoActual(proyecto: any){
    this.proyectoActual = proyecto;
    this.calificarProyecto.getProyectoCalificado(this.proyectoActual.id_proyectos).subscribe(
      dara => {
        if (dara.body.calificado === 'Si') {
          this.calificarProyecto.getCalificaciones(this.proyectoActual.id_proyectos).subscribe(
            data => {
              this.formCalificaciones.patchValue({
                innovador: data.body.innovador,
                elementos_tecnologicos: Number(data.body.elementos_tecnologicos),
                contribuye: Number(data.body.contribuye),
                aplica_teorias: Number(data.body.aplica_teorias),
                promueve: Number(data.body.promueve),
                indice: Number(data.body.indice),
                introduccion: Number(data.body.introduccion),
                objetivos1: Number(data.body.objetivos1),
                objetivos2: Number(data.body.objetivos2),
                objetivos3: Number(data.body.objetivos3),
                importancia1: Number(data.body.importancia1),
                importancia2: Number(data.body.importancia2),
                descripcion: Number(data.body.descripcion),
                identificacion: Number(data.body.identificacion),
                marco1: Number(data.body.marco1),
                marco2: Number(data.body.marco2),
                etapas: Number(data.body.etapas),
                experiencia: Number(data.body.experiencia),
                vinculacion: Number(data.body.vinculacion),
                impacto1: Number(data.body.impacto1),
                impacto2: Number(data.body.impacto2),
                factibilidad1: Number(data.body.factibilidad1),
                factibilidad2: Number(data.body.factibilidad2),
                factibilidad3: Number(data.body.factibilidad3),
                evidencia: Number(data.body.evidencia),
                resultados1: Number(data.body.resultados1),
                resultados2: Number(data.body.resultados2),
                resultados3: Number(data.body.resultados3),
                resultados4: Number(data.body.resultados4),
              });
            },
            err => console.log(err)
          );
        } else {
          this.generarForm();
        }
      },
      err => console.log(err)
    );
  }

  guardarCalificaciones() {
    this.valores = this.formCalificaciones.value;
    this.calificarProyecto.getProyectoCalificado(this.proyectoActual.id_proyectos).subscribe(
      data => {
        if (data.body.calificado === 'No') {
          this.calificarProyecto.setCalifications(
            this.proyectoActual.id_proyectos,
            this.valores.innovador,
            this.valores.elementos_tecnologicos,
            this.valores.contribuye,
            this.valores.aplica_teorias,
            this.valores.promueve,
            this.valores.indice,
            this.valores.introduccion,
            this.valores.objetivos1,
            this.valores.objetivos2,
            this.valores.objetivos3,
            this.valores.importancia1,
            this.valores.importancia2,
            this.valores.descripcion,
            this.valores.identificacion,
            this.valores.marco1,
            this.valores.marco2,
            this.valores.etapas,
            this.valores.experiencia,
            this.valores.vinculacion,
            this.valores.impacto1,
            this.valores.impacto2,
            this.valores.factibilidad1,
            this.valores.factibilidad2,
            this.valores.factibilidad3,
            this.valores.evidencia,
            this.valores.resultados1,
            this.valores.resultados2,
            this.valores.resultados3,
            this.valores.resultados4
          ).subscribe(
            dara => {
              if (!dara.error) {
                Swal.fire({
                  title: 'Calificacion guardada',
                  icon: 'success'
                });
                this.generarForm();
              } else {
                Swal.fire({
                  title: 'Error al calificar',
                  icon: 'error'
                });
              }
            },
            err => {
              console.log(err);
            }
          );
        } else if (data.body.calificado === 'Si') {
          this.calificarProyecto.updateCalification(
            this.proyectoActual.id_proyectos,
            this.valores.innovador,
            this.valores.elementos_tecnologicos,
            this.valores.contribuye,
            this.valores.aplica_teorias,
            this.valores.promueve,
            this.valores.indice,
            this.valores.introduccion,
            this.valores.objetivos1,
            this.valores.objetivos2,
            this.valores.objetivos3,
            this.valores.importancia1,
            this.valores.importancia2,
            this.valores.descripcion,
            this.valores.identificacion,
            this.valores.marco1,
            this.valores.marco2,
            this.valores.etapas,
            this.valores.experiencia,
            this.valores.vinculacion,
            this.valores.impacto1,
            this.valores.impacto2,
            this.valores.factibilidad1,
            this.valores.factibilidad2,
            this.valores.factibilidad3,
            this.valores.evidencia,
            this.valores.resultados1,
            this.valores.resultados2,
            this.valores.resultados3,
            this.valores.resultados4
          ).subscribe(
            datos => {
              console.log(datos);
              if (!datos.error) {
                Swal.fire({
                  title: 'Calificacion actualizada',
                  icon: 'success'
                });
              } else{
                Swal.fire({
                  title: 'Error al actualizar la calificacion',
                  icon: 'error'
                });
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  calificado(proyecto: any) {
    
  }
  abrirPDFExt(pdf: string) {
    const ruta = pdf.split('uploads')[1];

    window.open('http://plataforma.cotacyt.gob.mx/api-premio-estatal-2020/uploads' + ruta, '_blank');
  }

  updateValidationProjects() {
    this.juecesServices.getValidarTermino(this.userData.id_jueces).subscribe(
      data => {
        if (data.body[0].termino === 'No') {
          swal.fire({
            title: 'No ha terminado de calificar',
            icon: 'error'
          });
        } else {
          this.juecesServices.updateEvaluation(this.userData.id_jueces).subscribe(
            dara => {
              swal.fire({
                title: 'Termino la evaluacion',
                icon: 'success'
              }).then(() => {
                localStorage.setItem('terminoEvaluacion', JSON.stringify({termino: true}));
                this.terminoEvaluacion = localStorage.getItem('terminoEvaluacion');
              });
              console.log(dara);
            },
            err =>  console.log(err)
          );
        }
      },
      err => {
        console.log(err);
      }
    );

    
  }

  descargarAcusePDF(proyecto: any) {
    // declaracion pdf
    const documentoPDF1 = new jsPDF('p', 'in', 'letter');

      // campos
    const campo1 = proyecto.introduccion;
    const campo2 = proyecto.objetivos;
    const campo3 = proyecto.importancia;
    const campo4 = proyecto.alineacion;
    const campo5 = proyecto.descripcion;
    const campo6 = proyecto.identificacion;
    const campo7 = proyecto.marco;
    const campo8 = proyecto.etapas;
    const campo9 = proyecto.experiencia;
    const campo10 = proyecto.tipificacion;
    const campo11 = proyecto.impacto;
    const campo12 = proyecto.factibilidad;
    const campo13 = proyecto.resultados;
    const campo14 = proyecto.url;
    const nomPropuesta = proyecto.nombre_propuesta;
    const primerAspirante = proyecto.p_aspirante;
    const segundoAspirante = proyecto.s_aspirante;
    const tercerAspirante = proyecto.t_aspirante;

    // campo 1
    const campo1Aux1 = campo1.substring(0, 115);
    const campo1Aux2 = campo1.substring(115, 230);
    const campo1Aux3 = campo1.substring(230, 340);
    const campo1Aux4 = campo1.substring(340, 460);
    const campo1Aux5 = campo1.substring(460, 575);
    const campo1Aux6 = campo1.substring(575, 690);
    const campo1Aux7 = campo1.substring(690, 805);
    const campo1Aux8 = campo1.substring(805, 920);
    const campo1Aux9 = campo1.substring(920, 1035);
    const campo1Aux10 = campo1.substring(1035, 1150);
    const campo1Aux11 = campo1.substring(1150, 1265);

    // campo 2
    const campo2Aux1 = campo2.substring(0, 115);
    const campo2Aux2 = campo2.substring(115, 230);
    const campo2Aux3 = campo2.substring(230, 340);
    const campo2Aux4 = campo2.substring(340, 460);
    const campo2Aux5 = campo2.substring(460, 575);
    const campo2Aux6 = campo2.substring(575, 690);
    const campo2Aux7 = campo2.substring(690, 805);
    const campo2Aux8 = campo2.substring(805, 920);
    const campo2Aux9 = campo2.substring(920, 1035);
    const campo2Aux10 = campo2.substring(1035, 1150);
    const campo2Aux11 = campo2.substring(1150, 1265);

    // campo 3
    const campo3Aux1 = campo3.substring(0, 115);
    const campo3Aux2 = campo3.substring(115, 230);
    const campo3Aux3 = campo3.substring(230, 340);
    const campo3Aux4 = campo3.substring(340, 460);
    const campo3Aux5 = campo3.substring(460, 575);
    const campo3Aux6 = campo3.substring(575, 690);
    const campo3Aux7 = campo3.substring(690, 805);
    const campo3Aux8 = campo3.substring(805, 920);
    const campo3Aux9 = campo3.substring(920, 1035);
    const campo3Aux10 = campo3.substring(1035, 1150);
    const campo3Aux11 = campo3.substring(1150, 1265);

    // campo 4
    const campo4Aux1 = campo4.substring(0, 115);
    const campo4Aux2 = campo4.substring(115, 230);
    const campo4Aux3 = campo4.substring(230, 340);
    const campo4Aux4 = campo4.substring(340, 460);
    const campo4Aux5 = campo4.substring(460, 575);
    const campo4Aux6 = campo4.substring(575, 690);
    const campo4Aux7 = campo4.substring(690, 805);
    const campo4Aux8 = campo4.substring(805, 920);
    const campo4Aux9 = campo4.substring(920, 1035);
    const campo4Aux10 = campo4.substring(1035, 1150);
    const campo4Aux11 = campo4.substring(1150, 1265);

    // campo 5
    const campo5Aux1 = campo5.substring(0, 115);
    const campo5Aux2 = campo5.substring(115, 230);
    const campo5Aux3 = campo5.substring(230, 340);
    const campo5Aux4 = campo5.substring(340, 460);
    const campo5Aux5 = campo5.substring(460, 575);
    const campo5Aux6 = campo5.substring(575, 690);
    const campo5Aux7 = campo5.substring(690, 805);
    const campo5Aux8 = campo5.substring(805, 920);
    const campo5Aux9 = campo5.substring(920, 1035);
    const campo5Aux10 = campo5.substring(1035, 1150);
    const campo5Aux11 = campo5.substring(1150, 1265);

    // campo 6
    const campo6Aux1 = campo6.substring(0, 115);
    const campo6Aux2 = campo6.substring(115, 230);
    const campo6Aux3 = campo6.substring(230, 340);
    const campo6Aux4 = campo6.substring(340, 460);
    const campo6Aux5 = campo6.substring(460, 575);
    const campo6Aux6 = campo6.substring(575, 690);
    const campo6Aux7 = campo6.substring(690, 805);
    const campo6Aux8 = campo6.substring(805, 920);
    const campo6Aux9 = campo6.substring(920, 1035);
    const campo6Aux10 = campo6.substring(1035, 1150);
    const campo6Aux11 = campo6.substring(1150, 1265);

    // campo 7
    const campo7Aux1 = campo7.substring(0, 115);
    const campo7Aux2 = campo7.substring(115, 230);
    const campo7Aux3 = campo7.substring(230, 340);
    const campo7Aux4 = campo7.substring(340, 460);
    const campo7Aux5 = campo7.substring(460, 575);
    const campo7Aux6 = campo7.substring(575, 690);
    const campo7Aux7 = campo7.substring(690, 805);
    const campo7Aux8 = campo7.substring(805, 920);
    const campo7Aux9 = campo7.substring(920, 1035);
    const campo7Aux10 = campo7.substring(1035, 1150);
    const campo7Aux11 = campo7.substring(1150, 1265);

    // campo 8
    const campo8Aux1 = campo8.substring(0, 115);
    const campo8Aux2 = campo8.substring(115, 230);
    const campo8Aux3 = campo8.substring(230, 340);
    const campo8Aux4 = campo8.substring(340, 460);
    const campo8Aux5 = campo8.substring(460, 575);
    const campo8Aux6 = campo8.substring(575, 690);
    const campo8Aux7 = campo8.substring(690, 805);
    const campo8Aux8 = campo8.substring(805, 920);
    const campo8Aux9 = campo8.substring(920, 1035);
    const campo8Aux10 = campo8.substring(1035, 1150);
    const campo8Aux11 = campo8.substring(1150, 1265);

    // campo 9
    const campo9Aux1 = campo9.substring(0, 115);
    const campo9Aux2 = campo9.substring(115, 230);
    const campo9Aux3 = campo9.substring(230, 340);
    const campo9Aux4 = campo9.substring(340, 460);
    const campo9Aux5 = campo9.substring(460, 575);
    const campo9Aux6 = campo9.substring(575, 690);
    const campo9Aux7 = campo9.substring(690, 805);
    const campo9Aux8 = campo9.substring(805, 920);
    const campo9Aux9 = campo9.substring(920, 1035);
    const campo9Aux10 = campo9.substring(1035, 1150);
    const campo9Aux11 = campo9.substring(1150, 1265);

    // campo 10
    const campo10Aux1 = campo10.substring(0, 115);
    const campo10Aux2 = campo10.substring(115, 230);
    const campo10Aux3 = campo10.substring(230, 340);
    const campo10Aux4 = campo10.substring(340, 460);
    const campo10Aux5 = campo10.substring(460, 575);
    const campo10Aux6 = campo10.substring(575, 690);
    const campo10Aux7 = campo10.substring(690, 805);
    const campo10Aux8 = campo10.substring(805, 920);
    const campo10Aux9 = campo10.substring(920, 1035);
    const campo10Aux10 = campo10.substring(1035, 1150);
    const campo10Aux11 = campo10.substring(1150, 1265);

    // campo 11
    const campo11Aux1 = campo11.substring(0, 115);
    const campo11Aux2 = campo11.substring(115, 230);
    const campo11Aux3 = campo11.substring(230, 340);
    const campo11Aux4 = campo11.substring(340, 460);
    const campo11Aux5 = campo11.substring(460, 575);
    const campo11Aux6 = campo11.substring(575, 690);
    const campo11Aux7 = campo11.substring(690, 805);
    const campo11Aux8 = campo11.substring(805, 920);
    const campo11Aux9 = campo11.substring(920, 1035);
    const campo11Aux10 = campo11.substring(1035, 1150);
    const campo11Aux11 = campo11.substring(1150, 1265);

    // campo 12
    const campo12Aux1 = campo12.substring(0, 115);
    const campo12Aux2 = campo12.substring(115, 230);
    const campo12Aux3 = campo12.substring(230, 340);
    const campo12Aux4 = campo12.substring(340, 460);
    const campo12Aux5 = campo12.substring(460, 575);
    const campo12Aux6 = campo12.substring(575, 690);
    const campo12Aux7 = campo12.substring(690, 805);
    const campo12Aux8 = campo12.substring(805, 920);
    const campo12Aux9 = campo12.substring(920, 1035);
    const campo12Aux10 = campo12.substring(1035, 1150);
    const campo12Aux11 = campo12.substring(1150, 1265);

    // campo 13
    const campo13Aux1 = campo13.substring(0, 115);
    const campo13Aux2 = campo13.substring(115, 230);
    const campo13Aux3 = campo13.substring(230, 340);
    const campo13Aux4 = campo13.substring(340, 460);
    const campo13Aux5 = campo13.substring(460, 575);
    const campo13Aux6 = campo13.substring(575, 690);
    const campo13Aux7 = campo13.substring(690, 805);
    const campo13Aux8 = campo13.substring(805, 920);
    const campo13Aux9 = campo13.substring(920, 1035);
    const campo13Aux10 = campo13.substring(1035, 1150);
    const campo13Aux11 = campo13.substring(1150, 1265);

    // let tamaño: number = documentoPDF1.internal.pageSize.height;


    // Parte 1
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 0.90, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-congreso.jpg', 'png', 5.8, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 7.1, 0.25, 1, 0.65).setFontSize(14).setTextColor('#707070');
    documentoPDF1.text('Premio Estatal de la Innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#707070");
    documentoPDF1.text('Nombre de la propuesta: ' + nomPropuesta, 0.7, 2).setFontSize(12).setTextColor("#707070");
    documentoPDF1.text(primerAspirante, 0.7, 2.2).setFontSize(12).setTextColor("#707070");
    documentoPDF1.text(segundoAspirante, 0.7, 2.4).setFontSize(12).setTextColor("#707070");
    documentoPDF1.text(tercerAspirante, 0.7, 2.6);
    documentoPDF1.text('', 0, 0).setFontSize(12).setTextColor("#0163A8");
    documentoPDF1.text('1.- Presentación', 0.7, 2.8).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text('Origenes y antecedentes del problema objeto del proyecto:', 0.7, 3).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo1Aux1, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux2, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux3, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux4, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux5, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux6, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux7, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux8, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux9, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux10, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux11, 0.7, 5.3, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text('Objetivos científicos, tecnológicos y en su caso de innovación:', 0.7, 5.7).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo2Aux1, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux2, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux3, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux4, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux5, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux6, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux7, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux8, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux9, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux10, 0.7, 7.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux11, 0.7, 8.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.addPage();

    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 0.90, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-congreso.jpg', 'png', 5.8, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 7.1, 0.25, 1, 0.65).setFontSize(14).setTextColor('#707070');
    documentoPDF1.text('Premio Estatal de la Innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");

    documentoPDF1.text("Importancia y justificación del tema objeto del proyecto:", 0.7, 2.8).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo3Aux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo3Aux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Alineación al Plan Estatal de Desarrollo 2016-2022:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo4Aux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo4Aux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);



    // parte 2
    documentoPDF1.addPage();

    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 0.90, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-congreso.jpg', 'png', 5.8, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 7.1, 0.25, 1, 0.65).setFontSize(14).setTextColor('#707070');
    documentoPDF1.text('Premio Estatal de la Innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#0163A8");

    documentoPDF1.text('2.- Estructura metodológica', 0.7, 2.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Descripción de la propuesta:", 0.7, 2.8).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo5Aux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo5Aux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Identificación de los nuevos hallazgos:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo6Aux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo6Aux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.addPage();

    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 0.90, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-congreso.jpg', 'png', 5.8, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 7.1, 0.25, 1, 0.65).setFontSize(14).setTextColor('#707070');
    documentoPDF1.text('Premio Estatal de la Innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");

    documentoPDF1.text("Marco metodológico de referencia:", 0.7, 2.8).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo7Aux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo7Aux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Etapas y alcances de la propuesta:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo8Aux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo8Aux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);


    // parte 3
    documentoPDF1.addPage();

    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 0.90, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-congreso.jpg', 'png', 5.8, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 7.1, 0.25, 1, 0.65).setFontSize(14).setTextColor('#707070');
    documentoPDF1.text('Premio Estatal de la Innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#0163A8");

    documentoPDF1.text('3.- Aportación, vinculación y aplicación', 0.7, 2.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Experiencia científico técnica alcanzada:", 0.7, 2.8).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo9Aux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo9Aux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Tipificación de la vinculación institucional y organizacional:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo10Aux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo10Aux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.addPage();

    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 0.90, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-congreso.jpg', 'png', 5.8, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 7.1, 0.25, 1, 0.65).setFontSize(14).setTextColor('#707070');
    documentoPDF1.text('Premio Estatal de la Innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");

    documentoPDF1.text("Identificación del impacto económico y social:", 0.7, 2.8).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo11Aux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo11Aux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Factibilidad económica:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo12Aux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo12Aux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);


    documentoPDF1.addPage();

    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 0.90, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-congreso.jpg', 'png', 5.8, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 7.1, 0.25, 1, 0.65).setFontSize(14).setTextColor('#707070');
    documentoPDF1.text('Premio Estatal de la Innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");

    documentoPDF1.text("Resultados esperados:", 0.7, 2.8).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo13Aux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo13Aux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);


    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("URL del vídeo:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo14, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);


// guardar
    documentoPDF1.save("Acuse registro.pdf");

  }

}
