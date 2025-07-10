export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-green-700 dark:text-green-400">
        🌿 About Plantventory
      </h1>

      <p className="mb-6 text-lg">
        <strong>Plantventory</strong> is your personal plant management tool
        designed to help you{" "}
        <span className="font-medium">
          track, manage, and organize your plant discoveries
        </span>{" "}
        with ease. Whether you are a plant enthusiast or just getting started,
        Plantventory lets you easily{" "}
        <span className="font-medium">create, save, edit, and delete</span>{" "}
        plant records as your collection grows.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600 dark:text-green-300">
        🔧 What You Can Do
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>✅ Create new plant entries</li>
        <li>✏️ Edit existing plants anytime</li>
        <li>🗑️ Delete plants from your list</li>
        <li>🔍 Search and filter your plants</li>
        <li>🔐 Secure user authentication</li>
        <li>📁 Save and manage your favorite plant discoveries</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600 dark:text-green-300">
        🚀 Why Plantventory?
      </h2>
      <p className="mb-6">
        Managing your plant collection shouldn’t be a chore. Plantventory is
        built for simplicity, speed, and security — making it easy to log every
        leaf, fern, and flower you find.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600 dark:text-green-300">
        🛠️ Tech Stack
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>⚡ Next.js & TypeScript – modern, fast web app foundation</li>
        <li>
          📦 Prisma & PostgreSQL – powerful and flexible database handling
        </li>
        <li>🎨 Tailwind CSS – clean, responsive design</li>
        <li>🔐 Stack Auth – secure login and session management</li>
        <li>🌐 Neon & Vercel – cloud-native deployment and hosting</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600 dark:text-green-300">
        🌱 Ready to Grow?
      </h2>
      <p>
        Create an account, start exploring, and build your unique Plantventory
        today.
      </p>
    </main>
  );
}
