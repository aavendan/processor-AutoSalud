import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd
 } from '@angular/router';
 import { Subject } from "rxjs";

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

//import { MUESTRAS } from '../muestras';
import { LocalStorageService } from '../services/local-storage.service';

import {CallerService} from '../services/caller.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search-as',
  templateUrl: './search-as.component.html',
  styleUrls: ['./search-as.component.css']
})
export class SearchAsComponent implements OnInit {

  @Input() 
  reloadTable: Subject<boolean> = new Subject<boolean>();
  @Input() 
  showAdd: boolean = true;

  
  displayedColumns: string[] = ['code', 'cardid',  'reference', 'result'];
  dataSource;
  
  user; center;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private localStorageService: LocalStorageService, 
    private router: Router,
    private auth: AuthService,
    private callerService: CallerService) { }

  ngOnInit() {

    //this.dataSource = new MatTableDataSource(MUESTRAS);
    this.loadTable();

    this.reloadTable.subscribe(response => {
      if(response){
        this.loadTable();
      }
    });

    
  }

   async loadTable() {

    this.user = this.auth.getCurrentCenter();
    this.center = this.user ? this.user.center:'center-1';

    let tests =  await this.callerService.getAllAcceptedTest('001');
    this.dataSource = new MatTableDataSource(tests);

    //this.dataSource = new MatTableDataSource(this.localStorageService.getAcceptedByCenterStorage(this.center));
    
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Muestras por página';
    
    this.dataSource.paginator._intl.nextPageLabel = 'Siguiente página';
    this.dataSource.paginator._intl.lastPageLabel = 'Última página'; 
    this.dataSource.paginator._intl.firstPageLabel = 'Primera página';
    this.dataSource.paginator._intl.previousPageLabel = 'Página previa';
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}