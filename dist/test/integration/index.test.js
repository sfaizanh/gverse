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
var gverse_1 = __importDefault(require("../../gverse"));
var config = {
    host: "server",
    port: 9080,
    debug: false
};
describe("Gverse", function () {
    describe("Connection", function () {
        it("connects and disconnects", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connection = new gverse_1.default.Connection(config);
                        _a = expect;
                        return [4 /*yield*/, connection.connect()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBeTruthy();
                        return [4 /*yield*/, connection.disconnect()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Transaction", function () {
        var conn = new gverse_1.default.Connection(config);
        var type = "TestVertex";
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, conn.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, conn.disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, conn.clear(type)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("mutates", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = conn.newTransaction(true);
                        return [4 /*yield*/, tx.mutate({ pet: { name: "Bigglesworth", "dgraph.type": type } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("runs simple upsert", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tx, query, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = conn.newTransaction(true);
                        return [4 /*yield*/, tx.mutate({
                                pet: { name: "James Bigglesworth", "dgraph.type": type }
                            })];
                    case 1:
                        _a.sent();
                        query = "{vertex as var(func: type(".concat(type, ")) }");
                        values = {
                            uid: "uid(vertex)",
                            nickName: "Biggles"
                        };
                        return [4 /*yield*/, conn.newTransaction().upsert(query, values)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("runs conditional upsert", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tx, query, values, condition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = conn.newTransaction(true);
                        return [4 /*yield*/, tx.mutate({
                                pet: { name: "James Bigglesworth", "dgraph.type": type }
                            })];
                    case 1:
                        _a.sent();
                        query = "{vertex as var(func: type(".concat(type, ")) }");
                        values = {
                            uid: "uid(vertex)",
                            nickName: "Biggles"
                        };
                        condition = "eq(len(vertex), 1)";
                        return [4 /*yield*/, conn.newTransaction().upsert(query, values, condition)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("queries", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tx, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = conn.newTransaction(true);
                        return [4 /*yield*/, tx.mutate({ pet: { name: "Biggles", "dgraph.type": type } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, conn
                                .newTransaction()
                                .query("{pets(func:type(".concat(type, ")) {name}}"))];
                    case 2:
                        res = _a.sent();
                        expect(res.pets[0].name).toBe("Biggles");
                        return [2 /*return*/];
                }
            });
        }); });
        it("language support", function () { return __awaiter(void 0, void 0, void 0, function () {
            var urduName, tx, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urduName = "الفا";
                        return [4 /*yield*/, conn.applySchema("\n        <type>: string @index(exact) .\n        <name>: string @lang .\n      ")];
                    case 1:
                        _a.sent();
                        tx = conn.newTransaction(true);
                        return [4 /*yield*/, tx.mutate({
                                pet: { name: "Alpha", "name@ur": urduName, "dgraph.type": type }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, conn
                                .newTransaction()
                                .query("{pets(func:type(".concat(type, ")) {name name@ur}}"))];
                    case 3:
                        res = _a.sent();
                        expect(res.pets[0].name).toBe("Alpha");
                        expect(res.pets[0]["name@ur"]).toBe(urduName);
                        return [2 /*return*/];
                }
            });
        }); });
        it("deletes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tx, newUid, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = conn.newTransaction(true);
                        return [4 /*yield*/, tx.mutate({
                                pet: { name: "Bigglesworth", "dgraph.type": type }
                            })];
                    case 1:
                        newUid = _a.sent();
                        expect(newUid).toBeDefined();
                        return [4 /*yield*/, conn.newTransaction(true).delete({ uid: newUid })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, conn
                                .newTransaction(true)
                                .query("{ pets(func:uid(".concat(newUid, ")) @filter(type(").concat(type, ")) {uid} }"))];
                    case 3:
                        res = _a.sent();
                        expect(res.pets).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("retries conflicting transactions", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tx, uid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = conn.newTransaction(true);
                        return [4 /*yield*/, tx.mutate({
                                pet: { name: "Transient", "dgraph.type": type }
                            })];
                    case 1:
                        uid = _a.sent();
                        return [4 /*yield*/, Promise.all([
                                conn.newTransaction(true).mutate({ uid: uid, name: "Name" }),
                                conn.newTransaction(true).delete({ uid: uid }),
                                conn.newTransaction(true).mutate({ uid: uid, name: "New Name" })
                            ])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Graph", function () {
        it("has expansions", function () {
            expect(gverse_1.default.Graph.expansion(1)).toEqual("uid expand(_all_)");
            expect(gverse_1.default.Graph.expansion(2)).toEqual("uid expand(_all_) { uid expand(_all_) }");
            expect(function () { return gverse_1.default.Graph.expansion(0); }).toThrowError();
            expect(function () { return gverse_1.default.Graph.expansion(11); }).toThrowError();
        });
    });
});
//# sourceMappingURL=index.test.js.map