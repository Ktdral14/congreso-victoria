import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryService } from '../../services/recovery.service';
import swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {


  formRecuperar: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private recoveryService: RecoveryService
  ) {
  }

  ngOnInit(): void {
  }

  recovery(correo: string) {
    this.recoveryService.recoveryPass(correo).subscribe(
      data => {
        swal.fire({
          title: 'Se ha enviado un correo',
          icon: 'success'
        });
        this.router.navigateByUrl('/');
      },
      err => {
        swal.fire({
          title: 'Correo no encontrado',
          icon: 'error'
        });
        console.log(err);
      }
    );

  }

}
