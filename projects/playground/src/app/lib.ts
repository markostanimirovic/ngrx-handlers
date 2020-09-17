// import { Action, ActionCreator, ActionReducer, createAction, props } from '@ngrx/store';
// import { NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';
// import { camelCase, titleCase } from './string_helper';
//
// type NullOrUndefined = null | undefined;
//
// export type Reducer<
//   S = null,
//   P = null,
//   R = S extends NullOrUndefined
//     ? null
//     : P extends NullOrUndefined
//       ? (state: S) => S
//       : (state: S, payload: P) => S
//   > = R;
//
// export type Creator<S, R> = R extends Reducer<S, infer P>
//   ? P extends object
//     ? (props: P & NotAllowedCheck<P>) => P & TypedAction<string>
//     : () => TypedAction<string>
//   : null;
//
// export type HandlerMap<S> = {
//   [actionKey: string]: Reducer<S, object>;
// };
//
// type ActionMap<S, H extends HandlerMap<S>> = {
//   [K in keyof H]: ActionCreator<string, Creator<S, H[K]>>;
// };
//
// function toActionName(actionType: string): string {
//   const titleCaseActionName = actionType.split('] ').pop();
//   return camelCase(titleCaseActionName);
// }
//
// function toActionType(featureName: string, actionName: string): string {
//   return `[${titleCase(featureName)}] ${titleCase(actionName)}`;
// }
//
// function createActions<S, H extends HandlerMap<S>>(
//   featureName: string,
//   handlers: H,
// ): ActionMap<S, H> {
//   return Object.keys(handlers).reduce(
//     (actionMap, actionName) => ({
//       ...actionMap,
//       [actionName]: createAction(toActionType(featureName, actionName), props<object>()),
//     }),
//     {} as ActionMap<S, H>,
//   );
// }
//
// function createReducer<S, H extends HandlerMap<S>>(initialState: S, handlers: H) {
//   return (state = initialState, action: Action) => {
//     const { type, ...payload } = action;
//     const reducer = handlers[toActionName(type)];
//
//     return !!reducer ? reducer(state, payload) : state;
//   };
// }
//
// export function combineHandlers<S, H extends HandlerMap<S>>(
//   initialState: S,
//   featureName: string,
//   handlers: H,
// ): { actions: ActionMap<S, H>; reducer: ActionReducer<S> } {
//   return {
//     actions: createActions(featureName, handlers),
//     reducer: createReducer(initialState, handlers),
//   };
// }
//
// export function plain(): Reducer<any> {
//   return state => state;
// }
//
// export function withPayload<P extends object>(): Reducer<any, P> {
//   return plain() as Reducer<any, P>;
// }
