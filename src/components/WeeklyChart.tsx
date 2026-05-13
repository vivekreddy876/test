import "./WeeklyChart.css";
import { useNavigate } from "react-router-dom";

type ChartItem = {
  day: string;
  value: number;
  color: string;
};

const data: ChartItem[] = [
  {
    day: "Sat",
    value: 20,
    color: "#3B82F6",
  },
  {
    day: "Sun",
    value: 75,
    color: "#10B981",
  },
  {
    day: "Mon",
    value: 68,
    color: "#F59E0B",
  },
  {
    day: "Thu",
    value: 50,
    color: "#EF4444",
  },
  {
    day: "Wed",
    value: 32,
    color: "#8B5CF6",
  },
  {
    day: "Tue",
    value: 63,
    color: "#06B6D4",
  },
  {
    day: "Fri",
    value: 15,
    color: "#EC4899",
  },
];

const WeeklyChart = () => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="header">
        <h2>Current week</h2>

        <div className="total-section">
          <span className="count">199</span>
          <span className="subtitle">Total Calls</span>
        </div>
      </div>

      <div className="chart">
        {data.map((item) => (
          <div
            key={item.day}
            className="bar-wrapper"
            onClick={() => navigate(`/day/${item.day}`)}
          >
            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{
                    height: `${item.value}%`,
                    background: item.color,
                }}
                />
            </div>

            <span className="label">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChart;