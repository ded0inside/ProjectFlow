import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let loggedUserData: any;
  const localData = localStorage.getItem('tokenData');
  if(localData != null){
    loggedUserData = JSON.parse(localData);
    if (loggedUserData.access_token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedUserData.access_token}`
        }
      });
      return next(clonedRequest);
    }
  }

  return next(req);
};
