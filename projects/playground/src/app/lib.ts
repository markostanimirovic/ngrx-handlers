import { Action, ActionCreator, ActionReducer, createAction, props } from '@ngrx/store';
import { NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';

type NullOrUndefined = null | undefined

export type Reducer<
  TState = null,
  TPayload = null,
  TReducer = TState extends NullOrUndefined
    ? null
    : TPayload extends NullOrUndefined
      ? (state: TState) => TState
      : (state: TState, payload: TPayload) => TState
  > = TReducer;

type Creator<TState, TReducer> = TReducer extends Reducer<TState, infer TPayload>
  ? TPayload extends object
  ? (props: TPayload & NotAllowedCheck<TPayload>) => TPayload & TypedAction<string>
  : () => TypedAction<string>
  : never;

type ActionMap<TState, THandlerMap> = {
  [TActionKey in keyof THandlerMap]: ActionCreator<string, Creator<TState, THandlerMap[TActionKey]>>
};

export function plain(): Reducer<any> {
  return state => state;
}

export function withPayload<TPayload extends object>(): Reducer<any, TPayload> {
  return plain() as Reducer<any, TPayload>;
}

export function createActionsAndReducer<
  State,
  HandlerMap extends { [actionKey: string]: Reducer<State, object> },
  >(
  initialState: State,
  featureKey: string,
  handlerMap: HandlerMap
): {
  actions: ActionMap<State, HandlerMap>,
  reducer: ActionReducer<State>
} {
  return {
    actions: Object.keys(handlerMap)
      .reduce((acc, key) => ({
        ...acc,
        [key]: createAction(`[${featureKey}] ${key}`, props<object>())
      }), {} as ActionMap<State, HandlerMap>),
    reducer: (state = initialState, action: Action) => {
      for (const key in handlerMap) {
        // TODO: convert to camelCase and find by index
        if (`[${featureKey}] ${key}` === action.type) {
          console.log(action);
          const { type, ...payload } = action;
          return handlerMap[key](state, payload as any);
        }
      }

      return state;
    }
  };
}
