import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Voivodeship } from "../models/voivodeship-model";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class VoivodeshipApiService {
    private baseApiURL = 'https://localhost:5001/api/MountainsCrown/voivodeships';
    constructor(private http: HttpClient) {
    }

    getVoivodeships(): Observable<Voivodeship[]> {
        return this.http
        .get<Voivodeship[]>(this.baseApiURL)
        .pipe(
          map(response => {
            return response;
          })
        )
      }
    
    getVoivodeship(id: number): Observable<Voivodeship> {
      return this.http
      .get<Voivodeship>(this.baseApiURL + '/' + id)
      .pipe(
        map(response => {
          return response
        })
      )
    }
}