import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import ContactsScreens from "../screens/ContactsScreens";
import AddContactScreen from "../screens/AddContactScreen";
export default function BottomNavigatorComponent({ navigation }: any) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="ContactsScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          backgroundColor: "#ffffff",
          height: 90,
          borderRadius: 15,
          right: 10,
          left: 10,
          shadowColor: "#7F5DFO",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="ContactsScreen"
        component={ContactsScreens}
        options={{
          title: "Contatos",
          tabBarIcon: () => <FontAwesome name={"home"} size={30} />,
        }}
      />

      <Tab.Screen
        name="CreateContactsScreen"
        component={AddContactScreen}
        options={{
          title: "Criar contato",
          headerTitleStyle: { color: "black" },
          tabBarIcon: () => <FontAwesome name={"user"} size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
