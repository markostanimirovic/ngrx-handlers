import { Action, ActionReducer, createAction, props } from '@ngrx/store';
import { ActionMap, CaseReducer, HandlerMap, PlainCaseReducer } from './models';

export function combineHandlers<State, Handlers extends HandlerMap<State>>(
  initialState: State,
  source: string,
  handlers: Handlers,
): [actions: ActionMap<State, Handlers>, reducer: ActionReducer<State>] {
  return [createActions(source, handlers), createReducer(initialState, source, handlers)];
}

export function plain<State>(): PlainCaseReducer<State> {
  return state => state;
}

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
