import { useSelector } from "react-redux";
import { selectDBName } from "../../database/SystemReducer";

const Home = () => {
  const systemDbName = useSelector(selectDBName);
  return <>Landing Page {systemDbName}</>;
};

export default Home;
