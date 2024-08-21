import { SafeAreaView, StatusBar } from "react-native";

import "./global.css";

import Home from "./src/screens/Home";
import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}
