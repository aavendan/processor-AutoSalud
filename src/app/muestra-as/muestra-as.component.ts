import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import { LocalStorageService } from '../services/local-storage.service';
import {CallerService} from '../services/caller.service';

import { MatDialog } from '@angular/material/dialog';
import { MessageAsComponent } from '../message-as/message-as.component';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-muestra-as',
  templateUrl: './muestra-as.component.html',
  styleUrls: ['./muestra-as.component.css'],
  providers: [DatePipe]
})
export class MuestraAsComponent implements OnInit {

  isDelete;
  btnDelete = false;
  sample; 
  code;

  formGroup: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  
  post: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private localStorageService: LocalStorageService,
    private datePipe: DatePipe,
    private _location: Location,
    private callerService: CallerService,
    private dialog: MatDialog) { }

    ngOnInit() {

    this.sample = {'code':null, 'cardid':null, 'reference':null, 'suggestions': null};

    this.route.paramMap.subscribe(params => {
      
      this.code = params.get('code') || null;
      this.isDelete = params.get('action') == 'show';

      //edit
      //if(code) {
        //this.muestra = MUESTRAS.find(obj => obj.code == params.get('code'));
        //this.sample = this.localStorageService.getOnLocalStorage(code)
        //updateTest(code)
        
      //}

      this.createForm();
    });
    
    
  }

  /*async updateTets(code: string) {
    let test:any = await this.callerService.getTest(code);

    this.sample = {
      'code':test.data[0].muestra_id, 
      'cardid':test.data[0].cedula, 
      'reference':test.data[0].referencia} 
  }*/

  createForm() {

    this.formGroup = this.formBuilder.group({
      'code': [this.sample.code, Validators.required],
      'cardid': [this.sample.cardid, Validators.required],
      'reference': [this.sample.reference, Validators.required],
      'result': [this.sample.result, Validators.required],
      'suggestions': [this.sample.suggestions, Validators.required]
    }, {
      validator: this.formValidator
    });

    this.callerService.getTest(this.code).subscribe(
      (result:any) => {
        let test = result.data[0];
        
        
        this.formGroup.setValue({
          'code': test.muestra_id,
          'cardid':test.cedula,
          'reference':test.referencia,
          'result':test.resultado.toString(),
          'suggestions': test.recomendacion
        });

      }
    )
    
  }

  formValidator(form: FormGroup) {
    
    let condition = String(form.get('cardid').value).length != 10;
    return condition ? { CardID:true} : null;
  }

  async onSubmit(post) {

    let result:any = await this.callerService.saveResultTest(post.code, post.result, post.suggestions)

    if(result.data.rows_updated) {
      
      this.dialog.open(MessageAsComponent, {
          width: '400px',
          data: {title: 'AutoSalud', text: 'Muestra guardada correctamente'}
        });
      
      this.router.navigate(['main']);
    } else {

      this.dialog.open(MessageAsComponent, {
          width: '400px',
          data: {title: 'AutoSalud', text: 'Ocurrió un error en el servidor'}
        });
      
      this.router.navigate(['main']);
    }

    
    /*this.route.paramMap.subscribe(params => {

      let myDate = new Date();
      let myDateString:string = this.datePipe.transform(myDate, 'dd/MM/yyyy');

      let code = params.get('code') || null;

      //edit or delete
      if(code) {

        //console.log("editing")

        this.localStorageService.setResultLocalStorage(post.code, post.result);
        
      }
      this.router.navigate(['main']);

    });*/
    
  }

  save(): void {
    this.btnDelete = false;
  }

  delete(): void {
    this.btnDelete = true;
  }

  back(): void {
    this._location.back();
  }

}
