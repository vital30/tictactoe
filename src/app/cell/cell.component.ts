import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() value: null;
  //@Output('userClick') click = new EventEmitter<string>();

  //@HostListener('click')
  // turnClick() {
  //   this.click.emit('');
  // }
  constructor() { }

  ngOnInit(): void {
  }
  typeOf(value) {
    return typeof value;
  }

}
