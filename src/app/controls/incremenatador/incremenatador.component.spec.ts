import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncremenatadorComponent } from './incremenatador.component';

describe('IncremenatadorComponent', () => {
  let component: IncremenatadorComponent;
  let fixture: ComponentFixture<IncremenatadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncremenatadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncremenatadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
