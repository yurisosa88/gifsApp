import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifs, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'qmVoGqjYYBv33HcFIiHLGyHLOcmU2Cqs';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _listadoDeBusqueda: string[] = []; 
  public result: Gif[] = [];

  get listadoDeBusqueda() {
    return [...this._listadoDeBusqueda];
  }

  constructor(private http: HttpClient) {
    this._listadoDeBusqueda = JSON.parse(localStorage.getItem('historial')!) || [];
    this.result = JSON.parse(localStorage.getItem('result')!) || [];

    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }

  }

  buscarGifs(query: string  ) {
    query = query.trim().toLowerCase();

    if(!this._listadoDeBusqueda.includes( query )) {
      this._listadoDeBusqueda.unshift(query);
      this._listadoDeBusqueda = this._listadoDeBusqueda.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._listadoDeBusqueda));

    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    this.http.get<SearchGifs>(`${ this.servicioUrl }/search`, { params })
    .subscribe(
      (resp) => {
        this.result = resp.data;
        localStorage.setItem('result', JSON.stringify( this.result ))
      }
    )

  }

  // async buscarGifs(query: string  ) {
  //   query = query.trim().toLowerCase();

  //   if(!this._listadoDeBusqueda.includes( query )) {
  //     this._listadoDeBusqueda.unshift(query);
  //     this._listadoDeBusqueda = this._listadoDeBusqueda.splice(0, 10);
  //   }

  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=qmVoGqjYYBv33HcFIiHLGyHLOcmU2Cqs&q=dragon ball z&limit=10');
  //   const data = await resp.json();
  //   console.log(data);
  // }

}
