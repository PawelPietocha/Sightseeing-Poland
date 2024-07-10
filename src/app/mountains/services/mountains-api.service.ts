import { Observable, map, of } from "rxjs";
import { Mountain } from "../models/mountain-model";
import { Host, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MountainVisited } from "../models/mountain-visited-model";

@Injectable({
  providedIn: 'root',
})
export class MountainsApiService {
  private baseApiURL = 'https://localhost:5001/api/';
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
  updateMountain(mountainVisited: MountainVisited): Observable<any> {
    return this.http.post(this.baseApiURL + 'MountainsCrown/update', mountainVisited)
  }

  deleteMountainFromVisited(mountainVisited: MountainVisited): Observable<any> {
    return this.http.delete(this.baseApiURL + 'MountainsCrown/delete', {body: mountainVisited})
  }

  markMountainAsVisited(mountainVisited: MountainVisited): Observable<Mountain> {
    return this.http.post<Mountain>(this.baseApiURL + 'MountainsCrown/markAsVisited', mountainVisited)
  }

  getVisitedMountainCrown(userId: string): Observable<MountainVisited[]> {
    return this.http
    .get<MountainVisited[]>(this.baseApiURL + 'MountainsCrown/getVisitedMountainsCrown/' + userId)
    .pipe(
      map(response => {
        return response
      })
    )
  }

}