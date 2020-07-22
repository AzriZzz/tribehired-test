import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css']
})
export class HomeComponent implements OnInit {
  title = 'TribeHired Test';
  allPost;

  renderView = false;
  p = 1;
  collection;
  constructor(
    private postService: PostsService,
    private router: Router ) {}

  ngOnInit() {
    this.postService.getPostAll().subscribe(
      res => {
        this.renderView = true;
        this.allPost = res;
        this.collection = res;
        console.log(this.collection);
      }
    );
  }

  postDetails(event) {
    this.router.navigate([`/details/${event.id}`]);
  }
}
