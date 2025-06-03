import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center w-full text-white bg-zinc-950">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
