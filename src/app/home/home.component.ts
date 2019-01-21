import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../common/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  categories: any[] =  [];
  subCategories: any[] =  [];
  catsSub: Subscription;
  subCatsSub: Subscription;

  constructor( private catserv: CategoriesService) { }


  ngOnInit() {
    this.catserv.getCategories();
    this.catsSub = this.catserv.getCatsUpdateListener()
    .subscribe((cats) => {
        this.categories = [cats[0]];
        console.log('home', this.categories[0]);
    });

    this.catserv.getSubCategories(1);
    this.catsSub = this.catserv.getSubCatsUpdateListener()
    .subscribe((cats) => {
        this.subCategories = [cats[0]];
        console.log('sub home', this.subCategories[0]);
    });
  }

  ngOnDestroy() {
    this.catsSub.unsubscribe();
    this.subCatsSub.unsubscribe();
  }

  indexChange(evt: any) {
    console.log('index change..', evt + 1);
    this.catserv.getSubCategories(evt + 1);
    this.catsSub = this.catserv.getSubCatsUpdateListener()
    .subscribe((cats) => {
        this.subCategories = [cats[0]];
        console.log('sub home', this.subCategories[0]);
    });

  }

}
