import { combineHandlers, plain, withPayload } from './handlers';

describe('handlers', () => {
  describe('combineHandlers', () => {
    it('should create actions', () => {
      const { actions } = combineHandlers({}, 'books', {
        fetchBooks: state => ({ ...state, books: [] }),
        fetchBooksSuccess: (state, { books }: { books: string[] }) => ({ ...state, books }),
        createBook: withPayload<{ book: string }>(),
        showCreateBookDialog: plain(),
      });

      const fetchBooks = actions.fetchBooks();
      expect(fetchBooks).toEqual({ type: '[Books] Fetch Books' });

      const fetchBooksSuccess = actions.fetchBooksSuccess({ books: ['B1'] });
      expect(fetchBooksSuccess).toEqual({ type: '[Books] Fetch Books Success', books: ['B1'] });

      const createBook = actions.createBook({ book: 'B1' });
      expect(createBook).toEqual({ type: '[Books] Create Book', book: 'B1' });

      const showCreateBookDialog = actions.showCreateBookDialog();
      expect(showCreateBookDialog).toEqual({ type: '[Books] Show Create Book Dialog' });
    });

    it('should create a reducer', () => {
      const initialState = { books: ['B1', 'B2', 'B3'] };
      const { actions, reducer } = combineHandlers(initialState, 'books', {
        fetchBooks: state => ({ ...state, books: [] }),
        fetchBooksSuccess: (state, { books }: { books: string[] }) => ({ ...state, books }),
      });

      const state1 = reducer(undefined, { type: 'unknown' });
      expect(state1).toEqual(initialState);

      const state2 = reducer(initialState, { type: 'unknown' });
      expect(state2).toEqual(initialState);

      const state3 = reducer(undefined, actions.fetchBooks());
      expect(state3).toEqual({ ...initialState, books: [] });

      const state4 = reducer(initialState, actions.fetchBooksSuccess({ books: ['B4'] }));
      expect(state4).toEqual({ ...initialState, books: ['B4'] });

      const state5 = reducer(initialState, { type: '[Unknown] Fetch Books' });
      expect(state5).toEqual(initialState);

      const state6 = reducer(initialState, { type: '[Books] Unknown' });
      expect(state6).toEqual(initialState);
    });
  });

  describe('plain', () => {
    it('should return a plain reducer', () => {
      const reducer = plain();

      const state1 = reducer(undefined);
      expect(state1).toEqual(undefined);

      const state2 = reducer({});
      expect(state2).toEqual({});
    });
  });

  describe('withPayload', () => {
    it('should return a plain reducer', () => {
      const reducer = withPayload<{ book: string }>();

      const state1 = reducer(undefined, { book: 'B1' });
      expect(state1).toEqual(undefined);

      const state2 = reducer({}, { book: 'B2' });
      expect(state2).toEqual({});
    });
  });
});
