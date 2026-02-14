import { useEffect, useState } from "react";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    
   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {recipes.map((recipe) => (
    <div
      key={recipe.id}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          {recipe.title}
        </h2>

        <p className="text-gray-600 text-sm">
          {recipe.summary}
        </p>

        <button className="mt-4 text-blue-500 font-medium hover:underline">
          View Recipe →
        </button>
      </div>
    </div>
  ))}
</div>
  );
}