import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

interface ResponseServer {
  nitrogen: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = inject(HttpClient); 
  constructor() { }

  postImages(body:FormData){
    return this.http.post<ResponseServer>(environment.backend.url, body);
  }
}
