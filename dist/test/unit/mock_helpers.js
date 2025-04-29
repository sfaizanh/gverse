"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondArg = exports.firstArg = exports.graph = void 0;
/** Mock Universe graph */
exports.graph = {};
exports.graph.create = jest.fn(function (vertex) { });
exports.graph.first = jest.fn(function (vertex, args) { });
/** Get the first passed argument to a mock function */
function firstArg(mockFunction) {
    return mockFunction.mock.calls[0][0];
}
exports.firstArg = firstArg;
/** Get the second passed argument to a mock function */
function secondArg(mockFunction) {
    return mockFunction.mock.calls[0][1];
}
exports.secondArg = secondArg;
//# sourceMappingURL=mock_helpers.js.map