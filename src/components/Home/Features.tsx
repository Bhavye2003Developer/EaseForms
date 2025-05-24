import React from "react";

const features = [
  {
    title: "Create Forms Easily",
    description: "Build and edit forms with an intuitive editor.",
  },
  {
    title: "Answer Types",
    description:
      "Supports long text, short text, multi-select, and multiple choice.",
  },
  {
    title: "Timed Forms",
    description: "Set timers for individual forms to control response time.",
  },
  {
    title: "Drag-and-Drop Ordering",
    description: "Reorder questions easily via drag-and-drop.",
  },
  {
    title: "Live Preview",
    description: "See real-time updates while building your form.",
  },
];

export default function Features() {
  return (
    <section className="w-full py-16 px-4 md:px-8">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
