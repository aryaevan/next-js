import { sql } from "@vercel/postgres";

export async function GET(){
    const result = await sql`
        SELECT id, name, username, email 
        FROM users;
    `;
    return Response.json(result)
}

export async function POST(request: Request){
    // const res = await request.json();
    // return Response.json(res);

    const data = await request.json();
    if(data) {
    const username = data.username;
    const email = data.email;
    const name = data.name;
    const password = data.password;

    const res = await sql`
        INSERT INTO public.users
        (email, "name", username, "password")
        VALUES(${email}, ${name}, ${username}, MD5(${username+password}) );`

    // return new Response(
    //     'done',
    //     {
    //         status: 200,
    //     }
    // );
    return Response.json(res);
    }

    return Response.json({error: "invalid form data"});
}