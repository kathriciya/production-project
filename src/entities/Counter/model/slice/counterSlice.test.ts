import { CounterSchema } from '../types/counterSchema';

import { counterActions, counterReducer } from './counterSlice';

describe('counterSlice.test', () => {
  test('decrement', () => {
    const state: CounterSchema = { value: 10 };

    // eslint-disable-next-line object-curly-newline
    expect(counterReducer(state, counterActions.decrement())).toEqual({
      value: 9,
      // eslint-disable-next-line object-curly-newline
    });
  });
  test('increment', () => {
    const state: CounterSchema = { value: 10 };

    // eslint-disable-next-line object-curly-newline
    expect(counterReducer(state, counterActions.increment())).toEqual({
      value: 11,
      // eslint-disable-next-line object-curly-newline
    });
  });

  test('should work with empty state', () => {
    // eslint-disable-next-line object-curly-newline
    expect(counterReducer(undefined, counterActions.increment())).toEqual({
      value: 1,
      // eslint-disable-next-line object-curly-newline
    });
  });
});
