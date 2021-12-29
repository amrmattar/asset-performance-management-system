import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import { Observable } from "rxjs";
  import { tap } from "rxjs/operators";
  import { Router } from "@angular/router";
  @Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router) {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (localStorage.getItem("userToken") != null) {
        const ClonedReq = req.clone({
          headers: req.headers.set(
            "Authorization",
            "Bearer " + localStorage.getItem("userToken")
          ),
        });
        return next.handle(ClonedReq).pipe(
          tap(
            (succ) => {},
            (err) => {
              if (err.status == 401) {
                localStorage.removeItem("userToken");
                this.router.navigateByUrl("/login");
              } else if (err.status == 403)
                this.router.navigateByUrl("/forbidden");
            }
          )
        );
      } else return next.handle(req.clone());
    }
}
