import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnChanges {
  @Input() photos: Photo[] = [];
  rows: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if(changes.photos) this.rows = this.groupColunms(this.photos);
  }

  groupColunms(photos: Photo[]){
    const newRows = [];
    for (let i = 0; i < photos.length; i += 3){
      newRows.push(photos.slice(i, i + 3));
    }
    return newRows;
  }

}
