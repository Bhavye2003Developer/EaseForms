import { features } from "@/utils/constants";

export default function Features() {
  return (
    <section className="w-full bg-zinc-950 pb-5 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
