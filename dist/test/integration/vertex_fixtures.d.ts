import Gverse from "../../gverse";
export declare const conn: Gverse.Connection;
export declare const graph: Gverse.Graph;
export declare class Pet extends Gverse.Vertex {
    type: string;
    name: string;
    name$ur: string;
    breed: string;
    origin?: Origin;
    owner?: Owner;
    beforeCreateSet: boolean;
    afterCreateSet: boolean;
    beforeUpdateSet: boolean;
    afterUpdateSet: boolean;
    beforeDeleteSet: boolean;
    afterDeleteSet: boolean;
    _edges: any;
    static create(name: string, breed: string): Pet;
    getAdoptedBy(owner: Owner): Promise<Pet>;
    escape(owner: Owner): Promise<Pet>;
    beforeCreate(): Promise<void>;
    afterCreate(): Promise<void>;
    beforeUpdate(): Promise<void>;
    afterUpdate(): Promise<void>;
    beforeDelete(): Promise<void>;
    afterDelete(): Promise<void>;
}
export declare class Owner extends Gverse.Vertex {
    type: string;
    name: string;
    pets?: Pet[];
    _edges: any;
    static create(name: string): Owner;
}
export declare class Origin extends Gverse.Vertex {
    type: string;
    name: string;
    pets: Pet[];
    _edges: any;
    static create(name: string): Origin;
}
export declare class VertexFixtures {
    pet?: Pet;
    owner?: Owner;
    origin?: Origin;
    private clear;
    build(): Promise<this>;
}
