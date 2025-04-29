import { Connection } from "./connection";
import { Transaction } from "./transaction";
import { Vertex } from "./vertex";
export interface QueryOptions {
    order?: string;
    /** Maximum number of vertices to return, useful for pagination with offset. */
    limit?: number;
    /** Offset for paginated results. Use with limit. */
    offset?: number;
}
/** Graph represents a connected graph and convenient features graph operations
 * with vertices and edges.
 */
export declare class Graph {
    private connection;
    constructor(connection: Connection);
    indices: string;
    types: string;
    /** Verifies that a connection can be made to the graph server */
    connect(announce?: boolean): Promise<void>;
    /** Connect to a given connection */
    connectTo(connection: Connection, announce?: boolean): Promise<void>;
    /** Get a new transaction on the current connection.
     * @param autoCommit Automatically commit after first mutation. Default: false
     */
    newTransaction(autoCommit?: boolean): Transaction;
    /** Deletes all vertices of matching */
    clear(type?: string): Promise<void>;
    /** Set up default Gverse schema and create all indices  */
    setIndicesAndTypes(): Promise<void>;
    /** Get a vertex from the graph with *all* predicates for given uid. */
    get(vertexClass: typeof Vertex, uid: string, depth?: number, transaction?: Transaction): Promise<Vertex | undefined>;
    /** Get values of any Vertex type by uid */
    uid(uid: string, transaction?: Transaction, depth?: number): Promise<any>;
    /** Load a vertex from the graph with *all* predicates for given uid for
     * given depth. */
    load(vertex: Vertex, depth?: number, transaction?: Transaction): Promise<Vertex | undefined>;
    /** Query and unmarshal matching vertices using full GraphQL± query.
     * Result must be named "vertices" for unmarshaling to work. E.g.
     *   `{vertices(func:uid("0x1)) { uid name }}`.
     *
     * For custom queries that do not require unmarshaling, use Transaction.query.
     */
    query(vertexClass: typeof Vertex, query: string, parameters?: any, transaction?: Transaction, depth?: number): Promise<Vertex[] | undefined>;
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
    queryWithFunction(vertexClass: typeof Vertex, queryFunction: string, transaction?: Transaction, depth?: number): Promise<Vertex[] | undefined>;
    /** Query and unmarshal matching vertices */
    all(vertexClass: typeof Vertex, { order, limit, offset }?: QueryOptions, transaction?: Transaction, depth?: number): Promise<Vertex[] | undefined>;
    /** Get the first vertex from the graph with matching `predicate = value`. */
    first(vertexClass: typeof Vertex, { predicate, value }: {
        predicate: string;
        value: string;
    }, transaction?: Transaction, depth?: number): Promise<Vertex | undefined>;
    /** Create a vertex in the graph based on given instance. Returns the vertex with new uid. */
    create(vertex: Vertex, traverse?: boolean, transaction?: Transaction): Promise<Vertex | undefined>;
    /** Create a vertex in the graph based on given prototype. Returns the vertex with new uid. */
    delete(vertex: Vertex, traverse?: boolean, transaction?: Transaction): Promise<boolean>;
    /** Save the current values into the graph. Returns the vertex with uid. */
    update(vertex: Vertex, traverse?: boolean, transaction?: Transaction): Promise<Vertex | undefined>;
    /** Save the current values into the graph. Returns the vertex with uid. */
    save(vertex: Vertex, traverse?: boolean, transaction?: Transaction): Promise<Vertex | undefined>;
    /** High performance set properties (predicate values) as is on a vertex of given UID.
     * Do not pass vertices as values. Pass just the values you want to mutate.
     *
     * E.g.: `Graph.set(person.uid, {name: "Zak"})`
     *
     * Note: This method is for fast mutation without type-validation and hooks.
     */
    set(uid: string, values: any, transaction?: Transaction): Promise<string | undefined>;
    /** Connect a vertex (subject) to another vertex (object) as predicate */
    link(from: Vertex, to: Vertex, predicate: string, transaction?: Transaction): Promise<string | undefined>;
    /** Disconnect a vertex (object) from another vertex (subject) as predicate */
    unlink(from: Vertex, to: Vertex, predicate: string, transaction?: Transaction): Promise<string | undefined>;
    /** Disconnect the associated connection */
    disconnect(): Promise<void>;
    /** Returns the JSON expansion phrase for nested vertices */
    static expansion(depth: number): string;
    /** Create an array of expansion phrases */
    static Depths: string[];
}
