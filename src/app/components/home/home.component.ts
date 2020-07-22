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

  constructor(
    private postService: PostsService,
    private router: Router ) {}

  ngOnInit() {
    this.postService.getPostAll().subscribe(
      res => {
        this.allPost = res;
      }
    );
  }

  postDetails(event) {
    this.router.navigate([`/details/${event.id}`]);
  }
}
