import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Book } from '../models/book';
import { booksMock } from '../mocks/books.mock';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  getBooks(searchTerm: string): Observable<Book[]> {
    return timer(500).pipe(
      map(() =>
        booksMock.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    );
  }
}
