import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';


import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-subpost',
  templateUrl: './subpost.component.html',
  styleUrls: ['./subpost.component.css']
})
export class SubpostComponent implements OnInit {

  constructor(public postsServ: PostsService) { }

  ngOnInit() {
  }

  onAddSubPost( form: NgForm) {

    if (form.invalid) {
      return;
    }

      this.postsServ.addSubPost(form.value.title, form.value.sub, form.value.content);
      form.resetForm();
    }

}
