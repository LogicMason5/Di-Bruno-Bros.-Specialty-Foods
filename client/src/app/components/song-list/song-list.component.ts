import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from  '../../services/data.service';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router';
import { PlayerComponent } from '../player/player.component';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
   selectedId: number;
   songList: [MenuItem];
   pageTitle: string;
   @Output() activate: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let params: any = this.route.snapshot.params;
    console.log(params.item_id);

    this.dataService.getCategoryList(params.item_id).subscribe(data => {
      if (data){
        this.songList = data;
        console.log(this.songList);
        this.pageTitle = params.cat;
        this.activate.emit(null);
      }
      else{
        // error handling
        console.log("Failed to load menu list");
      }
    })

  }

  navigateToPlayer(item: MenuItem){
    console.log(item);
    this.router.navigate(['player', {song_id: item.id}]);
  }

}

interface MenuItem{
    id: number,
    title: string,
    text: string,
    audio: string,
    catergory_id: number
}
