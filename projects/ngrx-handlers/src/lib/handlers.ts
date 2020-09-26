import { Action, ActionReducer, createAction, props } from '@ngrx/store';
import { toCamelCase, toTitleCase } from './string-helper';
import { ActionMap, CaseReducer, HandlerMap } from './models';

export function combineHandlers<S, H extends HandlerMap<S>>(
  initialState: S,
  featureName: string,
  handlers: H,
): { actions: ActionMap<S, H>; reducer: ActionReducer<S> } {
  return {
    actions: createActions(featureName, handlers),
    reducer: createReducer(initialState, featureName, handlers),
  };
}

export function plain<S>(): (state: S) => S {
  return state => state;
}

export function withPayload<P>(): CaseReducer<any, P> {
  return plain();
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

function createReducer<S, H extends HandlerMap<S>>(
  initialState: S,
  featureName: string,
  handlers: H,
): ActionReducer<S> {
  return (state = initialState, action: Action) => {
    const { type, ...payload } = action;
    const reducer = featureName === toFeatureName(type) ? handlers[toActionName(type)] : null;

    return reducer ? reducer(state, payload) : state;
  };
}

function toActionType(featureName: string, actionName: string): string {
  return `[${toTitleCase(featureName)}] ${toTitleCase(actionName)}`;
}

function toFeatureName(actionType: string): string {
  const titleCasedFeatureName = actionType.slice(1).split(']').shift();
  return toCamelCase(titleCasedFeatureName as string);
}

function toActionName(actionType: string): string {
  const titleCasedActionName = actionType.split('] ').pop();
  return toCamelCase(titleCasedActionName as string);
}
