import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headText:string;
  constructor() {
    this.headText = "";
  }

  ngOnInit() {
  }

  onOpen(eventIn){
    console.log("YO YOYOYOYOYOY"+ eventIn);
    this.headText = eventIn;
    
  }


}
