import { HttpInterceptorFn } from '@angular/common/http';

// Placeholder for future API integration
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Add authorization header when calling backend APIs
  // const sessionStore = inject(SessionStore);
  // const session = sessionStore.session();
  //
  // if (session?.access_token) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${session.access_token}`,
  //     },
  //   });
  // }

  return next(req);
};
