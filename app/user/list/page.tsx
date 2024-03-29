import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function UserList({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // WHERE name ILIKE ${'%' + search + '%'} 
  const result = await sql`
    SELECT id, name, username, email 
    FROM users 
     
    ;
  `;

  

  const users = result.rows as User[];
  // console.log("user result", users);

  const fakeusers = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@email.com'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      username: 'bobjohn',
      email: 'bob.john@email.com'
    }
  ];


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
