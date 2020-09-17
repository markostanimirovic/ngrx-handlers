import { Action, ActionCreator, ActionReducer, createAction, props } from '@ngrx/store';
import { NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';

type ReducerWithoutPayload<S> = (state: S) => S;
type ReducerWithPayload<S, P extends object> = (state: S, payload: P) => S;

type ActionC<S, R> = R extends ReducerWithoutPayload<S>
  ? () => TypedAction<string>
  : R extends ReducerWithPayload<S, infer P>
    ? (props: P & NotAllowedCheck<P>) => P & TypedAction<string>
    : () => TypedAction<string>;

export function withPayload<P extends object>(): ReducerWithPayload<any, P> {
  return (state, payload: P & NotAllowedCheck<P>) => state;
}

export function createHandlers<
  S,
  R extends { [key: string]: (state: S, payload?: object & NotAllowedCheck<object>) => S | null },
  >(
  initialState: S,
  featureKey: string,
  reducers: R
): {
  actions: { [K in keyof R]: ActionCreator<string, ActionC<S, R[K]>> },
  reducer: ActionReducer<S>
};

export function createHandlers<T>(
  initialState: T,
  featureKey: string,
  reducers: { [key: string]: (state: T, payload: string) => T }
): { actions: { [key: string]: ActionCreator<string, (props?: any) => any & TypedAction<string>> }, reducer: ActionReducer<T> } {
  return {
    actions: Object.keys(reducers)
      .reduce((acc, key) => ({
        ...acc,
        [key]: createAction(`[${featureKey}] ${key}`, props<object>())
      }), {}),
    reducer: (state = initialState, action: Action) => {
      for (const key in reducers) {
        // TODO: convert to camelCase and find by index
        if (`[${featureKey}] ${key}` === action.type) {
          console.log(action);
          const { type, ...payload } = action;
          return reducers[key](state, payload as any);
        }
      }

      return state;
    }
  };
}

interface User {
  name: string;
}

interface State {
  users: User[];
  loading: boolean;
}

const initialState: State = { users: [], loading: false };

const { actions, reducer } = createHandlers(initialState, 'users', {
  fetchUsers: (state, payload: any[]) => state
});
