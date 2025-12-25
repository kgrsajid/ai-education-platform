import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    attempt: number;
    percentage: number;
  }[];
};

export const ProgressChart = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-3xl p-8 border shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your progress
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="attempt" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="percentage"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
