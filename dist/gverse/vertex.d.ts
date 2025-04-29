import { Graph } from "./graph";
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
export declare class Vertex {
    uid: string | undefined;
    /** Vertex type: Required for all vertices and stored as indexed predicate */
    type: string;
    /** Defines the edges and their cardinalities. E.g.:
     * `_edges = { mother: Edge.toVertex(Person), children: Edge.toVertices(Person) }`
     */
    _edges: any;
    _graph?: Graph;
    /** Apply operations on the provided graph instance */
    set graph(graph: Graph);
    get graph(): Graph;
    /** Load the latest state from the graph */
    loadFrom(graph: Graph): Promise<any>;
    /** Save the current state of the vertex to the graph.
     * @param traverse whether or not do marshal linked edges
     */
    saveInto(graph: Graph, traverse?: boolean): Promise<boolean>;
    /** Creates the given vertex to the graph.
     * @param traverse whether or not do marshal linked edges
     */
    createInto(graph: Graph, traverse?: boolean): Promise<any>;
    /** Deletes the given vertex from the graph.
     * @param traverse whether or not do marshal linked edges
     */
    deleteFrom(graph: Graph, traverse?: boolean): Promise<any>;
    /** Hook for before create processing. Called just before creating in the graph. */
    beforeCreate(values: any): Promise<any>;
    /** Hook for after create processing. Called right after creation. */
    afterCreate(values: any): Promise<any>;
    /** Hook for before update processing Called just before updating the graph.*/
    beforeUpdate(beforeValues: any, afterValues: any): Promise<any>;
    /** Hook for after update processing. Called right after update. */
    afterUpdate(beforeValues: any, afterValues: any): Promise<any>;
    /** Hook for before delete processing. Called just before deleting from the graph.*/
    beforeDelete(values: any): Promise<any>;
    /** Hook for after delete  processing. Called right after deleting from the graph. */
    afterDelete(values: any): Promise<any>;
    /** Get all values as JSON-complaint object.
     * @param traverse whether or not do marshal linked edges
     */
    autoMarshal(traverse?: boolean): any;
    /** Unmarshal through introspection */
    autoUnmarshal(vertex: any, values: any): any;
    /** Property is true when product has a Dgraph UID. */
    existsInGraph(): boolean;
    /** Get JSON-complaint object representation. By default, it uses the [[autoMarshal]] feature.
     * @param traverse whether or not do marshal linked edges
     */
    marshal(traverse?: boolean): any;
    /** Set predicates from JSON-compliant values */
    unmarshal(values: any): any;
}
