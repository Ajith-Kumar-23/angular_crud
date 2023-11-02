import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401 || error.status == 403) {
          localStorage.clear();
          localStorage.setItem("locale", "en");
          this.route.navigate(['/auth/login']);
        }
        return throwError(error);
      })
    );
  }

}
