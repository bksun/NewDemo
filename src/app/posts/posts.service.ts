import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

private  posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

  constructor( public http: HttpClient) { }

  addSubPost( title: string, sub: number, content: string) {
    const subpost = { name: title, categoryId: sub, description: content};
    console.log('subposts', subpost, sub)
    this.http.post<{message: string, createdId: string}>('https://bksun.herokuapp.com/api/Categories/'+ sub + '/subcategories', subpost)
    .subscribe((postData ) => {
      console.log( 'response : ', postData);
      //post.id = postData.createdId;
      //this.posts.push(post);
   //   this.postsUpdated.next([...this.posts]);
    });
  }

  addPost( title: string, content: string) {
    const post: Post = { id: null, name: title, description: content};
    this.http.post<{message: string, createdId: string}>('https://bksun.herokuapp.com/api/categories/', post)
    .subscribe((postData ) => {
      console.log(postData);
      post.id = postData.createdId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + postId)
    .subscribe( ( message) => {
      this.posts = this.posts.filter( post => post.id !== postId);
      this.postsUpdated.next([...this.posts]);
    });
  }

}
