import { sql } from "@vercel/postgres";

export async function POST(request: Request){
    // const res = await request.json();
    // return Response.json(res);

    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    const result = await sql`
        SELECT password
        FROM users
        WHERE username = ${username}`

    const row:any = result.rows;
    const check = row[0].password;

    if(password && password === check){
        return Response.json({status: "password match"});
    }

    return Response.json({password, check, row});
}