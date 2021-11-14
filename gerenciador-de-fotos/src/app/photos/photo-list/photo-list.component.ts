import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  
  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    const userName = this.route.snapshot.params.userName;
    this.photoService.listFromUser(userName).subscribe(photos => this.photos = photos);
  }

}
