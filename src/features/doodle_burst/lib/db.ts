import { sql } from '@/lib/db';


export const pool = { query: (t, p) => (sql ? (sql ? (sql as any).query : async () => ({ rows: [] })) : async () => ({ rows: [] }))(t, p || []) };

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log("executed query", { text, duration, rows: res.rowCount });
        return res;
    } catch (err) {
        console.error("query error", err);
        throw err;
    }
};
