import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { DataService } from  './services/data.service';
import { SongListComponent } from './components/song-list/song-list.component';
import { PlayerComponent } from './components/player/player.component';

const appRoutes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'songlist', component:SongListComponent},
  {path: 'player', component:PlayerComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SongListComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
