import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(
    private http: HttpClient,
  ) { }

  getStudents(data: { search_text: string | null; limit: number | null; offset: number | null; include_inactive: boolean | null }) {
    return this.http.post(environment.apiUrl + 'getStudents',
      data,
      { headers: this.headers })
  }

  saveStudent(data: any) {
    return this.http.post<{ message: string }>(environment.apiUrl + 'saveStudent',
      data,
      { headers: this.headers })
  }

  deleteStudent(data: any) {
    return this.http.post<{ message: string }>(environment.apiUrl + 'deleteStudent',
      data,
      { headers: this.headers })
  }
}
