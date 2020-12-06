import { mergeReducers } from './merge-reducers';
import { combineHandlers } from './handlers';

describe('mergeReducers', () => {
  it('should not throw an error without arguments', () => {
    expect(mergeReducers()).not.toThrowError();
  });

  it('should create a reducer', () => {
    const state = { foo: '' };
    const [fooActions, fooReducer] = combineHandlers(state, 'foo', { foo: () => ({ foo: 'foo' }) });
    const [barActions, barReducer] = combineHandlers(state, 'bar', { bar: () => ({ foo: 'bar' }) });

    const reducer = mergeReducers(fooReducer, barReducer);

    expect(reducer(undefined, { type: 'unknown' })).toBe(state);
    expect(reducer(state, { type: 'unknown' })).toBe(state);
    expect(reducer(state, fooActions.foo())).toEqual({ foo: 'foo' });
    expect(reducer(state, barActions.bar())).toEqual({ foo: 'bar' });
  });

  it('should return initial state from first reducer with undefined state and unknown action', () => {
    const fooState = 'foo';
    const [, fooReducer] = combineHandlers(fooState, 'foo', { foo: state => `${state}1` });

    const barState = 'bar';
    const [, barReducer] = combineHandlers(barState, 'bar', { bar: state => `${state}2` });

    const reducer1 = mergeReducers(fooReducer, barReducer);
    expect(reducer1(undefined, { type: 'unknown' })).toBe(fooState);

    const reducer2 = mergeReducers(barReducer, fooReducer);
    expect(reducer2(undefined, { type: 'unknown' })).toBe(barState);
  });
});
