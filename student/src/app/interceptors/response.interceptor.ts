import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpInterceptor, HTTP_INTERCEPTORS, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { DataService } from '../data.service';

@Injectable()
export class AppResponseInterceptor implements HttpInterceptor {
  constructor(
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // next.handle(req).forEach()
    let ret = next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {

          if (event instanceof HttpResponse) {
            if (event.headers) {
              let headers: HttpHeaders = event.headers;
              if (headers.get('x-token')) {
                let newToken = JSON.stringify(headers.get('x-token'));
                localStorage.setItem("authorizationData", newToken);
              }
            }

            if (event.headers.get('Content-Type') && event.headers.get('Content-Type') === 'application/json') {
              // let data = JSON.parse(event.body.toString());
              let data = event.body;
              if (data && data.message) {
                // this.snackBar.open(data.message, null, { duration: 3000 });
              }
            }
            // do stuff with response if you want
          }
          return event;
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              let message = "Unknown Server Error. Please Login again.";

              if (typeof err.error === "string")
                message = err.error;


              // JWT expired, go to login
              return throwError(err); // Observable.throw(err);
            }

            if (err.status < 200 || err.status > 299) {
              // console.log("Server Responded Error");
              return throwError(err); // Observable.throw(err);
            }
          }

          return throwError(err); // Observable.throw(err);
        })
      );

    return ret;
  }
}

export const appResponseInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppResponseInterceptor,
  multi: true
};
