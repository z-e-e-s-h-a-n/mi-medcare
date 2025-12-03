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
    <section className="strategy-section">
      <span>{title}</span>
      <h2> {desc}</h2>
      <ul>
        {steps.map((s, i) => (
          <li key={i}>
            <span>0{i + 1}</span>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StrategySection;
