import { Injectable } from '@angular/core'
import { Resolve, Router, ActivatedRouteSnapshot, RouterState } from '@angular/router'

import { Author, CoursesService } from '../../index'

@Injectable()
export class AuthorsResolverService implements Resolve<Author[]> {

  constructor(private courseSrv: CoursesService, router: Router) { }

  resolve(aRoute: ActivatedRouteSnapshot): Promise<Author[]> {
      let id = +aRoute.params['id']
      return this.courseSrv.getAuthors().toPromise().then(authors => {
          if(authors) {
              return authors
          } else {
              return null
          }
      })
  }

}
