import { Component, Input, Output } from '@angular/core';
import { DataService } from  './services/data.service';
import { SongListComponent } from './components/song-list/song-list.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  headText: any;
  constructor(private dataService: DataService, private router: Router){}

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

  hideDrawer(){
    document.getElementById('drawer').classList.remove('is-visible');
    document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible');
  }

  toDashboard(){
    this.router.navigate(['dashboard']);
  }



}
