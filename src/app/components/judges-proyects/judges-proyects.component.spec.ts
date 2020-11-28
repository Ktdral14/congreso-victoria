import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgesProyectsComponent } from './judges-proyects.component';

describe('JudgesProyectsComponent', () => {
  let component: JudgesProyectsComponent;
  let fixture: ComponentFixture<JudgesProyectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgesProyectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgesProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
