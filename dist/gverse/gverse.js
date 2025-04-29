"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("./connection");
var transaction_1 = require("./transaction");
var graph_1 = require("./graph");
var vertex_1 = require("./vertex");
var edge_1 = require("./edge");
var Gverse;
(function (Gverse) {
    // --- Classes ---
    /** GRPC connection to the Dgraph server */
    var Connection = /** @class */ (function (_super) {
        __extends(Connection, _super);
        function Connection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Connection;
    }(connection_1.Connection));
    Gverse.Connection = Connection;
    /** A Dgraph transaction */
    var Transaction = /** @class */ (function (_super) {
        __extends(Transaction, _super);
        function Transaction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Transaction;
    }(transaction_1.Transaction));
    Gverse.Transaction = Transaction;
    /** Represents an active session with Dgraph */
    var Graph = /** @class */ (function (_super) {
        __extends(Graph, _super);
        function Graph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Graph;
    }(graph_1.Graph));
    Gverse.Graph = Graph;
    /** Represents a vertex and connected edges and vertices.
     * Note: A vertex class must have an no-argument constructor
     * and default values for all property predicates.
     * E.g.
     * ```
     class Person extends Vertex {
       name: string = ""
       mother?: Person
       children?: Array<Person> = []
       _edges = {
         mother: Edge.toVertex(Person),
         children: Edge.toVertices(Person)
       }
       create(name: string) {
         const person = new Person()
         person.name = name
         return person.createInto(graph)
       }
     }
     ```
     */
    var Vertex = /** @class */ (function (_super) {
        __extends(Vertex, _super);
        function Vertex() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Vertex;
    }(vertex_1.Vertex));
    Gverse.Vertex = Vertex;
    /** Represents an edge that connect a vertex to one or more vertices.
     * Vertex class should contain _edges to define the edge properties.
     * E.g. ``` _edges = { father: Edge.toVertex(Father) } ```
     * @todo @future Support facets
     */
    var Edge = /** @class */ (function (_super) {
        __extends(Edge, _super);
        function Edge() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Edge;
    }(edge_1.Edge));
    Gverse.Edge = Edge;
    // --- Enums ---
    Gverse.Cardinality = edge_1.Cardinality;
    Gverse.Direction = edge_1.Direction;
})(Gverse || (Gverse = {}));
exports.default = Gverse;
//# sourceMappingURL=gverse.js.map