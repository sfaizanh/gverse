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
exports.Graph = void 0;
var debug_logger_1 = __importDefault(require("./debug-logger"));
var retry_1 = require("./retry");
var SchemaBuildTime = 100; // ms to wait after schema change
/** Graph represents a connected graph and convenient features graph operations
 * with vertices and edges.
 */
var Graph = /** @class */ (function () {
    function Graph(connection) {
        this.indices = "";
        this.types = "";
        this.connection = connection;
    }
    /** Verifies that a connection can be made to the graph server */
    Graph.prototype.connect = function (announce) {
        if (announce === void 0) { announce = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.connection.verified) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connection.connect(announce)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.setIndicesAndTypes()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Connect to a given connection */
    Graph.prototype.connectTo = function (connection, announce) {
        if (announce === void 0) { announce = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.connection = connection;
                void this.connect(announce);
                return [2 /*return*/];
            });
        });
    };
    /** Get a new transaction on the current connection.
     * @param autoCommit Automatically commit after first mutation. Default: false
     */
    Graph.prototype.newTransaction = function (autoCommit) {
        if (autoCommit === void 0) { autoCommit = false; }
        return this.connection.newTransaction(autoCommit);
    };
    /** Deletes all vertices of matching */
    Graph.prototype.clear = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.clear(type)];
                    case 1:
                        _a.sent();
                        (0, debug_logger_1.default)("Warning: Schema was dropped - recreating.");
                        if (!(type == undefined)) return [3 /*break*/, 3];
                        // schema was dropped, recreate
                        return [4 /*yield*/, this.setIndicesAndTypes()];
                    case 2:
                        // schema was dropped, recreate
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Set up default Gverse schema and create all indices  */
    Graph.prototype.setIndicesAndTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Setting indices", this.indices);
                        (0, debug_logger_1.default)("Setting types", this.types);
                        return [4 /*yield*/, this.connection.applySchema(this.indices + "\n" + this.types)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, retry_1.waitPromise)("set indices", SchemaBuildTime)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Get a vertex from the graph with *all* predicates for given uid. */
    Graph.prototype.get = function (vertexClass, uid, depth, transaction) {
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.get", vertexClass.name, uid);
                        if (!uid)
                            throw Error("No uid provided");
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, tx.query("{vertex(func:type(".concat(vertexClass.name, ")) @filter(uid(").concat(uid, ")) { ").concat(Graph.expansion(depth), " }}"))];
                    case 1:
                        res = _a.sent();
                        if (res === null || res === void 0 ? void 0 : res.vertex)
                            return [2 /*return*/, new vertexClass().unmarshal(res.vertex.pop())];
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /** Get values of any Vertex type by uid */
    Graph.prototype.uid = function (uid, transaction, depth) {
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.uid", uid);
                        if (!uid)
                            throw new Error("No uid provided");
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, tx.query("{vertex(func:uid(".concat(uid, ")) @filter(has(dgraph.type)) { ").concat(Graph.expansion(depth), " }}"))];
                    case 1:
                        res = _a.sent();
                        if (res === null || res === void 0 ? void 0 : res.vertex)
                            return [2 /*return*/, res.vertex.pop()];
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /** Load a vertex from the graph with *all* predicates for given uid for
     * given depth. */
    Graph.prototype.load = function (vertex, depth, transaction) {
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.load", vertex.type, "(".concat(vertex.uid, ")"));
                        if (!vertex.uid)
                            throw new Error("Vertex instance requires uid");
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, tx.query("{vertex(func:uid(".concat(vertex.uid, ")) @filter(has(dgraph.type)) { ").concat(Graph.expansion(depth), " }}"))];
                    case 1:
                        res = _a.sent();
                        if (res === null || res === void 0 ? void 0 : res.vertex)
                            return [2 /*return*/, vertex.unmarshal(res.vertex.pop())];
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /** Query and unmarshal matching vertices using full GraphQL± query.
     * Result must be named "vertices" for unmarshaling to work. E.g.
     *   `{vertices(func:uid("0x1)) { uid name }}`.
     *
     * For custom queries that do not require unmarshaling, use Transaction.query.
     */
    Graph.prototype.query = function (vertexClass, query, parameters, transaction, depth) {
        if (parameters === void 0) { parameters = {}; }
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, res, vertices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.query", vertexClass.name, query);
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, tx.query(query, parameters)];
                    case 1:
                        res = _a.sent();
                        if (!res)
                            return [2 /*return*/, []];
                        vertices = res.vertices.map(function (values) {
                            return new vertexClass().unmarshal(values);
                        });
                        return [2 /*return*/, vertices];
                }
            });
        });
    };
    /** Query and unmarshal matching vertices based on given Dgraph function.
       * Query function Can include order.
       *
       * Examples:
       * ```
        queryWithFunction(Pet, "eq(name, Oreo)")
        queryWithFunction(Pet, "eq(type, Pet), orderdesc:createdAt")
        queryWithFunction(Pet, "eq(type, Pet), orderasc:age")
       ```
       */
    Graph.prototype.queryWithFunction = function (vertexClass, queryFunction, transaction, depth) {
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.queryWithFunction", vertexClass.name, queryFunction);
                        return [4 /*yield*/, this.query(vertexClass, "{vertices(func:".concat(queryFunction, ") @filter(type( ").concat(vertexClass.name, ")) { ").concat(Graph.expansion(depth), " }}"), {}, transaction, depth)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Query and unmarshal matching vertices */
    Graph.prototype.all = function (vertexClass, _a, transaction, depth) {
        var _b;
        var _c = _a === void 0 ? {} : _a, order = _c.order, _d = _c.limit, limit = _d === void 0 ? 1000 : _d, offset = _c.offset;
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var orderPhrase, limitPhrase, offsetPhrase;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        limit = limit < 10000 ? limit : 1000;
                        orderPhrase = (_b = (order && ", ".concat(order))) !== null && _b !== void 0 ? _b : "";
                        limitPhrase = ", first:".concat(limit);
                        offsetPhrase = offset ? ", offset:".concat(offset) : "";
                        (0, debug_logger_1.default)("Graph.all", vertexClass.name);
                        return [4 /*yield*/, this.queryWithFunction(vertexClass, "type(".concat(vertexClass.name, ") ").concat(orderPhrase, " ").concat(limitPhrase, " ").concat(offsetPhrase), transaction, depth)];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /** Get the first vertex from the graph with matching `predicate = value`. */
    Graph.prototype.first = function (vertexClass, _a, transaction, depth) {
        var predicate = _a.predicate, value = _a.value;
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var matches;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.first", vertexClass.name, predicate, "=", value);
                        return [4 /*yield*/, this.queryWithFunction(vertexClass, "eq(".concat(predicate, ", ").concat(value, ")"), transaction, depth)];
                    case 1:
                        matches = _b.sent();
                        return [2 /*return*/, matches ? matches.pop() : undefined];
                }
            });
        });
    };
    /** Create a vertex in the graph based on given instance. Returns the vertex with new uid. */
    Graph.prototype.create = function (vertex, traverse, transaction) {
        if (traverse === void 0) { traverse = false; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, values, createdUid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.create", vertex);
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, vertex.beforeCreate(vertex.marshal(traverse))
                            // marshal again to get any updated values from beforeUpdate
                        ];
                    case 1:
                        _a.sent();
                        values = vertex.marshal(traverse);
                        // Replacing type with dgraph.type
                        values["dgraph.type"] = values.type;
                        delete values.type;
                        (0, debug_logger_1.default)("Graph.create after hook values:", values);
                        return [4 /*yield*/, tx.mutate(values)];
                    case 2:
                        createdUid = _a.sent();
                        if (!createdUid) return [3 /*break*/, 4];
                        vertex.uid = createdUid;
                        return [4 /*yield*/, vertex.afterCreate(values)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, vertex];
                }
            });
        });
    };
    /** Create a vertex in the graph based on given prototype. Returns the vertex with new uid. */
    Graph.prototype.delete = function (vertex, traverse, transaction) {
        if (traverse === void 0) { traverse = false; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, values, delMut, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.delete", vertex);
                        if (!vertex.uid)
                            throw new Error("Can not delete a vertex without a uid");
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        values = vertex.marshal(traverse);
                        return [4 /*yield*/, vertex.beforeDelete(values)];
                    case 1:
                        _a.sent();
                        delMut = { uid: vertex.uid };
                        return [4 /*yield*/, tx.delete(delMut)];
                    case 2:
                        res = _a.sent();
                        (0, debug_logger_1.default)("Deleted", vertex.uid);
                        return [4 /*yield*/, vertex.afterDelete(values)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /** Save the current values into the graph. Returns the vertex with uid. */
    Graph.prototype.update = function (vertex, traverse, transaction) {
        if (traverse === void 0) { traverse = false; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, currentValues, values, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.save", vertex);
                        if (!vertex.uid)
                            throw new Error("Can not save a vertex without a uid");
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, this.uid(vertex.uid, tx, traverse ? 3 : 1)];
                    case 1:
                        currentValues = _a.sent();
                        return [4 /*yield*/, vertex.beforeUpdate(currentValues, vertex.marshal(traverse))
                            // marshal again to get any updated values from beforeUpdate
                        ];
                    case 2:
                        _a.sent();
                        values = vertex.marshal(traverse);
                        return [4 /*yield*/, tx.mutate(values)];
                    case 3:
                        updated = _a.sent();
                        if (!updated) return [3 /*break*/, 5];
                        return [4 /*yield*/, vertex.afterUpdate(currentValues, values)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, vertex];
                }
            });
        });
    };
    /** Save the current values into the graph. Returns the vertex with uid. */
    Graph.prototype.save = function (vertex, traverse, transaction) {
        if (traverse === void 0) { traverse = false; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!vertex.uid)
                            throw new Error("Can not save a vertex without a uid");
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        values = vertex.marshal(traverse);
                        return [4 /*yield*/, tx.mutate(values)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, vertex];
                }
            });
        });
    };
    /** High performance set properties (predicate values) as is on a vertex of given UID.
     * Do not pass vertices as values. Pass just the values you want to mutate.
     *
     * E.g.: `Graph.set(person.uid, {name: "Zak"})`
     *
     * Note: This method is for fast mutation without type-validation and hooks.
     */
    Graph.prototype.set = function (uid, values, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, vertexValues;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Graph.set", uid, values);
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        values.uid = uid; // flatten it for dgraph
                        vertexValues = Object.assign({}, values);
                        /* eslint-disable @typescript-eslint/no-dynamic-delete */
                        Object.keys(values)
                            .filter(function (k) { return k.startsWith("_"); })
                            .forEach(function (k) { return delete vertexValues[k]; });
                        return [4 /*yield*/, tx.mutate(vertexValues)];
                    case 1: 
                    /* eslint-disable @typescript-eslint/no-dynamic-delete */
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Connect a vertex (subject) to another vertex (object) as predicate */
    Graph.prototype.link = function (from, to, predicate, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(from.uid && to.uid)) return [3 /*break*/, 2];
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, tx.mutateNquads("<".concat(from.uid, ">"), predicate, "<".concat(to.uid, ">"))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Disconnect a vertex (object) from another vertex (subject) as predicate */
    Graph.prototype.unlink = function (from, to, predicate, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(from.uid && to.uid)) return [3 /*break*/, 2];
                        tx = transaction !== null && transaction !== void 0 ? transaction : this.connection.newTransaction(true);
                        return [4 /*yield*/, tx.deleteNquads("<".concat(from.uid, ">"), predicate, "<".concat(to.uid, ">"))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Disconnect the associated connection */
    Graph.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connection) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connection.disconnect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Returns the JSON expansion phrase for nested vertices */
    Graph.expansion = function (depth) {
        if (depth < 1 || depth > 10)
            throw new Error("Invalid depth. Should be between 1 and 10.");
        return Graph.Depths[depth];
    };
    /** Create an array of expansion phrases */
    Graph.Depths = (function () {
        var nest = function (s) { return "uid expand(_all_) { ".concat(s, " }"); };
        var expression = "uid expand(_all_)";
        var depths = [];
        for (var i = 1; i < 11; i++) {
            depths[i] = expression;
            expression = nest(expression);
        }
        return depths;
    })();
    return Graph;
}());
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map