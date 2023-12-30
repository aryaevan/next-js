import { Card, Title, Text, TextInput, Button } from '@tremor/react';



export default async function Login() {


  return (
    <main className="p-4 md:p-10 mx-auto max-w-lg items-center justify-center">
    <div className="text-center">
        <Title>Login</Title>
        <Text>Insert your credential to enter your profile</Text>

        <Card className="mt-6">
            <TextInput placeholder='Username' className='mb-4'/>
            <TextInput placeholder='Password' className='mb-4'/>
            <div className="text-center">
                <Button>Login</Button>
            </div>
        </Card>
        <Card className="mt-6">
            <Text>Don&apos;t have account? &nbsp;<a href="user/new">Create One</a> </Text>
        </Card>
    </div>
    </main>

  );
}
