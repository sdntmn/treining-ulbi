/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom"
import "regenerator-runtime/runtime"
import "whatwg-fetch"

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
)

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock as any
