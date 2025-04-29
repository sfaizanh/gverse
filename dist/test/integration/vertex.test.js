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
Object.defineProperty(exports, "__esModule", { value: true });
var vertex_fixtures_1 = require("./vertex_fixtures");
describe("Vertex", function () {
    var pet;
    var owner;
    var origin;
    var fixtures;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vertex_fixtures_1.graph.connect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vertex_fixtures_1.graph.disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, vertex_fixtures_1.conn.clear(vertex_fixtures_1.Pet.name)];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, vertex_fixtures_1.conn.clear(vertex_fixtures_1.Owner.name)];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, vertex_fixtures_1.conn.clear(vertex_fixtures_1.Origin.name)];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, new vertex_fixtures_1.VertexFixtures().build()];
                case 4:
                    fixtures = _d.sent();
                    pet = (_a = fixtures.pet) !== null && _a !== void 0 ? _a : fail();
                    owner = (_b = fixtures.owner) !== null && _b !== void 0 ? _b : fail();
                    origin = (_c = fixtures.origin) !== null && _c !== void 0 ? _c : fail();
                    return [2 /*return*/];
            }
        });
    }); });
    it("has uid", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(pet.uid).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    describe("marshaling", function () {
        it("auto marshals", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tom, values;
            return __generator(this, function (_a) {
                tom = new vertex_fixtures_1.Pet();
                tom.name = "Tom";
                tom.name$ur = "ٹوم";
                values = tom.marshal();
                expect(values.name).toBe("Tom");
                expect(values).not.toContain("graph");
                expect(values["name@ur"]).toBe("ٹوم");
                return [2 /*return*/];
            });
        }); });
    });
    describe("unmarshaling", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vertex_fixtures_1.graph.link(owner, pet, "pets")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, vertex_fixtures_1.graph.link(pet, owner, "owner")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("auto unmarshals one to many edge", function () { return __awaiter(void 0, void 0, void 0, function () {
            var owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vertex_fixtures_1.graph.first(vertex_fixtures_1.Owner, {
                            predicate: "name",
                            value: "Austin"
                        })];
                    case 1:
                        owner = (_a.sent());
                        if (!owner.pets)
                            fail("No pets found");
                        else {
                            expect(owner.pets[0]).toBeInstanceOf(vertex_fixtures_1.Pet);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it("auto unmarshals one to one edge", function () { return __awaiter(void 0, void 0, void 0, function () {
            var pet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vertex_fixtures_1.graph.first(vertex_fixtures_1.Pet, {
                            predicate: "name",
                            value: "Biggles"
                        })];
                    case 1:
                        pet = (_a.sent());
                        if (!pet.owner)
                            fail("No owner found");
                        else {
                            expect(pet.owner).toBeInstanceOf(vertex_fixtures_1.Owner);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("querying", function () {
        it("gets all", function () { return __awaiter(void 0, void 0, void 0, function () {
            var pets, names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vertex_fixtures_1.graph.all(vertex_fixtures_1.Pet)];
                    case 1:
                        pets = (_a.sent());
                        names = pets.map(function (p) { return p.name; });
                        expect(names).toEqual(["Biggles"]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("gets first", function () { return __awaiter(void 0, void 0, void 0, function () {
            var pet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vertex_fixtures_1.graph.first(vertex_fixtures_1.Pet, {
                            predicate: "name",
                            value: "Biggles"
                        })];
                    case 1:
                        pet = (_a.sent());
                        expect(pet.name).toBe("Biggles");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("updating", function () {
        it("sets values", function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldBreed, newBreed, updatedPet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldBreed = "Cat";
                        newBreed = "Sphinx";
                        expect(pet.breed).toBe(oldBreed); // precondition
                        if (!!pet.uid) return [3 /*break*/, 1];
                        fail("No uid");
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, vertex_fixtures_1.graph.set(pet.uid, { breed: newBreed })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, vertex_fixtures_1.graph.get(vertex_fixtures_1.Pet, pet.uid)];
                    case 3:
                        updatedPet = (_a.sent());
                        expect(updatedPet.breed).toBe(newBreed);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("updates", function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldBreed, newBreed, updatedPet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldBreed = "Cat";
                        newBreed = "Sphinx";
                        expect(pet.breed).toBe(oldBreed); // precondition
                        if (!!pet.uid) return [3 /*break*/, 1];
                        fail("No uid");
                        return [3 /*break*/, 4];
                    case 1:
                        pet.breed = newBreed;
                        return [4 /*yield*/, pet.saveInto(vertex_fixtures_1.graph)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, vertex_fixtures_1.graph.get(vertex_fixtures_1.Pet, pet.uid)];
                    case 3:
                        updatedPet = (_a.sent());
                        expect(updatedPet.breed).toBe(newBreed);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    it("deletes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var deletedPet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!pet.uid) return [3 /*break*/, 3];
                    expect(pet).toBeDefined();
                    return [4 /*yield*/, pet.deleteFrom(vertex_fixtures_1.graph)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, vertex_fixtures_1.graph.get(vertex_fixtures_1.Pet, pet.uid)];
                case 2:
                    deletedPet = _a.sent();
                    if (deletedPet)
                        expect(deletedPet.existsInGraph()).toBe(false);
                    return [3 /*break*/, 4];
                case 3:
                    fail("No pet");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    describe("Linking", function () {
        it("links and unlinks", function () { return __awaiter(void 0, void 0, void 0, function () {
            var linkedPet, unLinkedPet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(pet.owner).toBeUndefined();
                        return [4 /*yield*/, pet.getAdoptedBy(owner)];
                    case 1:
                        linkedPet = _a.sent();
                        expect(linkedPet.owner).toEqual(owner);
                        return [4 /*yield*/, pet.escape(owner)];
                    case 2:
                        unLinkedPet = _a.sent();
                        expect(unLinkedPet.owner).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it("marshals directed edges", function () { return __awaiter(void 0, void 0, void 0, function () {
            var linkedPet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(pet.owner).toBeUndefined();
                        return [4 /*yield*/, pet.getAdoptedBy(owner)];
                    case 1:
                        linkedPet = _a.sent();
                        expect(linkedPet.marshal().owner).toEqual(owner.marshal());
                        return [2 /*return*/];
                }
            });
        }); });
        it("doesn not marshal undirected edges", function () { return __awaiter(void 0, void 0, void 0, function () {
            var originWithPet, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pet.origin = origin;
                        return [4 /*yield*/, pet.saveInto(vertex_fixtures_1.graph)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, origin.loadFrom(vertex_fixtures_1.graph)];
                    case 2:
                        originWithPet = _a.sent();
                        values = originWithPet.marshal();
                        expect(values.pets).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it("undirectioned link", function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedPet, updatedOrigin, saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(origin.pets).toBeUndefined();
                        pet.origin = origin;
                        // traverse = true to link origin to pet
                        return [4 /*yield*/, pet.saveInto(vertex_fixtures_1.graph, true)];
                    case 1:
                        // traverse = true to link origin to pet
                        _a.sent();
                        return [4 /*yield*/, pet.loadFrom(vertex_fixtures_1.graph)];
                    case 2:
                        updatedPet = _a.sent();
                        return [4 /*yield*/, origin.loadFrom(vertex_fixtures_1.graph)];
                    case 3:
                        updatedOrigin = _a.sent();
                        expect(pet.origin.uid).toEqual(origin.uid);
                        expect(updatedOrigin.pets[0].uid).toEqual(pet.uid);
                        // updating a linked object
                        updatedOrigin.name = "Canada";
                        return [4 /*yield*/, updatedOrigin.saveInto(vertex_fixtures_1.graph)];
                    case 4:
                        saved = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("hooks", function () {
        it("calls before and after create", function () { return __awaiter(void 0, void 0, void 0, function () {
            var pet, petFromGraph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pet = new vertex_fixtures_1.Pet();
                        expect(pet.beforeCreateSet).toBe(false);
                        expect(pet.afterCreateSet).toBe(false);
                        return [4 /*yield*/, vertex_fixtures_1.graph.create(pet)];
                    case 1:
                        pet = (_a.sent());
                        return [4 /*yield*/, vertex_fixtures_1.graph.save(pet)]; // apply afterCreate
                    case 2:
                        _a.sent(); // apply afterCreate
                        return [4 /*yield*/, pet.loadFrom(vertex_fixtures_1.graph)];
                    case 3:
                        petFromGraph = (_a.sent());
                        expect(petFromGraph).toBeDefined();
                        expect(petFromGraph.beforeCreateSet).toBe(true);
                        expect(petFromGraph.afterCreateSet).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("calls before and after update", function () { return __awaiter(void 0, void 0, void 0, function () {
            var petFromGraph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(pet.beforeUpdateSet).toBe(false);
                        pet.name = "Garfield";
                        return [4 /*yield*/, pet.saveInto(vertex_fixtures_1.graph)]; // apply beforeUpdate
                    case 1:
                        _a.sent(); // apply beforeUpdate
                        return [4 /*yield*/, pet.saveInto(vertex_fixtures_1.graph)]; // apply afterUpdate
                    case 2:
                        _a.sent(); // apply afterUpdate
                        return [4 /*yield*/, pet.loadFrom(vertex_fixtures_1.graph)];
                    case 3:
                        petFromGraph = (_a.sent());
                        expect(petFromGraph).toBeDefined();
                        expect(petFromGraph.beforeUpdateSet).toBe(true);
                        expect(petFromGraph.afterUpdateSet).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("calls before and after delete", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedPet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(pet.beforeDeleteSet).toBe(false);
                        expect(pet.afterDeleteSet).toBe(false);
                        return [4 /*yield*/, pet.deleteFrom(vertex_fixtures_1.graph)];
                    case 1:
                        deletedPet = _a.sent();
                        expect(deletedPet).toBeDefined();
                        expect(pet.beforeDeleteSet).toBe(true);
                        expect(pet.afterDeleteSet).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("language support", function () {
        it("updates secondary languages", function () { return __awaiter(void 0, void 0, void 0, function () {
            var otherName, petFromGraph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        otherName = "بلئ";
                        expect(pet.name$ur).toEqual("");
                        pet.name$ur = otherName;
                        return [4 /*yield*/, pet.saveInto(vertex_fixtures_1.graph)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pet.loadFrom(vertex_fixtures_1.graph)];
                    case 2:
                        petFromGraph = (_a.sent());
                        if (!petFromGraph)
                            fail("Not found");
                        else
                            expect(petFromGraph.name$ur).toEqual(otherName);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=vertex.test.js.map