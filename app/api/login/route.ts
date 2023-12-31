export async function POST(request: Request){
    const res = await request.json();
    return Response.json(res);

    // const formData = await request.formData();
    // const username = formData.get('username');
    // const password = formData.get('password');

    // return Response.json({username, password});
}