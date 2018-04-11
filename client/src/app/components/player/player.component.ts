import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from  '../../services/data.service';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router';
import { SongListComponent } from '../song-list/song-list.component';
import { HeaderComponent } from '../header/header.component';


import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
declare var componentHandler: any;

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
  totalTime: string;
  seekbar: any;
  curTime: string;
  isplaying: boolean = false;

  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();


  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {

    let params: any = this.route.snapshot.params;
    this.seekbar = (<HTMLInputElement>document.getElementById('seek'));



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


        setTimeout(()=>{
          this.curTime = "0:00";
          this.totalTime = "0:00";
        },100);

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
    if (this.curAudio.duration){
        this.totalTime = this.formatTime(this.curAudio.duration);
    }
    componentHandler.upgradeElement(this.seekbar);


  }


  setCurrentTime(timeIn){
    this.curAudio.currentTime = parseInt(timeIn);
  }

  getCurrentTime(){
    console.log(this.curAudio.currentTime);
    console.log((this.curAudio.currentTime/this.curAudio.duration)*100);
  }

  onSeek(){
    this.seekVal = this.seekbar.value;
    this.setCurrentTime((this.seekVal*this.curAudio.duration)/100);
  }

  setSeek(){
    // updating current time
    this.curTime = this.formatTime(this.curAudio.currentTime);
    // updating seek value
    this.seekVal = (this.curAudio.currentTime/this.curAudio.duration)*100;
    this.seekbar.MaterialSlider.change(this.seekVal);
  }

  formatTime(timeIn){
    var minutes:number = Math.floor(timeIn / 60);
    var sec:any = ((timeIn).toFixed(0) - (minutes*60));
    var seconds:any = sec/10 < 1 ? ("0"+(sec).toString()) : (""+(sec).toString());
    return (minutes + ":" + seconds);
  }

  play(){
    this.totalTime = this.formatTime(this.curAudio.duration);
    var element = document.getElementById('playPauseBtn');
    if (this.isplaying){
      this.curAudio.pause();
      this.isplaying = false;
      element.innerHTML = '<i class="material-icons">play_arrow</i>';
    }
    else{
      this.curAudio.play();
      this.isplaying = true;
      element.innerHTML = '<i class="material-icons">pause</i>';
    }

  }
  pause(){
    this.curAudio.pause();
  }
  mute(){
    var curVal = this.curAudio.muted;
    if (curVal){
      document.getElementById('voliconbtn').classList.remove("mdl-button--colored");
    }
    else{
      document.getElementById('voliconbtn').classList.add("mdl-button--colored");
    }
    this.curAudio.muted = !curVal;
  }

}
