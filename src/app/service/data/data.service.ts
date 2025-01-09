//https://railway.app/project/35f96c28-a5ee-4b1a-94e5-0de41232c265/service/728bf5aa-7f0b-4dd6-840c-fcfa95fec6b3


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse, ApiResponse2 } from '../../model/interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private _serviceUrl = "http://localhost:5000/api/data";

  private _serviceUrl = "https://web-production-6b75.up.railway.app/api/data";

  private _serviceUrl2= "https://web-production-6b75.up.railway.app/api/data2";


  // private _serviceUrl = "http://10.6.20.89:5000/api/data";

  // private _serviceUrl2= "http://10.6.20.89:5000/api/data2";
  private jsonUrl = 'assets/model/data.json';
  private jsonUrletiket = 'assets/model/etiket.json';




  // private apiUrl = 'https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/GKD/DataTablesList';
  // private apiUrl = '/api';
  constructor(private http: HttpClient) { }


  // getData(): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'cookie': 'Dil479=1; __RequestVerificationToken=xs1acMR4IIcy9jjjBAerrso9Z4GZTpjQ-kIEVvxN_5TEwzN6aw8rjl73xAgTFtM61mnwlelN6V1KBs9DZO9axgHhzZM1; TS01fe2271=016f66f15eef6d4df18587cdc84957fef82236c1cfe3f5ba122b0e7853b120e45993d81e3b1167470e9a0cf9cfb0b50f847d4c6d76801fb0e0e815cecaf986102d6f3cf87c16515f6f50ccd614fbc74d7312f3bfb3; Dil479=1; TS01fe2271=016f66f15e94bd99c98a769beff314cdd3270f0187e8e7a018c6d81315c2326983eaab890cd42dbd656b175449b536876b868a1e1167ab958e5d6c3b35e01eb21b0d5a6580',
  //     // 'Referer': 'https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/gkd/SagligiTehlikeyeDusurecek?siteYayinDurumu=True',
  //     'Cache-Control': 'no-cache',
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      

  //     'Access-Control-Allow-Origin':' *',
  //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  //   });

  //   const body = "draw=1&columns%5B0%5D%5Bdata%5D=DuyuruTarihi&columns%5B0%5D%5Bname%5D=DuyuruTarihi&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=FirmaAdi&columns%5B1%5D%5Bname%5D=FirmaAdi&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=Marka&columns%5B2%5D%5Bname%5D=Marka&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=UrunAdi&columns%5B3%5D%5Bname%5D=UrunAdi&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=Uygunsuzluk&columns%5B4%5D%5Bname%5D=Uygunsuzluk&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=PartiSeriNo&columns%5B5%5D%5Bname%5D=PartiSeriNo&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=FirmaIlce&columns%5B6%5D%5Bname%5D=FirmaIlce&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=FirmaIl&columns%5B7%5D%5Bname%5D=FirmaIl&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=UrunGrupAdi&columns%5B8%5D%5Bname%5D=UrunGrupAdi&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=desc&start=0&length=200&search%5Bvalue%5D=&search%5Bregex%5D=false&KamuoyuDuyuruAra.IdariYaptirimYasalDayanakIdler=2%2C20&KamuoyuDuyuruAra.IdariYaptirimYasalDayanakId=&SiteYayinDurumu=True&KamuoyuDuyuruAra.DuyuruTarihi=&_KamuoyuDuyuruAra_UrunGrupId=&KamuoyuDuyuruAra.UrunGrupId=&Order%5B0%5D%5Bcolumn%5D=DuyuruTarihi&Order%5B0%5D%5Bdir%5D=desc";

  //   return this.http.post<any>(this.apiUrl, body, { headers });
  // }


  sendPostRequest(): Observable<ApiResponse> {
    console.log('Sending request to:', this._serviceUrl);
    return this.http.get<ApiResponse>(this._serviceUrl).pipe(
      catchError(this.handleError)
    ).pipe(tap((response: any) => console.log('Response:', response)));
  }


  sendPostRequest2(): Observable<ApiResponse2[]> {
    console.log('Sending request to:', this._serviceUrl2);
    return this.http.get<ApiResponse2[]>(this._serviceUrl2).pipe(
      catchError(this.handleError),
      tap((response: any) => console.log('Response:', response))
    );
  }
  

  private handleError(error: any) {
    console.error('An error occurred', error); 
    return throwError(() => new Error(`Error Code: ${error.status}\nMessage: ${error.message}`));
}
  url(url: any, payload: string, arg2: { headers: HttpHeaders; }) {
    throw new Error('Method not implemented.');
  }



  getFoodLabelData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getFoodEtiketData(): Observable<any> {
    return this.http.get<any>(this.jsonUrletiket);
  }


}
