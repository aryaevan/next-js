'use client';

import { Card, Title, Text, TextInput, Button } from '@tremor/react';
import { useState } from 'react';

async function postData(d:any){
  console.log("post data", d);
  const res = await 
    fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                  'Content-type': 'application/json',
              },
              body: JSON.stringify(d),
          }
    );
 
  if (!res.ok) {
    throw new Error('Failed to post data')
  }

  console.log("post ok");
 
  return res;
}

export default function Register() {

  const [input, setInput] = useState({});

  function valueChangeHandler(t: string, n:string){
    setInput((i)=>({...i, [n]:t}));
  }

  async function submitHandler(){
    console.log("submit data", input);
    const get = await postData(input);
    if(get){
      console.log("submit handler result", get);
    }

  }

  

  return (
    <main className="p-4 md:p-10 mx-auto max-w-lg items-center justify-center">
    <div className="text-center">
        <Title>Create Users</Title>
        <Text>Register new user profile.</Text>

        <Card className="mt-6">
            <TextInput placeholder='Full Name' className='mb-4' onValueChange={(v) => valueChangeHandler(v, "name")} />
            <TextInput placeholder='Username' className='mb-4' onValueChange={(v) => valueChangeHandler(v, "username")} />
            <TextInput placeholder='Email Address' className='mb-4' onValueChange={(v) => valueChangeHandler(v, "email")} />
            <TextInput placeholder='Password' className='mb-4' onValueChange={(v) => valueChangeHandler(v, "password")} />
            <div className="text-center">
                <Button onClick={submitHandler}>Submit</Button>
            </div>
        </Card>
        <Card className="mt-6">
            <Text>Already have account? &nbsp;<a href="/user">Login</a> </Text>
        </Card>
    </div>
    </main>

  );
}
