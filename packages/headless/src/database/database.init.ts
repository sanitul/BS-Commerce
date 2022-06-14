import { dbConfig } from "config/database";
import { connect as connectToMongoDB } from "./mongodb/connect";
import { connect as connectToMySql } from "./mysql/connect";

type DB = 'MONGO' | 'MYSQL';
export async function connectToDatabase(db: DB) {
    console.log(db);
    try {
        switch (db) {
            
            case 'MONGO':
                await connectToMongoDB();
                break;
            case 'MYSQL':
                await connectToMySql();
                break;
            default:
                throw new Error('No database found to connect');
        }
    }
    catch (err) {
        console.log(err)
        console.error('Error connecting to database');
    }
}