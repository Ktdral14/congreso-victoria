import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProyectsService } from '../../services/proyects.service';
import { ProyectosCalificacion } from '../../models/proyects.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {

  @ViewChild('swalid') private swalCalificaciones: SwalComponent;

  proyectosCalificacion;

  constructor(
    private proyectoService: ProyectsService
  ) {
    this.proyectosCalificacion = new Array<any>();
   }

  ngOnInit(): void {
    this.proyectoService.getProjectsAllTop().subscribe(
      data => {
        this.proyectosCalificacion = data.body;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
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
    console.log(this.proyectosCalificacion.length);
    console.log(this.proyectosCalificacion);

    const doc = new jsPDF('p', 'in', 'letter');
    doc.addImage('../assets/img/logo-cotacyt.png', 'png', 0.6, 0.5, 1.3, 0.5).setFontSize(14.5).setTextColor('#707070');
    doc.text('Premio Estatal de la Innovación', 2.3, 0.85);
    doc.addImage('../assets/img/logo-congreso.jpg', 'jpg', 5.3, 0.5, 1.3, 0.6);
    doc.addImage('../assets/img/logo-tam-color.png', 'png', 6.7, 0.4, 1.2, 0.75);

    doc.text('Proyecto', 1, 2.5);
    doc.text('Calificación', 6, 2.5);

    doc.text(this.proyectosCalificacion[0].nombre, 1, 3);
    doc.text((parseInt( this.proyectosCalificacion[0].calificacion).toFixed(2)).toString(), 6.2, 3);

    doc.save('lista de proyectos');

  }
}
