import { Vertex } from "./vertex";
/** Cardinality of edges connecting 0-1 or 0-N vertices */
export declare enum Cardinality {
    Single = 0,
    Multiple = 1
}
/** Direction of edges to support direction or bidirectional connection */
export declare enum Direction {
    Directed = 0,
    Undirected = 1
}
/** Represents an edge that connect a vertex to one or more vertices.
 * Vertex class should contain _edges to define the edge properties.
 * E.g. ``` _edges = { father: Edge.toVertex(Father) } ```
 * @todo @future Support facets
 */
export declare class Edge {
    type: typeof Vertex;
    cardinality: Cardinality;
    reverseEdgeName: string;
    /** Create an edge definition for zero or one vertex */
    static toVertex(type: typeof Vertex, { reverseOf }?: {
        reverseOf?: string;
    }): Edge;
    /** Get direction of the edge */
    get direction(): Direction;
    /** Create an edge definition for 0 or more vertices */
    static toVertices(type: typeof Vertex, { reverseOf }?: {
        reverseOf?: string;
    }): Edge;
    private static buildEdge;
}
