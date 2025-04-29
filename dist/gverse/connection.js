"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Connection = void 0;
var dgraph = __importStar(require("dgraph-js"));
var dgraph_js_1 = require("dgraph-js");
var chalk_1 = __importDefault(require("chalk"));
var debug_logger_1 = __importDefault(require("./debug-logger"));
var transaction_1 = require("./transaction");
var retry_1 = require("./retry");
/* Catch any unhandled promises and report in logs */
process.on("unhandledRejection", function (reason, p) {
    console.warn("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
});
/** Connection represents a GRPC connection to the dgraph server. */
var Connection = /** @class */ (function () {
    function Connection(environment) {
        this.verified = false;
        this.environment = environment;
        this.stub = new dgraph.DgraphClientStub("".concat(environment.host, ":").concat(environment.port), dgraph_js_1.grpc.credentials.createInsecure());
        this.client = new dgraph.DgraphClient(this.stub);
        this.client.setDebugMode(environment.debug);
    }
    /** Verifies the connection. There's no connect operation per-se. */
    Connection.prototype.connect = function (announce) {
        if (announce === void 0) { announce = false; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tx = new transaction_1.Transaction(this, true, false, true);
                        return [4 /*yield*/, tx.query("{total (func: has(dgraph.type)) {count(uid)}}")];
                    case 1:
                        res = _a.sent();
                        if (announce)
                            console.log("🔅 Connected to", "Dgraph zero at", chalk_1.default.blue.bold(this.environment.host) +
                                ":" +
                                chalk_1.default.blue.bold("".concat(this.environment.port)), "with", chalk_1.default.cyan.bold(res.total.pop().count), "vertices\n");
                        this.verified = true;
                        (0, debug_logger_1.default)("Connected to dgraph");
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        (0, debug_logger_1.default)("Could not connect to Dgraph alpha at ".concat(this.environment.host, ":").concat(this.environment.port), error_1);
                        this.verified = false;
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Returns a new transaction with auto commit (immediate) option. */
    Connection.prototype.newTransaction = function (autoCommit, readOnly) {
        if (autoCommit === void 0) { autoCommit = false; }
        if (readOnly === void 0) { readOnly = false; }
        return new transaction_1.Transaction(this, autoCommit, false, readOnly);
    };
    /** Immediate query with autoCommit transaction */
    Connection.prototype.query = function (query, variables) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.newTransaction(true, true).query(query, variables)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Clears the graph by dropping all vertices, edges and predicates
     * of the given type - or all types.
     */
    Connection.prototype.clear = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var res, op, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!type) return [3 /*break*/, 4];
                        (0, debug_logger_1.default)("Clearing vertices of type", type);
                        return [4 /*yield*/, this.query("{vertices (func: type(\"".concat(type, "\")) { uid }}"))];
                    case 1:
                        res = _a.sent();
                        if (!(res === null || res === void 0 ? void 0 : res.vertices)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.newTransaction(true).delete(res.vertices)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        (0, debug_logger_1.default)("Clearing all vertices");
                        op = new dgraph.Operation();
                        op.setDropAll(true);
                        return [4 /*yield*/, this.client.alter(op)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        (0, debug_logger_1.default)("Failed to clear:", e_1);
                        throw Error(e_1);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.applySchema = function (schema, retries) {
        if (retries === void 0) { retries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var op, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        (0, debug_logger_1.default)("Apply schema take", retries, "schema: ", schema);
                        op = new dgraph.Operation();
                        op.setSchema(schema);
                        return [4 /*yield*/, this.client.alter(op)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        e_2 = _a.sent();
                        if (!(0, retry_1.shouldRetry)(e_2, retries)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, retry_1.waitPromise)("schema ".concat(schema))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.applySchema(schema, retries + 1)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        (0, debug_logger_1.default)(e_2);
                        throw Error(e_2);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, debug_logger_1.default)("Disconnecting from dgraph");
                this.stub.close();
                return [2 /*return*/];
            });
        });
    };
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map