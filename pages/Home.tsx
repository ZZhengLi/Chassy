import BottomNav from "./BottomNav";
import AppBar from "./AppBar"

const Home = () => {
  return (
    <div>
      <AppBar />
      <h1 className="text-3xl font-bold underline">Home</h1>
      <BottomNav name="Home" />
    </div>
  );
};

export default Home;
