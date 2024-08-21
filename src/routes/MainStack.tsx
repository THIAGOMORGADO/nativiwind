import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const Stacks = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen name="Home" component={Home} />
      <Stacks.Screen name="SignIn" component={SignIn} />
      <Stacks.Screen name="SignUp" component={SignUp} />
    </Stacks.Navigator>
  );
}
