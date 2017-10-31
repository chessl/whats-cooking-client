import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export class Credentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

@Injectable()
export class AuthProvider {
  user: User;
  constructor(public http: Http) {}

  public login(creds: Credentials): Observable<boolean> {
    if (creds.email === null || creds.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        const access = (creds.password === 'pass' && creds.email === 'email');
        observer.next(access);
        observer.complete();
      })
    }
  }

  public register(creds: Credentials): Observable<boolean> {
    if (creds.email === null || creds.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      })
    }
  }

  public getUserInfo(): User {
    return this.user;
  }

  public logout(): Observable<boolean> {
    return Observable.create(observer => {
      this.user = null;
      observer.next(true);
      observer.complete();
    })
  }
}
