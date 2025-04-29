import * as dgraph from "dgraph-js";
import { Transaction } from "./transaction";
/** Connection environment */
export interface Environment {
    host: string;
    port: number;
    debug: boolean;
}
/** Connection represents a GRPC connection to the dgraph server. */
export declare class Connection {
    stub: dgraph.DgraphClientStub;
    client: dgraph.DgraphClient;
    verified: boolean;
    private environment;
    constructor(environment: Environment);
    /** Verifies the connection. There's no connect operation per-se. */
    connect(announce?: boolean): Promise<boolean>;
    /** Returns a new transaction with auto commit (immediate) option. */
    newTransaction(autoCommit?: boolean, readOnly?: boolean): Transaction;
    /** Immediate query with autoCommit transaction */
    query(query: any, variables?: any): Promise<any>;
    /** Clears the graph by dropping all vertices, edges and predicates
     * of the given type - or all types.
     */
    clear(type?: string): Promise<void>;
    applySchema(schema: string, retries?: number): Promise<any>;
    disconnect(): Promise<void>;
}
