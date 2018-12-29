// https://jestjs.io/docs/en/getting-started
// https://jestjs.io/docs/en/tutorial-react

const App = require('./App');

test('passing test: 1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});

/*
test('failing test: 1 + 1 = 3', () => {
  expect(1 + 1).toBe(3);
});

test('App.dateTransform(new Date(2019, 1, 1))', () => {
  expect(App.dateTransform(new Date(2019, 1, 1))).toBe('1/2/2019');
});
*/
