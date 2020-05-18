"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const main_1 = require("../src/main");
describe('greeter function', () => {
    jest.useFakeTimers();
    const name = 'John';
    let hello;
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const p = main_1.greeter(name);
        jest.runOnlyPendingTimers();
        hello = yield p;
    }));
    it('delays the greeting by 2 seconds', () => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), main_1.Delays.Long);
    });
    it('greets a user with `Hello, {name}` message', () => {
        expect(hello).toBe(`Hello, ${name}`);
    });
});
//# sourceMappingURL=main.test.js.map