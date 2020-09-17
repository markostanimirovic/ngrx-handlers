import { NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';
import { ActionCreator } from '@ngrx/store';

type NullOrUndefined = null | undefined;

export type Reducer<
  S = null,
  P = null,
  R = S extends NullOrUndefined
    ? null
    : P extends NullOrUndefined
    ? (state: S) => S
    : (state: S, payload: P) => S
> = R;

export type Creator<S, R> = R extends Reducer<S, infer P>
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    P extends object
    ? (props: P & NotAllowedCheck<P>) => P & TypedAction<string>
    : () => TypedAction<string>
  : null;

export type HandlerMap<S> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [actionName: string]: Reducer<S, object>;
};

export type ActionMap<S, H extends HandlerMap<S>> = {
  [K in keyof H]: ActionCreator<string, Creator<S, H[K]>>;
};
