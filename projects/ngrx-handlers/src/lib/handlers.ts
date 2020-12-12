import { Action, ActionReducer, createAction, props } from '@ngrx/store';
import { ActionMap, CaseReducer, HandlerMap, PlainCaseReducer } from './models';

/**
 * Generates a map of action creators and reducer function based on the initial state, source and handler map.
 *
 * @param initialState An initial state of the reducer function.
 * @param source A source of the actions creators.
 * @param handlers A map where the keys are action events and the values are case reducers.
 * @returns A tuple of action creator map and the reducer function.
 *
 * @example
 * // movies.state.ts
 * interface MoviesState {
 *   movies: Movie[];
 *   selectedMovieId: number | null;
 *   searchTerm: string;
 *   loading: boolean;
 * }
 *
 * const initMoviesState: MoviesState = {
 *   movies: [],
 *   selectedMovieId: null,
 *   searchTerm: '',
 *   loading: false,
 * };
 *
 * // movies-page.handlers.ts
 * const [moviesPageActions, moviesPageReducer] = combineHandlers(initMoviesState, 'moviesPage', {
 *   updateSelectedMovieId: (state, { selectedMovieId }: { selectedMovieId: number }) => ({
 *     ...state,
 *     selectedMovieId,
 *   }),
 *   updateSearchTerm: (state, { searchTerm }: { searchTerm: string }) => ({
 *     ...state,
 *     searchTerm,
 *   }),
 * });
 *
 * // movies-effects.handlers.ts
 * const [moviesEffectsActions, moviesEffectsReducer] = combineHandlers(
 *   initMoviesState,
 *   'moviesEffects',
 *   {
 *     fetchMovies: state => ({ ...state, loading: true }),
 *     fetchMoviesSuccess: (state, { movies }: { movies: Movie[] }) => ({
 *       ...state,
 *       movies,
 *       loading: false,
 *     }),
 *     fetchMoviesError: state => ({ ...state, movies: [], loading: false }),
 *   },
 * );
 *
 * @see mergeReducers
 */
export function combineHandlers<State, Handlers extends HandlerMap<State>>(
  initialState: State,
  source: string,
  handlers: Handlers,
): [actions: ActionMap<State, Handlers>, reducer: ActionReducer<State>] {
  return [createActions(source, handlers), createReducer(initialState, source, handlers)];
}

/**
 * Creates a plain case reducer.
 *
 * @returns A plain case reducer.
 *
 * @example
 * const [moviesPageActions, moviesPageReducer] = combineHandlers(initMoviesState, 'moviesPage', {
 *   showCreateMovieDialog: plain(),
 * });
 *
 * @see combineHandlers
 */
export function plain<State>(): PlainCaseReducer<State> {
  return state => state;
}

/**
 * Creates a plain case reducer with the payload.
 *
 * @returns A plain case reducer with the payload.
 *
 * @example
 * const [moviesPageActions, moviesPageReducer] = combineHandlers(initMoviesState, 'moviesPage', {
 *   createMovie: withPayload<{ movie: Movie }>(),
 * });
 *
 * @see combineHandlers
 */
export function withPayload<Payload>(): CaseReducer<any, Payload> {
  return plain();
}

function createActions<State, Handlers extends HandlerMap<State>>(
  source: string,
  handlers: Handlers,
): ActionMap<State, Handlers> {
  return Object.keys(handlers).reduce(
    (actionMap, event) => ({
      ...actionMap,
      [event]: createAction(toActionType(source, event), props<any>()),
    }),
    {} as ActionMap<State, Handlers>,
  );
}

function createReducer<State, Handlers extends HandlerMap<State>>(
  initialState: State,
  source: string,
  handlers: Handlers,
): ActionReducer<State> {
  return (state = initialState, action: Action) => {
    const { type, ...payload } = action;
    const reducer = source === toSource(type) ? handlers[toEvent(type)] : null;

    return reducer ? reducer(state, payload) : state;
  };
}

function toActionType(source: string, event: string): string {
  return `[${source}] ${event}`;
}

function toSource(actionType: string): string {
  return actionType.slice(1).split(']').shift()!;
}

function toEvent(actionType: string): string {
  return actionType.split('] ').pop()!;
}
