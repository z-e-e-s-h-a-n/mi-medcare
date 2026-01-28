import React from "react";

interface StrategyStep {
  title: string;
  desc: string;
}

interface StrategySectionProps extends StrategyStep {
  steps: StrategyStep[];
}

const StrategySection = ({ title, desc, steps }: StrategySectionProps) => {
  return (
    <section className="space-y-4 text-center">
      <span className="subtitle">{title}</span>
      <h2> {desc}</h2>
      <ul className="flex items-center justify-between gap-4 mt-8 flex-wrap">
        {steps.map((s, i) => (
          <li
            key={i}
            className="basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(33.3%-16px)] relative bg-secondary p-8 rounded-2xl space-y-8 text-left border-2 border-primary"
          >
            <span className="absolute top-4 right-4 text-5xl font-medium text-primary/40">
              0{i + 1}
            </span>
            <h4 className="text-xl font-semibold">{s.title}</h4>
            <p>{s.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StrategySection;
