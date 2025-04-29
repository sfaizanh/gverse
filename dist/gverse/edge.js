"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edge = exports.Direction = exports.Cardinality = void 0;
var vertex_1 = require("./vertex");
/** Cardinality of edges connecting 0-1 or 0-N vertices */
var Cardinality;
(function (Cardinality) {
    Cardinality[Cardinality["Single"] = 0] = "Single";
    Cardinality[Cardinality["Multiple"] = 1] = "Multiple";
})(Cardinality = exports.Cardinality || (exports.Cardinality = {}));
/** Direction of edges to support direction or bidirectional connection */
var Direction;
(function (Direction) {
    Direction[Direction["Directed"] = 0] = "Directed";
    Direction[Direction["Undirected"] = 1] = "Undirected";
})(Direction = exports.Direction || (exports.Direction = {}));
/** Represents an edge that connect a vertex to one or more vertices.
 * Vertex class should contain _edges to define the edge properties.
 * E.g. ``` _edges = { father: Edge.toVertex(Father) } ```
 * @todo @future Support facets
 */
var Edge = /** @class */ (function () {
    function Edge() {
        this.type = vertex_1.Vertex;
        this.cardinality = Cardinality.Multiple;
        this.reverseEdgeName = ""; // blank implies directed
    }
    /** Create an edge definition for zero or one vertex */
    Edge.toVertex = function (type, _a) {
        var _b = _a === void 0 ? {} : _a, reverseOf = _b.reverseOf;
        return Edge.buildEdge(type, Cardinality.Single, { reverseOf: reverseOf });
    };
    Object.defineProperty(Edge.prototype, "direction", {
        /** Get direction of the edge */
        get: function () {
            return this.reverseEdgeName === ""
                ? Direction.Directed
                : Direction.Undirected;
        },
        enumerable: false,
        configurable: true
    });
    /** Create an edge definition for 0 or more vertices */
    Edge.toVertices = function (type, _a) {
        var _b = _a === void 0 ? {} : _a, reverseOf = _b.reverseOf;
        return Edge.buildEdge(type, Cardinality.Multiple, { reverseOf: reverseOf });
    };
    Edge.buildEdge = function (type, cardinality, _a) {
        var _b = _a === void 0 ? {} : _a, reverseOf = _b.reverseOf;
        var edge = new Edge();
        edge.type = type;
        edge.cardinality = cardinality;
        if (reverseOf)
            edge.reverseEdgeName = reverseOf;
        return edge;
    };
    return Edge;
}());
exports.Edge = Edge;
//# sourceMappingURL=edge.js.map