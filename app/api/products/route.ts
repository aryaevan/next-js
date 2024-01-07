import { sql } from "@vercel/postgres";

// GET IS FOR THE PRODUCT LIST
export async function GET(){

    // {
    //     id: 1,
    //     name: 'Earthen Bottle',
    //     href: '#',
    //     price: '$48',
    //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    //     imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    //   },
    const result = await sql`
        SELECT id, name, price, images 
        FROM products;
    `;
    const rows = result.rows;
    const list = rows.map(item => ({
        id: item.id,
        name: item.name,
        href: '#', // You can set the actual href value if available
        price: item.price,
        imageSrc: item.images[0].src, // Assuming you want the first image source
        imageAlt: item.images[0].alt
    }));

    return Response.json(list);
}

//POST IS FOR THE NEW PRODUCT INPUT

export async function POST(request: Request) {
    try {
        console.log("Add new product started");
        const data = await request.json();
        console.log("Product data:", data);

        if (data) {
            const name = data.name;
            const price = data.price;
            const href = data.href;
            const description = data.description;
            const images = JSON.stringify(data.images);
            const breadcrumbs = JSON.stringify(data.breadcrumbs);
            const colors = JSON.stringify(data.colors);
            const sizes = JSON.stringify(data.sizes);
            const highlights = JSON.stringify(data.highlights);
            const details = data.details;

            await sql`
                INSERT INTO public.products
                (name, price, href, description, images, breadcrumbs, colors, sizes, highlights, details)
                VALUES(${name}, ${price}, ${href}, ${description}, ${images}, ${breadcrumbs}, ${colors}, ${sizes}, ${highlights}, ${details});`;

            return new Response(
                JSON.stringify({ message: 'Product added successfully' }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        return new Response(
            JSON.stringify({ error: "Invalid form data" }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error("Error adding product:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}


// PUT IS FOR EDITING PRODUCT DETAIL
export async function PUT(request: Request) {
    const {searchParams} = new URL(request.url);
    const productId = searchParams.get("id");
    try {
        const data = await request.json();

        if (!productId) {
            return new Response(
                JSON.stringify({ error: "Invalid product ID" }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const res = await sql`
            UPDATE public.products
            SET
                name = ${data.name},
                price = ${data.price},
                href = ${data.href},
                description = ${data.description},
                images = ${JSON.stringify(data.images)},
                breadcrumbs = ${JSON.stringify(data.breadcrumbs)},
                colors = ${JSON.stringify(data.colors)},
                sizes = ${JSON.stringify(data.sizes)},
                highlights = ${JSON.stringify(data.highlights)},
                details = ${data.details}
            WHERE id = ${productId};`;

        if (res) {
            return new Response(
                JSON.stringify({ message: 'Product updated successfully' }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'Product not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}


// DELETE TO DELETE PRODUCT FROM LISTING
export async function DELETE(request: Request) {
    const {searchParams} = new URL(request.url);
    const productId = searchParams.get("id");

    // console.log("delete product request", productid);
    try {
        if (!productId) {
            return new Response(
                JSON.stringify({ error: "Invalid product ID" }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const res = await sql`
            DELETE FROM public.products
            WHERE id = ${productId};`;

        if (res) {
            console.log("delete result ",res);
            return new Response(
                JSON.stringify({ message: 'Product deleted successfully' }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'Product not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
