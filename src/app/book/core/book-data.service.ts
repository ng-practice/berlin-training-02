import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Book } from '../models/book';
import { catchError, map } from 'rxjs/operators';

import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class BookDataService {
  endpoint = 'http://localhost:4730';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}/books`);
  }

  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.endpoint}/books/${isbn}`)
      .pipe(
        map(book => {
          book.title = book.title + ' MAPPED';
          return book;
        }),
        catchError(err => {
          return _throw({
            message: `Book ${isbn} could not be loaded`
          });
        })
      );
  }

  create(book: Book) {
    return this.http.post(`${this.endpoint}/books`, book);
  }
}
