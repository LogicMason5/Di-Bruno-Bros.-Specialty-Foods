import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from  '../../services/data.service';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { HeaderComponent } from './components/header/header.component';


import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [DataService]
})
export class PlayerComponent implements OnInit {
  pageTitle: string = "";
  song: any;
  audio: string;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {


    let params: any = this.route.snapshot.params;

    this.dataService.getSong(params.song_id).subscribe(data => {
      if (data){
        this.song = data;
        console.log(data);

        //this.dataService.setPageTitle("hello");
        //this.dataService.setPageTitle(this.song.title);
        //this.open.emit(this.song.title);
        this.pageTitle = this.song.title;
        this.audio = "http://localhost:5000/bappamusic/"+this.song.audio;
        console.log(this.audio);
        this.activate.emit(this.song.title);
      }
      else{
        // error handling
        console.log("Failed to load lyrics");
      }
    });

    // this.dataService.getAudio(params.song_id).subscribe(data => {
    //   if (data){
    //     this.audio = data;
    //     console.log("Event Emitted");
    //   }
    //   else{
    //     // error handling
    //     console.log("Failed to load audio");
    //   }
    // });

  }

}
