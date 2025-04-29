import { Connection } from "./connection";
/** Represents a dgraph transaction that can be created on demand or explicitly. */
export declare class Transaction {
    private txn;
    private uuid;
    private connection;
    private autoCommit;
    constructor(connection: Connection, autoCommit: boolean, verifyConnection?: boolean, readOnly?: boolean);
    /** Commit the transaction and apply all operations. */
    commit(): Promise<void>;
    /** Discard all pending operations */
    discard(): Promise<void>;
    /** Returns object representation of the response JSON */
    query(query: string, variables?: any, retries?: number): Promise<any>;
    /** Mutate json-compliant object into graph space */
    mutate(values: any, retries?: number): Promise<any>;
    /** Run an RDF mutation set a single predicate */
    mutateNquads(subject: string, predicate: string, object: string): Promise<string | undefined>;
    /** Run an RDF mutation to delete a single predicate */
    deleteNquads(subject: string, predicate: string, object: string): Promise<string | undefined>;
    /** Delete vertices with given values. Values should be a list
     * of objects with uids or an object with uid.
     */
    delete(values: any, retries?: number): Promise<any>;
    /** Run upsert blocks in graph space */
    upsert(query: string, values: any, condition?: string, retries?: number): Promise<boolean>;
}
