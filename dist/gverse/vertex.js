"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertex = void 0;
var edge_1 = require("./edge");
var debug_logger_1 = __importDefault(require("./debug-logger"));
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
       return person.craeteInto(graph)
     }
   }
   ```
   */
var Vertex = /** @class */ (function () {
    function Vertex() {
        /** Vertex type: Required for all vertices and stored as indexed predicate */
        this.type = "Vertex";
        /** Defines the edges and their cardinalities. E.g.:
         * `_edges = { mother: Edge.toVertex(Person), children: Edge.toVertices(Person) }`
         */
        this._edges = {};
    }
    Object.defineProperty(Vertex.prototype, "graph", {
        get: function () {
            return this._graph;
        },
        /** Apply operations on the provided graph instance */
        set: function (graph) {
            this._graph = graph;
        },
        enumerable: false,
        configurable: true
    });
    /// - Convenience methods
    /** Load the latest state from the graph */
    Vertex.prototype.loadFrom = function (graph) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graph.load(this)];
                    case 1:
                        updated = _a.sent();
                        this._graph = graph;
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    /** Save the current state of the vertex to the graph.
     * @param traverse whether or not do marshal linked edges
     */
    Vertex.prototype.saveInto = function (graph, traverse) {
        if (traverse === void 0) { traverse = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._graph = graph;
                        return [4 /*yield*/, graph.update(this, traverse)];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    /** Creates the given vertex to the graph.
     * @param traverse whether or not do marshal linked edges
     */
    Vertex.prototype.createInto = function (graph, traverse) {
        if (traverse === void 0) { traverse = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._graph = graph;
                        return [4 /*yield*/, graph.create(this, traverse)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Deletes the given vertex from the graph.
     * @param traverse whether or not do marshal linked edges
     */
    Vertex.prototype.deleteFrom = function (graph, traverse) {
        if (traverse === void 0) { traverse = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._graph = graph;
                        return [4 /*yield*/, graph.delete(this, traverse)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /// -  Mutation hooks
    /** Hook for before create processing. Called just before creating in the graph. */
    Vertex.prototype.beforeCreate = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, debug_logger_1.default)("Before create ".concat(this.type, ":"), values);
                return [2 /*return*/];
            });
        });
    };
    /** Hook for after create processing. Called right after creation. */
    Vertex.prototype.afterCreate = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, debug_logger_1.default)("After create ".concat(this.type, ":"), values);
                return [2 /*return*/];
            });
        });
    };
    /** Hook for before update processing Called just before updating the graph.*/
    Vertex.prototype.beforeUpdate = function (beforeValues, afterValues) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, debug_logger_1.default)("Before update ".concat(this.type), beforeValues, "->", afterValues);
                return [2 /*return*/];
            });
        });
    };
    /** Hook for after update processing. Called right after update. */
    Vertex.prototype.afterUpdate = function (beforeValues, afterValues) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, debug_logger_1.default)("After update ".concat(this.type), beforeValues, "->", afterValues);
                return [2 /*return*/];
            });
        });
    };
    /** Hook for before delete processing. Called just before deleting from the graph.*/
    Vertex.prototype.beforeDelete = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, debug_logger_1.default)("Before delete ".concat(this.type, ":"), values);
                return [2 /*return*/];
            });
        });
    };
    /** Hook for after delete  processing. Called right after deleting from the graph. */
    Vertex.prototype.afterDelete = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, debug_logger_1.default)("After delete ".concat(this.type, ":"), values);
                return [2 /*return*/];
            });
        });
    };
    /** Get all values as JSON-complaint object.
     * @param traverse whether or not do marshal linked edges
     */
    Vertex.prototype.autoMarshal = function (traverse) {
        var _this = this;
        if (traverse === void 0) { traverse = true; }
        // eslint-disable-next-line
        var vertex = this;
        var values = {};
        Object.getOwnPropertyNames(vertex).forEach(function (key) {
            var predicate = vertex[key];
            // ignore _* private instance variables and special variables
            if (!key.startsWith("_")) {
                if (vertex[key] && key in _this._edges) {
                    if (traverse) {
                        // handle edge predicates
                        var edge = _this._edges[key];
                        if (edge.direction == edge_1.Direction.Undirected) {
                            (0, debug_logger_1.default)("Skipping reverse edge marshaling for", edge);
                        }
                        else {
                            if (Array.isArray(predicate)) {
                                predicate = predicate.map(function (p) {
                                    return p.marshal();
                                });
                            }
                            else {
                                if (predicate instanceof Vertex)
                                    predicate = predicate.marshal();
                            }
                            values[key] = predicate;
                        }
                    }
                }
                else {
                    values[key.replace("$", "@")] = predicate;
                }
            }
        });
        return values;
    };
    /** Unmarshal through introspection */
    Vertex.prototype.autoUnmarshal = function (vertex, values) {
        // reset all edges
        for (var key in this._edges) {
            vertex[key] = undefined;
        }
        // apply reverse edges
        for (var key in this._edges) {
            var edge = this._edges[key];
            if (edge.direction == edge_1.Direction.Undirected) {
                values[key] = values["~".concat(edge.reverseEdgeName)];
                // eslint-disable-next-line
                delete values["~".concat(edge.reverseEdgeName)];
            }
        }
        var _loop_1 = function (key) {
            if (!key.startsWith("_")) {
                // skip special keys
                var val = values[key];
                // assign edges as vertex object or array of vertex objects
                if (key in this_1._edges) {
                    var edge_2 = this_1._edges[key];
                    if (Array.isArray(val)) {
                        if (edge_2.cardinality === edge_1.Cardinality.Single) {
                            var v = val.pop();
                            val = new edge_2.type().unmarshal(v);
                        }
                        else {
                            val = val.map(function (v) {
                                return new edge_2.type().unmarshal(v);
                            });
                        }
                    }
                    else {
                        if (edge_2.cardinality === edge_1.Cardinality.Single)
                            val = new edge_2.type().unmarshal(val);
                    }
                }
                vertex[key.replace("@", "$")] = val;
            }
        };
        var this_1 = this;
        // assign all values to the vertex
        for (var key in values) {
            _loop_1(key);
        }
        return vertex;
    };
    /** Property is true when product has a Dgraph UID. */
    Vertex.prototype.existsInGraph = function () {
        return !!this.uid;
    };
    /** Get JSON-complaint object representation. By default, it uses the [[autoMarshal]] feature.
     * @param traverse whether or not do marshal linked edges
     */
    Vertex.prototype.marshal = function (traverse) {
        if (traverse === void 0) { traverse = true; }
        return this.autoMarshal(traverse);
    };
    /** Set predicates from JSON-compliant values */
    Vertex.prototype.unmarshal = function (values) {
        return this.autoUnmarshal(this, values);
    };
    return Vertex;
}());
exports.Vertex = Vertex;
//# sourceMappingURL=vertex.js.map