import { ActionCreator as TypedActionCreator } from '@ngrx/store';

type ArraysAreNotAllowed = 'arrays are not allowed in action creators';
type TypePropertyIsNotAllowed = 'type property is not allowed in action creators';
type PrimitivesAreNotAllowed = 'primitive types are not allowed in action creators';

type Primitive = number | bigint | string | boolean;

export type TypedAction = { readonly type: string };

export type CaseReducer<S, P> = (state: S, payload: P) => S;

export type ActionCreatorWithProps<P> = (props: P) => P & TypedAction;
export type ActionCreatorWithoutProps = () => TypedAction;

export type ActionCreator<S, R> = R extends (state: S) => S
  ? ActionCreatorWithoutProps
  : R extends CaseReducer<S, infer P>
  ? P extends any[]
    ? ActionCreatorWithProps<ArraysAreNotAllowed>
    : P extends { type: any }
    ? ActionCreatorWithProps<TypePropertyIsNotAllowed>
    : P extends Primitive
    ? ActionCreatorWithProps<PrimitivesAreNotAllowed>
    : ActionCreatorWithProps<P>
  : never;

export type HandlerMap<S> = {
  [actionName: string]: CaseReducer<S, any>;
};

export type ActionMap<S, H extends HandlerMap<S>> = {
  [K in keyof H]: TypedActionCreator<string, ActionCreator<S, H[K]>>;
};
