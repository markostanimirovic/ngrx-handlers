import { combineHandlers, plain, withPayload } from 'ngrx-handlers';
import { booksInitState } from '../books.state';
import { Book } from '../book.model';

export const [booksPageActions, booksPageReducer] = combineHandlers(booksInitState, 'booksPage', {
  updateSearchTerm: (state, { searchTerm }: { searchTerm: string }) => ({ ...state, searchTerm }),
  showCreateBookDialog: plain(),
  createBook: withPayload<{ book: Book }>(),
});
