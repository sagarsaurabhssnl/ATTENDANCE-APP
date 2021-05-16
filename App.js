import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "./screens/register";
import HomeScreen from "./screens/homeScreen";
import Details from "./screens/details";
import Feedback from "./screens/feedback";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="MAURYANS HOME"
          component={HomeScreen}
          options={option}
        />
        <Stack.Screen name="Register" component={Register} options={option} />
        <Stack.Screen name="Details" component={Details} options={option} />
        <Stack.Screen name="Feedback" component={Feedback} options={option} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

var option = {
  headerStyle: {
    backgroundColor: "#212121",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#fff",
  },
  headerTintColor: "#fff",
};
