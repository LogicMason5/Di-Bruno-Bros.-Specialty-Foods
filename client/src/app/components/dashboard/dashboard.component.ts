import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from  '../../services/data.service';
import { Router } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuList: [MenuItem];
  pageTitle: string;
  selectedList: string;
  @Output() activate: EventEmitter<any> = new EventEmitter();

  constructor(private dataService:DataService, private router:Router) { }

  ngOnInit() {

    this.dataService.getMenuList().subscribe(data => {
      if (data){
        this.menuList = data;
        console.log(this.menuList );
        this.pageTitle = "Bappa Music";
        this.activate.emit(null);
      }
      else{
        // error handling
        console.log("Failed to load menu list");
      }
    })
  }

  navigateToSubList(item:MenuItem){
    console.log(item);
    this.router.navigate(['songlist', {item_id: item.id, cat:item.title}]);
  }

}

interface MenuItem{
  id: number,
  title: string
}
