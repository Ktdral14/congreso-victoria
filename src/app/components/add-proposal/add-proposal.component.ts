
import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/user.model';
import { ProposalService } from '../../services/proposal.service';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import { UtilsService } from '../../utils/utils.service'




@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.scss']
})


export class AddProposalComponent implements OnInit {


  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
  };

  formPropuesta: FormGroup;
  userData: UserData;
  palabrasEscritas = [];
  cantidadPalabras = 0;
  cantidadLimite = false;
  propuestaTermianda = false;
  constructor(
    private ngWizardService: NgWizardService,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService,
    private _utilService:UtilsService
  ) {
    this.userData = JSON.parse(localStorage.getItem('session-data'));
    const propuestaData = JSON.parse(localStorage.getItem('termino-' + this.userData.id_usuarios));
    if (!propuestaData) {
      localStorage.setItem('termino-' + this.userData.id_usuarios, JSON.stringify({termino: false}));
    }
    this.propuestaTermianda = JSON.parse(localStorage.getItem('termino-' + this.userData.id_usuarios)).termino;
    this.formPropuesta = formBuilder.group({
      id_categorias: ['1'],
      id_usuarios: [this.userData.id_usuarios],
      introduccion: ['', [Validators.required]],
      objetivos: ['', [Validators.required]],
      importancia: ['', [Validators.required]],
      alineacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      marco: ['', [Validators.required]],
      etapas: ['', [Validators.required]],
      experiencia: ['', [Validators.required]],
      tipificacion: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      impacto: ['', [Validators.required]],
      factibilidad: ['', [Validators.required]],
      resultados: ['', [Validators.required]],
      url: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.userData.propuesta === 'No data' && !localStorage.getItem('aspirantes')) {
      Swal.fire({
        title: 'Advertencia',
        icon: 'info',
        text: 'Primero necesitas registrar los aspirantes'
      }).then(() => {
        window.location.reload();
      });
    }
    let propuestaLocal: any = localStorage.getItem('propuesta-' + this.userData.id_usuarios);
    if (propuestaLocal) {
      propuestaLocal = JSON.parse(propuestaLocal);
      this.formPropuesta.patchValue({
      id_usuarios: propuestaLocal.id_usuarios,
      introduccion: propuestaLocal.introduccion,
      objetivos: propuestaLocal.objetivos,
      importancia: propuestaLocal.importancia,
      alineacion: propuestaLocal.alineacion,
      descripcion: propuestaLocal.descripcion,
      marco: propuestaLocal.marco,
      etapas: propuestaLocal.etapas,
      experiencia: propuestaLocal.experiencia,
      tipificacion: propuestaLocal.tipificacion,
      identificacion: propuestaLocal.identificacion,
      impacto: propuestaLocal.impacto,
      factibilidad: propuestaLocal.factibilidad,
      resultados: propuestaLocal.resultados,
      url: propuestaLocal.url,
      });
      this.contadorPalabras();
    }
  }

  registerProposal() {
    this._utilService.loading = true;
    console.log(this.formPropuesta.value);
    if (this.formPropuesta.valid && !this.cantidadLimite) {
      this.proposalService.registerProposal(this.formPropuesta.value)
        .subscribe(data => {
          console.log(data);
          if (!data.error) {
            Swal.fire({
              title: 'Su propuesta se registro correctamente, se descargara el acuse',
              icon: 'success',
            }).then (() => {
              localStorage.setItem('termino-' + this.userData.id_usuarios, JSON.stringify({termino: true}));
              this.propuestaTermianda = JSON.parse(localStorage.getItem('termino-' + this.userData.id_usuarios)).termino;
              this.descargarAcusePDF();
              window.location.reload();
            });
            this._utilService.loading = false;
          } else {
            Swal.fire({
              title: 'Ocurrio un error al registrar la propuesta',
              icon: 'error',
            });
            this._utilService.loading = false;
          }
        }, err => console.log(err)).add(() => this._utilService.loading = false);
    } else {
      Swal.fire({
        title: 'Advertencia',
        icon: 'info',
        text: 'Favor de completar todos los campos o verificar el limite de palabras'
      });
      this._utilService.loading = false;
    }
  }

  contadorPalabras( _?: any) {
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

  showPreviousStep( _ ?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep( _ ?: Event) {
    this.ngWizardService.next();
  }


  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged( _ : StepChangedArgs) {
    localStorage.setItem('propuesta-' + this.userData.id_usuarios,  JSON.stringify(this.formPropuesta.value));
  }

  descargarAcusePDF() {
    // declaracion pdf
    const documentoPDF1 = new jsPDF('p', 'in', 'letter');
    // campos
    const campo1 = this.formPropuesta.value.introduccion;
    const campo2 = this.formPropuesta.value.objetivos;
    const campo3 = this.formPropuesta.value.importancia;
    const campo4 = this.formPropuesta.value.alineacion;
    const campo5 = this.formPropuesta.value.descripcion;
    const campo6 = this.formPropuesta.value.identificacion;
    const campo7 = this.formPropuesta.value.marco;
    const campo8 = this.formPropuesta.value.etapas;
    const campo9 = this.formPropuesta.value.experiencia;
    const campo10 = this.formPropuesta.value.tipificacion;
    const campo11 = this.formPropuesta.value.impacto;
    const campo12 = this.formPropuesta.value.factibilidad;
    const campo13 = this.formPropuesta.value.resultados;
    const campo14 = this.formPropuesta.value.url;

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
    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 0.70, 0.25, 1, 0.75);
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 6.5, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.text('Premio estatal de innovación', 4.1, 0.7, { align: "center" });

    documentoPDF1.text('Registro de la Propuesta', 0.7, 1.8).setFontSize(12).setTextColor("#A8A8A9");
    documentoPDF1.text('', 0.7, 1.9).setFontSize(12);
    documentoPDF1.text('Acuse', 0.7, 1.5);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#0163A8");

    documentoPDF1.text('1.- Presentación', 0.7, 2.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Origenes y antecedentes del problema objeto del proyecto:", 0.7, 2.8).setFontSize(12);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo1Aux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo1Aux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Objetivos científicos, tecnológicos y en su caso de innovación:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(campo2Aux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(campo2Aux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.addPage();

    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 0.70, 0.25, 1, 0.75);
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 6.5, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.text('Premio estatal de innovación', 4.1, 0.7, { align: "center" });

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

    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 0.70, 0.25, 1, 0.75);
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 6.5, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.text('Premio estatal de innovación', 4.1, 0.7, { align: "center" });

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

    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 0.70, 0.25, 1, 0.75);
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 6.5, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.text('Premio estatal de innovación', 4.1, 0.7, { align: "center" });

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

    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 0.70, 0.25, 1, 0.75);
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 6.5, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.text('Premio estatal de innovación', 4.1, 0.7, { align: "center" });

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

    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 0.70, 0.25, 1, 0.75);
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 6.5, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.text('Premio estatal de innovación', 4.1, 0.7, { align: "center" });

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

    documentoPDF1.addImage('assets/img/logo-tam-color.png', 'png', 0.70, 0.25, 1, 0.75);
    documentoPDF1.addImage('assets/img/logo-cotacyt.png', 'png', 6.5, 0.35, 1.2, 0.5).setFont('Helvetica').setFontSize(18).setTextColor('#707070');
    documentoPDF1.text('Premio estatal de innovación', 4.1, 0.7, { align: "center" });

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


// ok
    documentoPDF1.save("Acuse registro.pdf");




  }



}



