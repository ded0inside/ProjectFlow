import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let loggedUserData: any;
  const localData = localStorage.getItem('tokenData');
  if(localData != null){
    loggedUserData = JSON.parse(localData);
  }

  if (loggedUserData.token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loggedUserData.token}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
};
