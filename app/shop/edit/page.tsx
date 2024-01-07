import { sql } from '@vercel/postgres';
import EditForm from './form';

async function fetchDetail(id:string){
  const res = await sql`
    SELECT *
    FROM products
    WHERE id= ${id}
  `;

  const detail = res.rows[0];
  // console.log("query result", detail );
  return detail;
}



export default async function NewProduct({searchParams}: { searchParams: { id: string }}) {

  const productId = searchParams.id;
  //check productid in url, if not exist redirect to parent url
  if(!productId){window.location.replace("/shop")};

  const data = await fetchDetail(productId);

  // console.log("data result", data);
  
  return (
  <div className='bg-white' >
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <EditForm data={data} />
    </div>
    </div>
  )
}
