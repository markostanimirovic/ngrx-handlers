import { Action, ActionReducer, createAction, props } from '@ngrx/store';
import { toCamelCase, toTitleCase } from './string-helper';
import { ActionMap, CaseReducer, HandlerMap } from './models';

function toActionName(actionType: string): string {
  const titleCasedActionName = actionType.split('] ').pop();
  return toCamelCase(titleCasedActionName as string);
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
      [actionName]: createAction(toActionType(featureName, actionName), props<any>()),
    }),
    {} as ActionMap<S, H>,
  );
}

function createReducer<S, H extends HandlerMap<S>>(initialState: S, handlers: H): ActionReducer<S> {
  return (state = initialState, action: Action) => {
    const { type, ...payload } = action;
    const reducer = handlers[toActionName(type)];

    return reducer ? reducer(state, payload) : state;
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

export function plain<S>(): (state: S) => S {
  return state => state;
}

export function withPayload<P>(): CaseReducer<any, P> {
  return plain();
}
