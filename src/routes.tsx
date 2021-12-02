import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import OpenScreen from "./screens/OpenScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import BottomNavigatorComponent from "./components/BottomNavigatorComponent";
import EditContactScreen from "./screens/EditContactScreen";
export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="OpenScreen">
      <Stack.Screen
        name="OpenScreen"
        component={OpenScreen}
        options={{ title: "Agenda App", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={({ navigation }: any) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => navigation.goBack()}>
              <AntDesign name="back" size={30} />
            </TouchableOpacity>
          ),
          title: "Login",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={({ navigation }: any) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => navigation.goBack()}>
              <AntDesign name="back" size={30} />
            </TouchableOpacity>
          ),
          title: "Criar conta",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="BottomStack"
        component={BottomNavigatorComponent}
        options={({ navigation }: any) => ({
          title: "Contact App",
        })}
      />

      <Stack.Screen
        name="EditContactScreen"
        component={EditContactScreen}
        options={({ navigation }: any) => ({
          title: "Editar contato",
        })}
      />
    </Stack.Navigator>
  );
}
