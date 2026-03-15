import { prisma } from "@/lib/db"
import { addToCart } from "@/app/actions/cart"

export default async function ProductPage({ params }: any) {

  const { productId } = await params

  const product = await prisma.product.findUnique({
    where: { id: productId }
  })

  if (!product) return <div>Product not found</div>

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-4">
        {product.title}
      </h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          className="rounded-lg mb-6"
        />
      )}

      <p className="text-gray-400 mb-6">
        {product.description}
      </p>

      <p className="text-2xl font-bold mb-6">
        ${product.price}
      </p>

      <form action={addToCart.bind(null, product.id, product.shopId)}>
        <button className="bg-green-500 px-6 py-3 rounded-lg text-black font-semibold">
        <input 
          type="file"
          name="image"
        />
          Add to Cart
        </button>
      </form>

    </div>
  )
}