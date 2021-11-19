import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  
  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.userName = this.route.snapshot.params.userName;
    this.photos = this.route.snapshot.data['photos'];
    this.debounce
    .pipe(debounceTime(400))
    .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
  
  filterFn(target : any) {
    if(target instanceof EventTarget) {
      let element = target as HTMLInputElement;
      this.debounce.next(element.value);
    }
  }

  load(){
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage).subscribe(photos => {
      this.photos = this.photos.concat(photos);
      if(!photos.length) this.hasMore = false;
    });
  }

}
