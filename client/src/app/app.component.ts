import { Component, Input, Output } from '@angular/core';
import { DataService } from  './services/data.service';
import { SongListComponent } from './components/song-list/song-list.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  headText: any;
  constructor(private dataService: DataService){}

  ngOnInit() {

    this.dataService.getPageTitle().subscribe((data) => {
      this.headText = data;
      console.log("imported: "+ this.headText);
    });
  }

  componentAdded(eventIn){
    console.log("Baby");
    console.log(eventIn);
    this.headText = eventIn;

  }



}
