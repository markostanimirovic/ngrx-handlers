import { ActionCreator as TypedActionCreator } from '@ngrx/store';

type ArraysAreNotAllowed = 'arrays are not allowed in action creators';
type TypePropertyIsNotAllowed = 'type property is not allowed in action creators';
type PrimitivesAreNotAllowed = 'primitive types are not allowed in action creators';
type NullOrUndefinedAreNotAllowed = 'null or undefined are not allowed in action creators';
type EmptyObjectsAreNotAllowed = 'empty objects are not allowed in action creators';

type Primitive = number | bigint | string | boolean;
type NullOrUndefined = null | undefined;

export type TypedAction = { readonly type: string };

export type PlainCaseReducer<State> = (state: State) => State;

export type CaseReducer<State, Payload> = (state: State, payload: Payload) => State;

export type PlainActionCreator = () => TypedAction;

export type ActionCreatorWithPayload<Payload> = (payload: Payload) => Payload & TypedAction;

export type ActionCreator<State, Reducer> = Reducer extends PlainCaseReducer<State>
  ? PlainActionCreator
  : Reducer extends CaseReducer<State, infer Payload>
  ? Payload extends any[]
    ? ActionCreatorWithPayload<ArraysAreNotAllowed>
    : Payload extends { type: any }
    ? ActionCreatorWithPayload<TypePropertyIsNotAllowed>
    : Payload extends Primitive
    ? ActionCreatorWithPayload<PrimitivesAreNotAllowed>
    : Payload extends NullOrUndefined
    ? ActionCreatorWithPayload<NullOrUndefinedAreNotAllowed>
    : keyof Payload extends never
    ? ActionCreatorWithPayload<EmptyObjectsAreNotAllowed>
    : ActionCreatorWithPayload<Payload>
  : never;

export type HandlerMap<State> = {
  [event: string]: CaseReducer<State, any>;
};

export type ActionMap<State, Handlers extends HandlerMap<State>> = {
  [Event in keyof Handlers]: TypedActionCreator<string, ActionCreator<State, Handlers[Event]>>;
};
