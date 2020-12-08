import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel } from '@angular/cdk/collections';
import {MatSelectChange} from '@angular/material/select';

//import { MuestrasInterface, MUESTRAS } from '../muestras';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';
import {CallerService} from '../services/caller.service';


import { STATES } from '../data/states';

@Component({
  selector: 'app-transfer-as',
  templateUrl: './transfer-as.component.html',
  styleUrls: ['./transfer-as.component.css']
})
export class TransferAsComponent implements OnInit {

  displayedColumns: string[] = ['select','code', 'cardid',  'reference']; //, 'accepted'
  dataSource;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  initialSelection = [];
  allowMultiSelect = true;

  user; center;
  selection; 
  states; 
  stateSelected = null;
  

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private auth: AuthService,
    private callerService: CallerService) { }

  async ngOnInit() {

    this.user = this.auth.getCurrentCenter();
    this.center = this.user ? this.user.center:'center-1';

    let tests = await this.callerService.getAllNewTest('001');
    this.dataSource = new MatTableDataSource(tests);
    
    //this.dataSource = new MatTableDataSource(this.localStorageService.getByCenterStorage(this.center));

    
    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

    this.states = STATES;

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  hasSelected() {
    //if online and crm selected
    return this.stateSelected != null && this.selection.selected.length > 0;
  }

  transfer(event: Event){
    //alert('Transfer!')
    //if online then transfer
    
    /*let codes = []
    this.selection.selected.forEach(obj => {
      codes.push(obj.code)
    })
    
    this.localStorageService.transferLocalStorage(codes, this.stateSelected);
    this.selection.clear();
    
    this.dataSource = new MatTableDataSource(this.localStorageService.getByCenterStorage(this.center));*/

  }

  receive(event: Event) {

    let codes = []
    this.selection.selected.forEach(obj => {
      codes.push(obj.code)
    });

    

    /*let codes = []
    this.selection.selected.forEach(obj => {
      codes.push(obj.code)
    });

    this.localStorageService.acceptLocalStorage(codes, this.stateSelected);
    this.selection.clear();

    this.dataSource = new MatTableDataSource(this.localStorageService.getByCenterStorage(this.center));*/

  }

  changeRatio(event: MatSelectChange) {
    this.stateSelected = event.value;
  }

}