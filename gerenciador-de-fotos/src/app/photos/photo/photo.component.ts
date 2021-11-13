import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html'
})
export class PhotoComponent implements OnInit {

  @Input() description: string = '';
  @Input() url: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
