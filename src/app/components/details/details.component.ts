import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  title;
  body;
  commentBody;
  commentBodyFiltered;
  errorMessageSection = '';
  errorMessageSearchNotFound = '';
  renderedView = false;
  availability = false;
  inputSearch = false;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.initDetails(params);
      }
    );
  }

  initDetails(params) {
    const ID = params.id;
    this.postService.getPostByID(ID).subscribe(
      res => {
        const {title, body, id} = res;
        this.title = title;
        this.body = body;
        this.renderedView = true;
        this.initComment(id);
      }
    );
  }

  initComment(id) {
    if (id === 1) {
      this.postService.getPostWithComment(id).subscribe(
        res => {
          if (res) {
            this.availability = res ? true : false;
            this.commentBody = res ? res : null;
            this.commentBodyFiltered = res ? res : null;
          }
        }
      );
    }
    this.inputSearch = true;
    this.errorMessageSection = 'No comment found!';
  }

  applyFilter(filterValue: string) {
    this.errorMessageSearchNotFound = '';
    if (this.commentBody) {
      this.commentBodyFiltered = this.commentBody.filter(
        item => item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.body.toLowerCase().includes(filterValue.toLowerCase())
      );
      if (this.commentBodyFiltered.length === 0) {
        this.errorMessageSearchNotFound = 'No comment found!';
      }
    } else {
      this.commentBodyFiltered = this.commentBody;
      this.availability = true;
    }
  }
}

