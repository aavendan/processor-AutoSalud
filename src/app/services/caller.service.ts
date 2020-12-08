import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CallerService {

  URL_READ: string = 'http://3.22.195.65:5000/api/integracion/table/read';
  URL_INSERT: string = 'http://3.22.195.65:5000/api/integracion/table/insert';
  URL_UPDATE: string = 'http://3.22.195.65:5000/api/integracion/table/update';
  URL_DELETE: string = 'http://3.22.195.65:5000/api/integracion/table/delete';

  httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type':  "text/plain"
      })
    };

  valuesResults = [-1,0,1,2]
  textResults = ["Sin Especificar", "Negativo", "Positivo", "No Concluyente"]


  constructor(private http: HttpClient) { }

  public async login(user: string, password: string) {
    let body = {"tabla" : "integracion_claves_labolatorista",
      "operador": "and",
      "columnas" : ["nombre"],
      "condiciones" : [
        {
          "columna" : "user",
          "comparador" : "==",
          "valor" : user
        },
        {
          "columna" : "pass",
          "comparador" : "==",
          "valor" : password
        }
        ]
      }
    let result:any = await this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions).toPromise();

    return result;
  }

  public async getAllNewTest(codeLab: string) {

    const currentSampleList = []

    let body = {
        "tabla" : "integracion_pruebas",
            "operador": "and",
                "columnas" : ["muestra_id", "cedula","referencia"],
                    "condiciones" : [
                        {
                            "columna": "lab_id",
                            "comparador": "==",
                            "valor": "001"
                        },{
                          "columna": "estado",
                          "comparador": "==",
                          "valor": "0"
                        }
                    ]
    }

    let result:any = await this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions).toPromise();

    if(result.data.length > 0) {

      result.data.forEach(test => {

        currentSampleList.push({
          code:test.muestra_id,
          cardid: test.cedula,
          reference: test.referencia
        })
      })

    }

    return currentSampleList;

  }

  public async getAllAcceptedTest(codeLab: string) {

    const currentSampleList = []

    let body = {
    "tabla" : "integracion_pruebas",
        "operador": "and",
            "columnas" : ["muestra_id", "cedula","referencia","resultado","recomendacion"],
                "condiciones" : [
                    {
                        "columna": "lab_id",
                        "comparador": "==",
                        "valor": "001"
                    }
                ]
    }

    let result:any = await this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions).toPromise();
      
    if(result.data.length > 0) {

      result.data.forEach(test => {

        currentSampleList.push({
          code:test.muestra_id,
          cardid: test.cedula,
          reference: test.referencia,
          result: this.textResults[this.valuesResults.indexOf(test.resultado)]
        })
      })

    }

    return currentSampleList;

  }

  public getTest(testCode: string) : Observable<ArrayBuffer> {
    let body = {"tabla" : "integracion_pruebas",
      "operador": "and",
      "condiciones" : [
        {
          "columna" : "muestra_id",
          "comparador" : "==",
          "valor" : testCode
        }
      ]
    }

    return this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions);

  }


  public async saveResultTest(testCode: string, result: string, suggestions: string) {
    let body = {"tabla" : "integracion_pruebas",
      "operador": "and",
      "valores": {
          "resultado": result,
          "recomendacion":suggestions
      },
      "condiciones" : [
        {
          "columna" : "muestra_id",
          "comparador" : "==",
          "valor" : testCode
        }
      ]
    }

    return await this.http.post(
      this.URL_UPDATE,
      JSON.stringify(body),
      this.httpOptions).toPromise();

  }

  public async acceptTest(codes: Array<string>, accepted: boolean) {
    codes.forEach(code => {

      let body3 = {"tabla": "integracion_pruebas",
        "operador": "and",
        "valores": {
          "estado": 1
        },
        "condiciones": [
          {
            "columna": "muestra_id",
            "comparador": "==",
            "valor": code
          }
        ]
      }

      //to continue...

    })
  }

}