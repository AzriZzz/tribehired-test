import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  basePath = 'https://jsonplaceholder.typicode.com';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Get All
  getPostAll(): Observable<Posts> {
    return this.http.get<Posts>(this.basePath + '/posts');
  }

  // Get Single Posts data by ID
  getPostByID(id): Observable<Posts> {
    return this.http.get<Posts>(this.basePath + '/posts/' + id);
  }

  // Get Single Post Comment by ID equal to 1
  getPostWithComment(id): Observable<Posts> {
    return this.http.get<Posts>(this.basePath + '/comments?postId=' + id);
  }
}
