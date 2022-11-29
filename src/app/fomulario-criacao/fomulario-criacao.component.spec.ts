import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomularioCriacaoComponent } from './fomulario-criacao.component';

describe('FomularioCriacaoComponent', () => {
  let component: FomularioCriacaoComponent;
  let fixture: ComponentFixture<FomularioCriacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FomularioCriacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FomularioCriacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
