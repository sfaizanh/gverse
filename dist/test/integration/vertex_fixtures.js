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
exports.VertexFixtures = exports.Origin = exports.Owner = exports.Pet = exports.graph = exports.conn = void 0;
var gverse_1 = __importDefault(require("../../gverse"));
exports.conn = new gverse_1.default.Connection({
    host: "server",
    port: 9080,
    debug: false
});
exports.graph = new gverse_1.default.Graph(exports.conn);
var Pet = /** @class */ (function (_super) {
    __extends(Pet, _super);
    function Pet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = Pet.name;
        _this.name = "";
        _this.name$ur = "";
        _this.breed = "";
        _this.beforeCreateSet = false;
        _this.afterCreateSet = false;
        _this.beforeUpdateSet = false;
        _this.afterUpdateSet = false;
        _this.beforeDeleteSet = false;
        _this.afterDeleteSet = false;
        _this._edges = {
            owner: gverse_1.default.Edge.toVertex(Owner),
            origin: gverse_1.default.Edge.toVertex(Origin)
        };
        return _this;
        // async loadFrom(graph: Gverse.Graph): Promise<Pet> {
        //   return graph.load(this) as Pet
        // }
    }
    Pet.create = function (name, breed) {
        var pet = new Pet();
        pet.name = name;
        pet.breed = breed;
        return pet;
    };
    Pet.prototype.getAdoptedBy = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.graph.link(this, owner, "owner")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadFrom(exports.graph)];
                    case 2:
                        updated = _a.sent();
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    Pet.prototype.escape = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.graph.unlink(this, owner, "owner")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadFrom(exports.graph)];
                    case 2:
                        updated = _a.sent();
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    Pet.prototype.beforeCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.beforeCreateSet = true;
                return [2 /*return*/];
            });
        });
    };
    Pet.prototype.afterCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.afterCreateSet = true;
                return [2 /*return*/];
            });
        });
    };
    Pet.prototype.beforeUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.beforeUpdateSet = true;
                return [2 /*return*/];
            });
        });
    };
    Pet.prototype.afterUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.afterUpdateSet = true;
                return [2 /*return*/];
            });
        });
    };
    Pet.prototype.beforeDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.beforeDeleteSet = true;
                return [2 /*return*/];
            });
        });
    };
    Pet.prototype.afterDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.afterDeleteSet = true;
                return [2 /*return*/];
            });
        });
    };
    return Pet;
}(gverse_1.default.Vertex));
exports.Pet = Pet;
var Owner = /** @class */ (function (_super) {
    __extends(Owner, _super);
    function Owner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = Owner.name;
        _this.name = "";
        _this._edges = {
            pets: gverse_1.default.Edge.toVertices(Pet)
            // @todo pets: Gverse.Edge.fromVertices(Pet, "owner")
        };
        return _this;
    }
    Owner.create = function (name) {
        var owner = new Owner();
        owner.name = name;
        return owner;
    };
    return Owner;
}(gverse_1.default.Vertex));
exports.Owner = Owner;
var Origin = /** @class */ (function (_super) {
    __extends(Origin, _super);
    function Origin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = Origin.name;
        _this.name = "";
        _this.pets = [];
        _this._edges = {
            pets: gverse_1.default.Edge.toVertices(Pet, { reverseOf: "origin" })
        };
        return _this;
    }
    Origin.create = function (name) {
        return new Origin().unmarshal({ name: "Toronoto" });
    };
    return Origin;
}(gverse_1.default.Vertex));
exports.Origin = Origin;
var VertexFixtures = /** @class */ (function () {
    function VertexFixtures() {
    }
    VertexFixtures.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var indices, types;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.conn.clear(Pet.name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, exports.conn.clear(Owner.name)];
                    case 2:
                        _a.sent();
                        indices = "\n      name: string @index(exact) @lang .\n      origin: [uid] @reverse .\n      breed: string .\n      owner: uid .\n      pets: [uid] .\n    ";
                        types = "\n      type Origin {\n        name\n        <~origin>\n      }\n      type Owner {\n        name\n        pets\n      }\n      type Pet {\n        name\n        breed\n        owner\n        origin\n      }\n    ";
                        return [4 /*yield*/, exports.conn.applySchema(indices + types)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VertexFixtures.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.clear()];
                    case 1:
                        _d.sent();
                        _a = this;
                        return [4 /*yield*/, exports.graph.create(Pet.create("Biggles", "Cat"))];
                    case 2:
                        _a.pet = (_d.sent());
                        _b = this;
                        return [4 /*yield*/, exports.graph.create(Owner.create("Austin"))];
                    case 3:
                        _b.owner = (_d.sent());
                        _c = this;
                        return [4 /*yield*/, exports.graph.create(Origin.create("Toronto"))];
                    case 4:
                        _c.origin = (_d.sent());
                        return [2 /*return*/, this];
                }
            });
        });
    };
    return VertexFixtures;
}());
exports.VertexFixtures = VertexFixtures;
//# sourceMappingURL=vertex_fixtures.js.map