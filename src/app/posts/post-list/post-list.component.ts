import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
// import { Subscription } from 'rxjs';
// import { post } from 'selenium-webdriver/http';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

   posts: Post[] = [];
  //  private postsSub: Subscription;
  //  private authStatusSub: Subscription;
  //  isAuthenticated = false;
  //  userAuthenticated = false;

  constructor( public postsServ: PostsService, private authServ: AuthServiceService ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.postsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }

  onDelete(postId: string) {
    console.log(postId);
    this.postsServ.deletePost(postId);
  }

}
