import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRecuperacionComponent } from './pagina-recuperacion.component';

describe('PaginaRecuperacionComponent', () => {
  let component: PaginaRecuperacionComponent;
  let fixture: ComponentFixture<PaginaRecuperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaRecuperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaRecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
