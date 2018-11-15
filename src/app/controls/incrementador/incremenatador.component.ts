import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component( {
selector: 'app-incremenatador',
templateUrl: './incrementador.component.html',
styleUrls: ['./incrementador.component.css']
})
export class IncremenatadorComponent implements OnInit {
@ViewChild ('txtProgress')txtProgress: ElementRef;
@Input()porcentaje = 50;
// tslint:disable-next-line:no-input-rename
@Output()cambiovalor: EventEmitter < number >  = new EventEmitter();
constructor() {}

ngOnInit() {
}
cambiarValor (valor ) {
if ((this.porcentaje + valor) >= 0 && (this.porcentaje + valor) <= 100) {
this.porcentaje = this.porcentaje + valor;

}
this.cambiovalor.emit(this.porcentaje);

}
onChange (event: number) {
if (event > 100) {
this.cambiovalor.emit(100);
this.txtProgress.nativeElement.value = 100;


} else if (event < 0 || event == null) {
this.cambiovalor.emit(0);
this.txtProgress.nativeElement.value = 0;

} else {
this.porcentaje = event;
this.txtProgress.nativeElement.value = this.porcentaje;
this.cambiovalor.emit(this.porcentaje);
}
}
}
