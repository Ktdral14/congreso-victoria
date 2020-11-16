
import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/user.model';
import { ProposalService } from '../../services/proposal.service';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";



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
  propuestaTermianda = false;
  constructor(
    private ngWizardService: NgWizardService,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService
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
    console.log(this.formPropuesta.value);
    if (this.formPropuesta.valid && !this.cantidadLimite) {
      this.proposalService.registerProposal(this.formPropuesta.value)
        .subscribe(data => {
          console.log(data);
          if (!data.error) {
            Swal.fire({
              title: 'Su propuesta se registro correctamente',
              icon: 'success',
            }).then (() => {
              localStorage.setItem('termino-' + this.userData.id_usuarios, JSON.stringify({termino: true}));
              this.propuestaTermianda = JSON.parse(localStorage.getItem('termino-' + this.userData.id_usuarios)).termino;
              window.location.reload();
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


  generarPDF() {
    const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto labore molestiae sint voluptatum! Soluta laudantium iusto dolor ipsam, voluptatibus repellat explicabo, dolore quibusdam ut eum aliquid adipisci? Nulla, facilis adipisci corporis cum consequatur molestiae porro quibusdam atque iste modi mollitia. Necessitatibus voluptate, vitae maxime corporis ex corrupti sunt officia quia repudiandae, dignissimos atque totam unde. Blanditiis commodi, possimus illo accusamus eligendi soluta suscipit velit voluptatibus hic voluptas iste tempora amet ducimus ipsum quod deleniti ut dolores nam unde consectetur. Beatae dolorum nesciunt odit repellendus non, eum, totam molestias illo corrupti unde, rem ducimus laudantium. Sapiente sunt fugit quod repellendus, error enim, architecto et laudantium sit minus adipisci! Autem aperiam veniam libero saepe laborum quidem, iure dicta beatae provident obcaecati repudiandae in minus debitis quae? Vero, magnam ducimus maxime pariatur repudiandae nisi aspernatur animi et, ratione vel esse ex perspiciatis deleniti.";
  }



  descargarAcusePDF() {
    // declaracion pdf
    const documentoPDF1 = new jsPDF('p', 'in', 'letter');
    // campos
    const campo1 = "";
    const campo2 = "";
    const campo3 = ""
    const campo4 = ""
    const campo5 = ""
    const campo6 = ""
    const campo7 = ""
    const campo8 = ""
    const campo9 = ""
    const campo10 = ""
    const campo11 = ""
    const campo12 = ""
    const campo13 = ""
    const campo14 = ""


    // borrar
    const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit reiciendis illo sequi unde dolor. Quos pariatur, quibusdam ipsa nobis cum velit saepe similique vitae veritatis ad omnis beatae cupiditate quasi blanditiis modi, unde magni nesciunt tempora aliquid molestiae est esse sunt! Tempora consequatur corrupti ipsa accusantium pariatur vel quod, unde modi obcaecati maiores rem, ullam ipsum natus praesentium similique! Suscipit omnis dolore, nihil error totam quam! Ipsa dignissimos adipisci culpa, voluptate maiores recusandae repudiandae similique illum tempore maxime pariatur libero architecto vel, optio eius. Recusandae culpa tempora maiores veritatis rerum beatae minus inventore quos voluptas ratione? Tenetur, possimus corporis asperiores temporibus est iste cum quo. At architecto, libero earum reprehenderit aperiam molestiae quas deserunt eveniet fuga nostrum, dolore unde! Eum fugit optio omnis blanditiis, ut, nesciunt dignissimos labore tempore placeat, quo velit. Esse ea similique iure fugiat, mollitia ut doloremque aut nisi voluptatem facere. Laborum pariatur mollitia inventore at molestias, dignissimos facilis consequuntur omnis repellat natus iusto voluptate iure quod earum nobis maiores rerum impedit corrupti nisi! Quisquam cupiditate mollitia ipsam maxime amet veniam dignissimos eos inventore officiis dolor commodi, quis eligendi est ratione quidem corporis quaerat corrupti soluta dolores doloremque quibusdam aperiam eum aliquam quia! Eos reprehenderit consequuntur eum!";
    const loremAux1 = lorem.substring(0, 115);
    const loremAux2 = lorem.substring(115, 230);
    const loremAux3 = lorem.substring(230, 340);
    const loremAux4 = lorem.substring(340, 460);
    const loremAux5 = lorem.substring(460, 575);
    const loremAux6 = lorem.substring(575, 690);
    const loremAux7 = lorem.substring(690, 805);
    const loremAux8 = lorem.substring(805, 920);
    const loremAux9 = lorem.substring(920, 1035);
    const loremAux10 = lorem.substring(1035, 1150);
    const loremAux11 = lorem.substring(1150, 1265);

    const link = "Este es el link del video";



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
    const campo11Aux1 = campo2.substring(0, 115);
    const campo11Aux2 = campo2.substring(115, 230);
    const campo11Aux3 = campo2.substring(230, 340);
    const campo11Aux4 = campo2.substring(340, 460);
    const campo11Aux5 = campo2.substring(460, 575);
    const campo11Aux6 = campo2.substring(575, 690);
    const campo11Aux7 = campo2.substring(690, 805);
    const campo11Aux8 = campo2.substring(805, 920);
    const campo11Aux9 = campo2.substring(920, 1035);
    const campo11Aux10 = campo2.substring(1035, 1150);
    const campo11Aux11 = campo2.substring(1150, 1265);

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
    documentoPDF1.text(loremAux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Objetivos científicos, tecnológicos y en su caso de innovación:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(loremAux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);

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
    documentoPDF1.text(loremAux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Alineación al Plan Estatal de Desarrollo 2016-2022:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(loremAux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);



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
    documentoPDF1.text(loremAux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Identificación de los nuevos hallazgos:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(loremAux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);

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
    documentoPDF1.text(loremAux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Etapas y alcances de la propuesta:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(loremAux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);




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
    documentoPDF1.text(loremAux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Tipificación de la vinculación institucional y organizacional:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(loremAux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);

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
    documentoPDF1.text(loremAux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);

    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("Factibilidad económica:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(loremAux1, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 5.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 6.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 6.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 6.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 6.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 6.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 7.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 7.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 7.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 7.7, { maxWidth: 180, align: "justify" }).setFontSize(10);


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
    documentoPDF1.text(loremAux1, 0.7, 3.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux2, 0.7, 3.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux3, 0.7, 3.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux4, 0.7, 3.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux5, 0.7, 3.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux6, 0.7, 4.1, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux7, 0.7, 4.3, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux8, 0.7, 4.5, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux9, 0.7, 4.7, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux10, 0.7, 4.9, { maxWidth: 180, align: "justify" }).setFontSize(10);
    documentoPDF1.text(loremAux11, 0.7, 5.1, { maxWidth: 180, align: "justify" }).setFontSize(10);



    documentoPDF1.text('', 0.7, 1.5).setFontSize(12).setTextColor("#2B282A");
    documentoPDF1.text("URL del vídeo con duración entre tres o cinco minutos:", 0.7, 5.4).setFontSize(12);
    documentoPDF1.text('', 0.7, 1.5).setFontSize(10).setTextColor("#707070");
    documentoPDF1.text(link, 0.7, 5.7, { maxWidth: 180, align: "justify" }).setFontSize(10);


    documentoPDF1.save("Acuse registro.pdf");




  }



}



