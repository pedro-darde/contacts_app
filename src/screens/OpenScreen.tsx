import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
export default function OpenScreen({ navigation }: any) {
  return (
    <View style={styles.view}>
      <View style={{ position: "absolute", top: 10 }}>
        <Image
          source={require("../../assets/contact.png")}
          style={styles.imagemLogo}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.push("LoginScreen")}
          style={styles.buttonStyled}>
          <Text style={styles.styledText}> Realizar login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyled}
          onPress={() => {
            navigation.navigate("CreateUserScreen");
          }}>
          <Text style={styles.styledText}> Realizar cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.0,
    elevation: 5,
    width: "100%",
  },
  imagemLogo: {
    height: 200,
    width: 200,
  },
  buttonStyled: {
    marginTop: 10,
    backgroundColor: "#c393db",
    borderRadius: 5,
    width: "100%",
    padding: 15,
  },
  styledText: {
    color: "white",
    textAlign: "center",
  },
});
