import { Component, OnInit } from '@angular/core';
import { DataService } from  '../../services/data.service';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router';


import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  song: Song;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    let params: any = this.route.snapshot.params;
    console.log(params.song_id);

    this.dataService.getSong(params.song_id).subscribe(data => {
      if (data){
        this.song = data;
        console.log(this.song);
      }
      else{
        // error handling
        console.log("Failed to load menu list");
      }
    })

  }

}

interface Song{

}
