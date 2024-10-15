// src/lib/db.js
import { Pool } from 'pg';

export const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "db_test",
    password: "123456",
    port: "5432",
});