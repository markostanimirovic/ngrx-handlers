import { combineHandlers, plain, withPayload } from 'ngrx-handlers';
import { booksInitState } from '../books.state';
import { Book } from '../book.model';

export const [booksPageActions, booksPageReducer] = combineHandlers(booksInitState, 'booksPage', {
  enter: state => ({ ...state, searchTerm: '', loading: true }),
  search: (state, { searchTerm }: { searchTerm: string }) => ({
    ...state,
    searchTerm,
    loading: true,
  }),
  showCreateBookDialog: plain(),
  createBook: withPayload<{ book: Book }>(),
});
