import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { motion } from "framer-motion";

type Props = {
  percentage: number;
};

const getColor = (value: number) => {
  if (value >= 80) return "#22c55e"; // green
  if (value >= 50) return "#f59e0b"; // yellow
  return "#ef4444"; // red
};

export const RadialScore = ({ percentage }: Props) => {
  const color = getColor(percentage);

  const data = [
    {
      name: "score",
      value: percentage,
      fill: color,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-8 border shadow-lg
        flex flex-col items-center"
    >
      <h3 className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wide">
        Last attempt
      </h3>

      <div className="relative w-[220px] h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            data={data}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />
            {/* background track */}
            <RadialBar
              dataKey="value"
              cornerRadius={10}
              background={{ fill: "#f1f5f9" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-extrabold"
            style={{ color }}
          >
            {percentage}%
          </span>
          <span className="text-sm text-gray-500 mt-1">
            Score
          </span>
        </div>
      </div>

      {/* STATUS */}
      <div className="mt-6">
        {percentage >= 80 && (
          <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Excellent
          </span>
        )}
        {percentage >= 50 && percentage < 80 && (
          <span className="px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
            Good
          </span>
        )}
        {percentage < 50 && (
          <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
            Needs improvement
          </span>
        )}
      </div>
    </motion.div>
  );
};
