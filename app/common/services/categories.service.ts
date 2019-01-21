import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  categories: any[] =  [];
  subCategories: any[] =  [];
  private catsUpdated = new Subject();
  private subCatsUpdated = new Subject();

  constructor(private http: HttpClient) { }

  getCategories() {
    this.http.get<{ posts: any}>('https://bksun.herokuapp.com/api/Categories')
    .subscribe(( transformedPosts) => {
      this.categories = [transformedPosts];
      console.log('service', transformedPosts);
      this.catsUpdated.next([...this.categories]);
    });
  }

  getSubCategories(subcats: any) {
    // console.log('subcats:', subcats);
    this.http.get<{ posts: any}>
    ('https://bksun.herokuapp.com/api/categories/' + subcats + '/subcategories')
    .subscribe(( transformedPosts) => {
      this.subCategories = [transformedPosts];
      console.log('service', transformedPosts);
      this.subCatsUpdated.next([...this.subCategories]);
    });
  }

  getCatsUpdateListener() {
    return this.catsUpdated.asObservable();
  }

  getSubCatsUpdateListener() {
    return this.subCatsUpdated.asObservable();
  }

}
