import { Injectable } from '@angular/core'
import { Resolve, Router, ActivatedRouteSnapshot, RouterState } from '@angular/router'

import { CourseItem, CoursesService } from '../common/index'

@Injectable()
export class DetailsResolverService implements Resolve<CourseItem> {

  constructor(private courseSrv: CoursesService, router: Router) { }

  resolve(aRoute: ActivatedRouteSnapshot): Promise<CourseItem> {
      let id = +aRoute.params['id']
      return this.courseSrv.getCourse(id).toPromise().then(course => {
          if(course) {
              return course
          } else {
              return null
          }
      })
  }

}
