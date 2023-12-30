import { Card, Title, Text, TextInput, Button } from '@tremor/react';



export default async function Register() {


  return (
    <main className="p-4 md:p-10 mx-auto max-w-lg items-center justify-center">
    <div className="text-center">
        <Title>Create Users</Title>
        <Text>Register new user profile.</Text>

        <Card className="mt-6">
            <TextInput placeholder='Username' className='mb-4'/>
            <TextInput placeholder='Email Address' className='mb-4'/>
            <TextInput placeholder='Password' className='mb-4'/>
            <div className="text-center">
                <Button>Submit</Button>
            </div>
        </Card>
        <Card className="mt-6">
            <Text>Already have account? &nbsp;<a href="/user">Login</a> </Text>
        </Card>
    </div>
    </main>

  );
}
