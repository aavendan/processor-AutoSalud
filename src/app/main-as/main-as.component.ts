import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import {MatTabChangeEvent} from '@angular/material/tabs';
import { MatTabGroup } from "@angular/material";

import { Subject } from "rxjs";


//SET TABS TO BOTTOM
@Component({
  selector: 'app-main-as',
  templateUrl: './main-as.component.html',
  styleUrls: ['./main-as.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainAsComponent implements OnInit {

  reloadable: Subject<boolean> = new Subject<boolean>();
  @ViewChild('tabs', { static: false }) tabGroup: MatTabGroup;
  
  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer) { 
    this.matIconRegistry.addSvgIcon(
      "accept",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/accept.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "process",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/process.svg")
    );
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    //this.tabGroup.selectedIndex = 1;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('tabChangeEvent => ', tabChangeEvent);
    //console.log('index => ', tabChangeEvent.index);
    this.reloadable.next(true);
  } 

}