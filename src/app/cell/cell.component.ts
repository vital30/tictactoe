import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() value: string[];

  // @Output('turnClick') click = new EventEmitter<string>();
  // //@Output() public click: EventEmitter<any> = new EventEmitter();

  // @HostListener('click')
  // turnClick() {
  //   this.click.emit();
  // }
  constructor() { }

  ngOnInit(): void {
  }
  typeOf(value) {
    return typeof value;
  }

}
