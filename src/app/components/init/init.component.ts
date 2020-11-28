import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProyectsService } from '../../services/proyects.service';
import { AsignedProyectsBody, RegistredProyectsBody } from '../../models/proyects.model';
import jsPDF from 'jspdf';
import { forkJoin } from 'rxjs';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {

  @ViewChild('swalid') private swalCalificaciones: SwalComponent;

  proyectosCalificacion;

  asignedProyects: AsignedProyectsBody[];
  registredProyects: RegistredProyectsBody[];
  constructor(
    private proyectoService: ProyectsService,
    private utilService: UtilsService
  ) {
    this.proyectosCalificacion = new Array<any>();
  }

  ngOnInit(): void {
    this.utilService._loading = true;
    forkJoin({
      asignedProyects: this.proyectoService.selectAllAsignedProyects(),
      registredProyects: this.proyectoService.selectAllRegistredProyects(),
      proyectosAllTop: this.proyectoService.getProjectsAllTop()
    }).subscribe(data => {
      this.proyectosCalificacion = data.proyectosAllTop.body;
      this.asignedProyects = data.asignedProyects.body;
      this.registredProyects = data.registredProyects.body;
    }, err => console.log(err)).add(() => this.utilService._loading = false);
  }

  mostrarProyectosPorCalificacion(evt: any) {
    this.swalCalificaciones.fire().then(
      res => {
        this.saveAsPdf();
      }, err => {
        console.log(err);
      });
  }

  saveAsPdf() {
    let y = 3;
    console.log(this.proyectosCalificacion.length);
    console.log(this.proyectosCalificacion);

    const doc = new jsPDF('p', 'in', 'letter');
    doc.addImage('../assets/img/logo-cotacyt.png', 'png', 0.6, 0.5, 1.3, 0.5).setFontSize(16).setTextColor('#707070');
    doc.text('Premio Estatal de la Innovación', 4.2, 1.6, { align: 'center' });
    doc.addImage('../assets/img/logo-congreso.jpg', 'jpg', 5.3, 0.5, 1.3, 0.6);
    doc.addImage('../assets/img/logo-tam-color.png', 'png', 6.7, 0.4, 1.2, 0.75).setFontSize(13);

    doc.text('Proyecto', 1, 2.5).setFontSize(13);
    doc.text('Calificación', 6.3, 2.5).setFontSize(12);
    for (let j = 0; j < this.proyectosCalificacion.length; j++) {
      if (j > 25 && j <= 50) {
        let y = 3;
        doc.addPage();
        doc.addImage('../assets/img/logo-cotacyt.png', 'png', 0.6, 0.5, 1.3, 0.5).setFontSize(16).setTextColor('#707070');
        doc.text('Premio Estatal de la Innovación', 4.2, 1.6, { align: 'center' });
        doc.addImage('../assets/img/logo-congreso.jpg', 'jpg', 5.3, 0.5, 1.3, 0.6);
        doc.addImage('../assets/img/logo-tam-color.png', 'png', 6.7, 0.4, 1.2, 0.75).setFontSize(13);

        doc.text('Proyecto', 1, 2.5).setFontSize(13);
        doc.text('Calificación', 6.3, 2.5).setFontSize(12);
        for (let j = 0; j < this.proyectosCalificacion.length; j++) {
          doc.text(this.proyectosCalificacion[j].nombre, 1, y).setFontSize(12);
          doc.text((parseInt(this.proyectosCalificacion[j].calificacion).toFixed(2)).toString(), 6.5, y);
          y += 0.23;
        }
      } else
        if (j > 50 && j <= 75) {
          let y = 3;
          doc.addPage();
          doc.addImage('../assets/img/logo-cotacyt.png', 'png', 0.6, 0.5, 1.3, 0.5).setFontSize(16).setTextColor('#707070');
          doc.text('Premio Estatal de la Innovación', 4.2, 1.6, { align: 'center' });
          doc.addImage('../assets/img/logo-congreso.jpg', 'jpg', 5.3, 0.5, 1.3, 0.6);
          doc.addImage('../assets/img/logo-tam-color.png', 'png', 6.7, 0.4, 1.2, 0.75).setFontSize(13);

          doc.text('Proyecto', 1, 2.5).setFontSize(13);
          doc.text('Calificación', 6.3, 2.5).setFontSize(12);
          for (let j = 0; j < this.proyectosCalificacion.length; j++) {
            doc.text(this.proyectosCalificacion[j].nombre, 1, y).setFontSize(12);
            doc.text((parseInt(this.proyectosCalificacion[j].calificacion).toFixed(2)).toString(), 6.5, y);
            y += 0.23;
          }
        }
      
      doc.text(this.proyectosCalificacion[j].nombre, 1, y).setFontSize(12);
      doc.text((parseInt(this.proyectosCalificacion[j].calificacion).toFixed(2)).toString(), 6.5, y);
      y += 0.23;
    }
    doc.save('lista de proyectos');

  }
}
