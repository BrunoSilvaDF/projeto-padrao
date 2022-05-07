import { BehaviorSubject } from 'rxjs'

import api from '../data/api'
import { User } from '../domain/types'

const user$ = new BehaviorSubject<User | undefined>(undefined)

user$.subscribe(user => {
  if (user) {
    api.interceptors.request.use(req => {
      req.headers!['x-access-token'] = user.accessToken
      return req
    })
  } else {
    api.interceptors.request.eject(0)
  }
})

export { user$ }
