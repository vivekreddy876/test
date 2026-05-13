import "./WeeklyChart.css";
import { useNavigate } from "react-router-dom";

type ChartItem = {
  day: string;
  value: number;
};

const data: ChartItem[] = [
  { day: "Sat", value: 20 },
  { day: "Sun", value: 75 },
  { day: "Mon", value: 68 },
  { day: "Thu", value: 50 },
  { day: "Wed", value: 32 },
  { day: "Tue", value: 63 },
  { day: "Fri", value: 15 },
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