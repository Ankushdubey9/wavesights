import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsChart({
  users,
  contacts,
  subscribers,
}) {

  const data = [
    {
      name: "Users",
      value: users,
    },
    {
      name: "Contacts",
      value: contacts,
    },
    {
      name: "Subscribers",
      value: subscribers,
    },
  ];

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-black text-white">
            Platform Analytics
          </h2>

          <p className="text-gray-400 mt-2">
            Current platform statistics
          </p>

        </div>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
          >

            <defs>

              <linearGradient
                id="colorValue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={4}
              fill="url(#colorValue)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}