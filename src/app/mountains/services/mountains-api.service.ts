import { Observable, map, of } from "rxjs";
import { Mountain } from "../models/mountain-model";
import { Host, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class MountainsApiService {
  private baseApiURL = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) {

  }
  getMountain(id: number): Observable<Mountain> {
    return this.http
    .get<Mountain>(this.baseApiURL + 'MountainsCrown' + '/' + id)
    .pipe(
      map(response => {
        return response;
      })
    )
  }

  getAllMountainsCrown(): Observable<Mountain[]> {
    return this.http
    .get<{
       pageIndex: number,
       pageSize: number,
       count: number, 
       data:Mountain[] }>
       (this.baseApiURL +'MountainsCrown')
    .pipe(
      map(response => {
        return response.data;
      })
    )
  }
  updateMountain(mountain: Mountain): Observable<any> {
    return this.http.post(this.baseApiURL + 'MountainsCrown/update', mountain)
  }

}