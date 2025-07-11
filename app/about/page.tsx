export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🌿 About GreenStock</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">
            <strong>GreenStock</strong> is your personal plant management tool
            designed to help you organize and track your plant collection with ease.
          </p>
          
          <p className="mb-6">
            GreenStock lets you easily{" "}
            <strong>add, edit, and manage</strong> your plants with detailed
            information including names, descriptions, categories, prices, and stock
            levels. Our intuitive interface makes plant inventory management
            simple and efficient.
          </p>
          
          <div className="bg-muted p-6 rounded-lg my-8">
            <h2 className="text-2xl font-semibold mb-4">🚀 Why GreenStock?</h2>
            <ul className="space-y-3">
              <li>
                <strong>Simple Management:</strong> Managing your plant collection shouldn't be a chore. GreenStock is
                designed with simplicity in mind, making it easy to add and organize your plants.
              </li>
              <li>
                <strong>Detailed Tracking:</strong> Keep track of important details like plant names, descriptions,
                categories, prices, and stock levels all in one place.
              </li>
              <li>
                <strong>Visual Organization:</strong> Upload images of your plants to create a visual inventory
                that helps you identify and manage your collection.
              </li>
              <li>
                <strong>Category System:</strong> Organize your plants by categories like Indoor, Outdoor,
                Succulent, Flowering, Herb, Fern, Tree, and Shrub.
              </li>
              <li>
                <strong>Stock Management:</strong> Track how many of each plant you have in stock, perfect for
                nurseries, garden centers, or personal collections.
              </li>
            </ul>
          </div>
          
          <p className="text-lg">
            Create an account, start exploring, and build your unique GreenStock
            collection today!
          </p>
        </div>
      </div>
    </div>
  );
}
