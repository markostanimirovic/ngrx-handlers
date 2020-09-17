import { Action, ActionReducer, createAction, props } from '@ngrx/store';
import { toCamelCase, toTitleCase } from './string-helper';
import { ActionMap, HandlerMap, Reducer } from './models';

function toActionName(actionType: string): string {
  const titleCaseActionName = actionType.split('] ').pop();
  return toCamelCase(titleCaseActionName);
}

function toActionType(featureName: string, actionName: string): string {
  return `[${toTitleCase(featureName)}] ${toTitleCase(actionName)}`;
}

function createActions<S, H extends HandlerMap<S>>(
  featureName: string,
  handlers: H,
): ActionMap<S, H> {
  return Object.keys(handlers).reduce(
    (actionMap, actionName) => ({
      ...actionMap,
      // eslint-disable-next-line @typescript-eslint/ban-types
      [actionName]: createAction(toActionType(featureName, actionName), props<object>()),
    }),
    {} as ActionMap<S, H>,
  );
}

function createReducer<S, H extends HandlerMap<S>>(initialState: S, handlers: H) {
  return (state = initialState, action: Action) => {
    const { type, ...payload } = action;
    const reducer = handlers[toActionName(type)];

    return !!reducer ? reducer(state, payload) : state;
  };
}

export function combineHandlers<S, H extends HandlerMap<S>>(
  initialState: S,
  featureName: string,
  handlers: H,
): { actions: ActionMap<S, H>; reducer: ActionReducer<S> } {
  return {
    actions: createActions(featureName, handlers),
    reducer: createReducer(initialState, handlers),
  };
}

export function plain(): Reducer<any> {
  return state => state;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function withPayload<P extends object>(): Reducer<any, P> {
  return plain() as Reducer<any, P>;
}
