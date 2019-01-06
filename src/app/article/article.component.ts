import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../app.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() article: Article;
  @Output() upVoteClicked = new EventEmitter<Article>();
  @Output() downVoteClicked = new EventEmitter<Article>();

  constructor() {

  }

  voteUp(): boolean {
    // this.article.votes ++;
    this.upVoteClicked.emit(this.article);
    return false;
  }

  voteDown(): boolean {
    // this.article.votes --;
    this.downVoteClicked.emit(this.article);
    return false;
  }

  ngOnInit() {
  }

}
