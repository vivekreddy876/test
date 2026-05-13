import WeeklyChart from "../components/WeeklyChart";

const Home = () => {
  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WeeklyChart />
    </div>
  );
};

export default Home;