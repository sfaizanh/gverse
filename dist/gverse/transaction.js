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
exports.Transaction = void 0;
var dgraph = __importStar(require("dgraph-js"));
var debug_logger_1 = __importDefault(require("./debug-logger"));
var uuid_1 = require("uuid");
var retry_1 = require("./retry");
/** Represents a dgraph transaction that can be created on demand or explicitly. */
var Transaction = /** @class */ (function () {
    function Transaction(connection, autoCommit, verifyConnection, readOnly) {
        if (verifyConnection === void 0) { verifyConnection = false; }
        if (readOnly === void 0) { readOnly = false; }
        this.uuid = (0, uuid_1.v4)();
        if (verifyConnection && !(connection === null || connection === void 0 ? void 0 : connection.verified)) {
            var issue = "Can not create transaction. No verified connection.";
            (0, debug_logger_1.default)(issue);
            throw Error(issue);
        }
        this.connection = connection;
        this.autoCommit = autoCommit;
        this.txn = connection.client.newTxn({ readOnly: readOnly });
    }
    /** Commit the transaction and apply all operations. */
    Transaction.prototype.commit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // todo check if transaction already committed
                    return [4 /*yield*/, this.txn.commit()];
                    case 1:
                        // todo check if transaction already committed
                        _a.sent();
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " committed"));
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Discard all pending operations */
    Transaction.prototype.discard = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.txn.discard()];
                    case 1:
                        _a.sent();
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " aborted"));
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Returns object representation of the response JSON */
    Transaction.prototype.query = function (query, variables, retries) {
        if (retries === void 0) { retries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " querying"), query, variables ? " (variables: ".concat(JSON.stringify(variables), ")") : "");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 10]);
                        if (!variables) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.txn.queryWithVars(query, variables)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.txn.query(query)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        res = _a;
                        (0, debug_logger_1.default)("Query response:", res.getJson());
                        return [2 /*return*/, res.getJson()];
                    case 6:
                        e_1 = _b.sent();
                        (0, debug_logger_1.default)(e_1);
                        try {
                            void this.txn.discard();
                        }
                        catch (e) {
                            (0, debug_logger_1.default)(e);
                        }
                        if (!(0, retry_1.shouldRetry)(e_1, retries)) return [3 /*break*/, 9];
                        this.txn = this.connection.client.newTxn({ readOnly: true });
                        return [4 /*yield*/, (0, retry_1.waitPromise)("query ".concat(query))];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.query(query, variables, retries + 1)];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9:
                        (0, debug_logger_1.default)("Failed to query:", query, "; error:", e_1);
                        throw Error(e_1);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /** Mutate json-compliant object into graph space */
    Transaction.prototype.mutate = function (values, retries) {
        var _a;
        if (retries === void 0) { retries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var mu, uidMap, updatedUid, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " mutating"), JSON.stringify(values));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 7]);
                        if (!values.uid) {
                            values.uid = "_:createdUid";
                        }
                        mu = new dgraph.Mutation();
                        mu.setCommitNow(this.autoCommit);
                        mu.setSetJson(values);
                        return [4 /*yield*/, this.txn.mutate(mu)];
                    case 2:
                        uidMap = _b.sent();
                        updatedUid = (_a = uidMap.getUidsMap().get("createdUid")) !== null && _a !== void 0 ? _a : values.uid;
                        if (!updatedUid) {
                            return [2 /*return*/, values.uid];
                        }
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " mutated with new uid"), updatedUid);
                        return [2 /*return*/, updatedUid];
                    case 3:
                        e_2 = _b.sent();
                        (0, debug_logger_1.default)(e_2);
                        try {
                            void this.txn.discard();
                        }
                        catch (e) {
                            (0, debug_logger_1.default)(e);
                        }
                        if (!(0, retry_1.shouldRetry)(e_2, retries)) return [3 /*break*/, 6];
                        this.txn = this.connection.client.newTxn();
                        return [4 /*yield*/, (0, retry_1.waitPromise)("mutate ".concat(JSON.stringify(values)))];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.mutate(values, retries + 1)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: throw Error(e_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /** Run an RDF mutation set a single predicate */
    Transaction.prototype.mutateNquads = function (subject, predicate, object) {
        return __awaiter(this, void 0, void 0, function () {
            var nquad, mu, assigned, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (object === null)
                            return [2 /*return*/];
                        nquad = "".concat(subject, " <").concat(predicate, "> ").concat(object, " .");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " mutating nquad: ").concat(nquad));
                        mu = new dgraph.Mutation();
                        mu.setCommitNow(this.autoCommit);
                        mu.setSetNquads(nquad);
                        return [4 /*yield*/, this.txn.mutate(mu)];
                    case 2:
                        assigned = _a.sent();
                        return [2 /*return*/, assigned.getUidsMap().get("blank-0")];
                    case 3:
                        e_3 = _a.sent();
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " mutating failed"), nquad, e_3);
                        void this.txn.discard();
                        throw Error(e_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Run an RDF mutation to delete a single predicate */
    Transaction.prototype.deleteNquads = function (subject, predicate, object) {
        return __awaiter(this, void 0, void 0, function () {
            var nquad, mu, assigned, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (object === null)
                            return [2 /*return*/];
                        nquad = "".concat(subject, " <").concat(predicate, "> ").concat(object, " .");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " deleting Nquad: ").concat(nquad));
                        mu = new dgraph.Mutation();
                        mu.setCommitNow(this.autoCommit);
                        mu.setDelNquads(nquad);
                        return [4 /*yield*/, this.txn.mutate(mu)];
                    case 2:
                        assigned = _a.sent();
                        return [2 /*return*/, assigned.getUidsMap().get("blank-0")];
                    case 3:
                        e_4 = _a.sent();
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " delete nquad failed"), nquad, e_4);
                        void this.txn.discard();
                        throw Error(e_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Delete vertices with given values. Values should be a list
     * of objects with uids or an object with uid.
     */
    Transaction.prototype.delete = function (values, retries) {
        if (retries === void 0) { retries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var mu, uid, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " deleting values"), values);
                        if (!values.uid && values.length < 1) {
                            (0, debug_logger_1.default)("Nothing to delete");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 7]);
                        mu = new dgraph.Mutation();
                        mu.setCommitNow(this.autoCommit);
                        mu.setDeleteJson(values);
                        return [4 /*yield*/, this.txn.mutate(mu)];
                    case 2:
                        uid = _a.sent();
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " deleted"), uid);
                        return [2 /*return*/, uid.getUidsMap().get("blank-0")];
                    case 3:
                        e_5 = _a.sent();
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " delete failed"), values, e_5);
                        try {
                            void this.txn.discard();
                        }
                        catch (e) {
                            (0, debug_logger_1.default)(e);
                        }
                        if (!(0, retry_1.shouldRetry)(e_5, retries)) return [3 /*break*/, 6];
                        this.txn = this.connection.client.newTxn();
                        return [4 /*yield*/, (0, retry_1.waitPromise)("delete ".concat(JSON.stringify(values)))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.query(values, retries + 1)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        (0, debug_logger_1.default)("Failed to delete:", values, "; error:", e_5);
                        throw Error(e_5);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /** Run upsert blocks in graph space */
    Transaction.prototype.upsert = function (query, values, condition, retries) {
        if (retries === void 0) { retries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var mu, req, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, debug_logger_1.default)("Transaction ".concat(this.uuid, " running upsert"), query, JSON.stringify(values), condition !== null && condition !== void 0 ? condition : "");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 7]);
                        mu = new dgraph.Mutation();
                        mu.setSetJson(values);
                        if (condition)
                            mu.setCond("@if(".concat(condition, ")"));
                        req = new dgraph.Request();
                        req.setQuery("query ".concat(query));
                        req.setMutationsList([mu]);
                        req.setCommitNow(this.autoCommit);
                        return [4 /*yield*/, this.txn.doRequest(req)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_6 = _a.sent();
                        (0, debug_logger_1.default)(e_6);
                        try {
                            void this.txn.discard();
                        }
                        catch (e) {
                            (0, debug_logger_1.default)(e);
                        }
                        if (!(0, retry_1.shouldRetry)(e_6, retries)) return [3 /*break*/, 6];
                        this.txn = this.connection.client.newTxn();
                        return [4 /*yield*/, (0, retry_1.waitPromise)("upsert")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.upsert(query, values, condition, retries + 1)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: throw Error(e_6);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map