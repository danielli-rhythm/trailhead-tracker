// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill crypto.getRandomValues for uuid in jsdom
const { randomFillSync } = require('crypto');
if (!global.crypto) {
  global.crypto = { getRandomValues: (buf) => randomFillSync(buf) };
}
