import { KPI_HIGHLIGHTS } from "@/lib/constants";
import { motion } from "motion/react";
import { gradientClass } from "@/lib/gradient";

interface KpiSectionProps {
  useConstantColors?: boolean;
}

export function KpiSection({ useConstantColors = false }: KpiSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
    >
      {KPI_HIGHLIGHTS.map((stat) => {
        const Icon = stat.icon;
        const gradient = gradientClass(stat.gradient);
        const gradientSoft = gradientClass(stat.gradient, { opacity: 10 });

        return (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl ${gradient}`}
            />
            <div
              className={`relative text-center rounded-2xl p-4  ${
                useConstantColors
                  ? `${gradientSoft} border border-transparent`
                  : "bg-background/50 backdrop-blur-sm border border-border"
              }`}
            >
              <div className={`inline-flex p-2 rounded-lg mb-2 ${gradient}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className={`text-2xl font-bold`}>{stat.value}</p>
              <p className={`text-xs`}>{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
