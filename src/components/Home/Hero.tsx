import { useUser } from "@clerk/nextjs";
export default function Hero() {
  const { isSignedIn, user } = useUser();

  return (
    <section className="w-full text-center px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        {isSignedIn
          ? `Welcome back, ${user.firstName}, to Easeforms!`
          : "Welcome to Easeforms!"}
      </h2>

      <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-2xl mx-auto">
        Create, preview, and manage beautiful forms with advanced features like
        timed forms, live preview, drag-and-drop, and more.
      </p>

      <button className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition">
        Start Building Now
      </button>
    </section>
  );
}
