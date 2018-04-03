import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  audioSong: any;
  curAudio: any;
  seekVal: any = 0;
  duration: any;
  seekbar: any;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();


  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {


    let params: any = this.route.snapshot.params;

    this.seekbar = document.getElementById('seek');


    this.dataService.getSong(params.song_id).subscribe(data => {
      if (data){
        this.song = data;
        console.log(data);

        //this.dataService.setPageTitle("hello");
        //this.dataService.setPageTitle(this.song.title);
        //this.open.emit(this.song.title);
        this.pageTitle = this.song.title;
        this.audio = "http://localhost:5000/bappamusic/"+this.song.audio;
        this.activate.emit(this.song.title);


      }
      else{
        // error handling
        console.log("Failed to load lyrics");
      }
    });
  }

  ngAfterViewInit(){
    this.curAudio = document.getElementById('myAudio');
    this.curAudio.voulume = 1.0;
    this.duration = this.curAudio.duration;



  }

  setCurrentTime(timeIn){
    this.curAudio.currentTime = parseInt(timeIn);
  }

  getCurrentTime(){
    console.log(this.curAudio.currentTime);
    console.log((this.curAudio.currentTime/this.curAudio.duration)*100);
  }

  onSeek(){
    this.seekVal = document.getElementById('seek').value;
    this.setCurrentTime((this.seekVal*this.curAudio.duration)/100);
  }

  setSeek(){
    this.seekVal = (this.curAudio.currentTime/this.curAudio.duration)*100;
    this.seekbar.MaterialSlider.change(this.seekVal);


  }


  play(){
    this.curAudio.play();
  }
  pause(){
    this.curAudio.pause();
  }
  mute(){
    this.curAudio.muted = !this.curAudio.muted;
  }

}
