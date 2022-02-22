import { Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appDetectwidth]',
})
export class DetectwidthDirective implements OnInit {

  getScreenWidth = 0;

  @Output() mobile = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;

    

    return ( this.getScreenWidth <= 350 ) ? this.mobile.emit(true) : this.mobile.emit(false);
  }

}
