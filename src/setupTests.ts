// setup file
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Praxis' config-defaults shim additional browser functionality into the test
// environment (ex. `window.matchMedia`)
import { setupTests } from '@praxis/config-defaults'

setupTests()
