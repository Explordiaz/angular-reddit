import { Component, OnInit } from '@angular/core';
import { config } from './app.config';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

export interface Article {
  id?: string;
  title: string;
  link: string;
  votes: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  articles: AngularFirestoreCollection<Article>;
  article$: Observable<Article[]>;

  constructor(private db: AngularFirestore) {
    this.articles = this.db.collection(config.collection_endpoint)
    this.article$ = this.articles
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Article;
          const id = a.payload.doc.id;
          return { id, ...data };
        }).sort((a: Article, b: Article) => b.votes - a.votes);
      });
  }

  ngOnInit() {
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    if (!link.value.startsWith("http")) {
      link.value = "http://" + link.value;
    }
    this.articles.add({ title: title.value, link: link.value, votes: 0 });
    title.value = '';
    link.value = '';
    return false;
  }

  upVoteArticle(article: Article) {
    this.articles.doc(article.id).update({ votes: article.votes++ });
  }

  downVoteArticle(article: Article) {
    this.articles.doc(article.id).update({ votes: article.votes-- });
  }
}
