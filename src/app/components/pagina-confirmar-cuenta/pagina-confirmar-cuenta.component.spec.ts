import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaConfirmarCuentaComponent } from './pagina-confirmar-cuenta.component';

describe('PaginaConfirmarCuentaComponent', () => {
  let component: PaginaConfirmarCuentaComponent;
  let fixture: ComponentFixture<PaginaConfirmarCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaConfirmarCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaConfirmarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
