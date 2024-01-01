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

    console.log("register new user start");
    const data = await request.json();
    console.log("register data", data);
    if(data) {
    const username = data.username;
    const email = data.email;
    const name = data.name;
    const password = data.password;

    console.log("register query:  ", `
    INSERT INTO public.users
    (email, "name", username, "password")
    VALUES(${email}, ${name}, ${username}, MD5(${username+password}) );` )

    const res = await sql`
        INSERT INTO public.users
        (email, "name", username, "password")
        VALUES(${email}, ${name}, ${username}, MD5(${username+password}) );`;

    

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