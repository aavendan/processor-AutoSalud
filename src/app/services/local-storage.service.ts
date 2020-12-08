import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { MuestrasInterface, MUESTRAS } from '../data/muestras';

// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'local_samples';

@Injectable()
export class LocalStorageService {

  samplesList = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { 
    
      this.storage.set(STORAGE_KEY, MUESTRAS);

  }


  public storeOnLocalStorage(code: string, cardid: string, reference: string, date: string): void {
      
      // get array of tasks from local storage
      const currentSampleList = this.storage.get(STORAGE_KEY) || [];
      // push new task to array
      currentSampleList.push({
          code: code,
          cardid: cardid,
          reference: reference,
          date: date
      });
      // insert updated array to local storage
      this.storage.set(STORAGE_KEY, currentSampleList);
      
  }

  public updateOnLocalStorage(oldcode: string, newcode: string, cardid: string, reference: string, date: string) : void {
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];

    //let idx = currentSampleList.findIndex(obj => obj.code == oldcode) || -1;

    let idx = findIndexInArray(currentSampleList, oldcode)

    if (idx != -1) {
      currentSampleList[idx] = {
          code: newcode,
          cardid: cardid,
          reference: reference,
          date: currentSampleList[idx].date,
          updatedate: date
      }

      this.storage.set(STORAGE_KEY, currentSampleList);
    }
    
  }

  public deleteOnLocalStorage(code: string) : void {
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];

    //let idx = currentSampleList.findIndex(obj => obj.code == code) || -1;
    let idx = findIndexInArray(currentSampleList, code)

    if (idx != -1) {
      currentSampleList.splice(idx,1)
      this.storage.set(STORAGE_KEY, currentSampleList);
    }
  }

  public getAllLocalStorage() : any {
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];
    
    let newSampleList = currentSampleList.filter(function(obj) {

      //only mines
      return obj.transfered? obj:null;
    });

    return newSampleList;
  }

  public resetLocalStorage() : void {
    this.storage.set(STORAGE_KEY, []);
  }  

  public getOnLocalStorage(code: string) : object {
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];
    return currentSampleList.find(obj => obj.code == code);
  }

  public transferLocalStorage(codes: Array<string>, crm: string) :void {
    
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];

    currentSampleList.forEach(obj => {
      if(codes.includes(obj.code)){
        obj.transfered = crm;
      }
    })

    //console.log(currentSampleList)

    this.storage.set(STORAGE_KEY, currentSampleList);

  }

  public getByCenterStorage(center: string) : any {
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];
    
    let newSampleList = currentSampleList.filter(function(obj) {
      return obj.transfered == center && obj.accepted == null? obj:null;
    });

    return newSampleList;
  }

  public getAcceptedByCenterStorage(center: string) : any {
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];

    let newSampleList = currentSampleList.filter(function(obj) {
      return obj.transfered == center && obj.accepted? obj:null;
    });

    return newSampleList;
  }

  public acceptLocalStorage(codes: Array<string>, accepted: boolean) : void {

    const currentSampleList = this.storage.get(STORAGE_KEY) || [];

    currentSampleList.forEach(obj => {
      if(codes.includes(obj.code)){
        obj.accepted = accepted;
      }
    })

    //console.log(currentSampleList)

    this.storage.set(STORAGE_KEY, currentSampleList);

  }

  public setResultLocalStorage(code: string, result: boolean): any {
    const currentSampleList = this.storage.get(STORAGE_KEY) || [];

    //let idx = currentSampleList.findIndex(obj => obj.code == oldcode) || -1;

    let idx = findIndexInArray(currentSampleList, code)

    if (idx != -1) {
      
      currentSampleList[idx].result = result
      //console.log("here ",currentSampleList[idx])

      this.storage.set(STORAGE_KEY, currentSampleList);
    }
  }

}

/*function findInArray(ar, val) {
    for (var i = 0,len = ar.length; i < len; i++) {
        if ( ar[i].code === val ) { // strict equality test
            return ar[i];
        }
    }
    return null;
}*/

function findIndexInArray(ar, val) {
    for (var i = 0,len = ar.length; i < len; i++) {
        if ( ar[i].code === val ) { // strict equality test
            return i;
        }
    }
    return -1;
}