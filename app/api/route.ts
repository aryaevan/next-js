import { sql } from "@vercel/postgres";



export async function GET(){
    const result = await sql`
        SELECT id, name, username, email 
        FROM users;
    `;
    return Response.json(result)
}