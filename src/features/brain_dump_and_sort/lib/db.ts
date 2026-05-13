import { sql } from '@/lib/db';


// This allows the driver to work in the browser via HTTP/WebSockets




// 'neon' returns a function that can be used as a tagged template or has a .query method
export const query = (t: string, p?: any[]) => (sql ? (sql as any).query : async () => ({ rows: [] }))(t, p || []);
export { sql };

/**
 * Executes a SQL query with parameters.
 */
export const dbQuery = async (text: string, params?: any[]) => {
    return await (sql ? (sql as any).query : async () => ({ rows: [] }))(text, params || []);
};
