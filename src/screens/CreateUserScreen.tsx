import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import LoadComponent from "../components/LoadComponent";
import { baseService } from "../services/api";

type UserLoginModel = {
  senha: string;
  usuario: string;
  nome: string;
};
export default function CreateUserScreen({ navigation }: any) {
  const [user, setUser] = useState<UserLoginModel>({
    senha: "",
    usuario: "",
    nome: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    baseService
      .post("user", { user })
      .then((res) => {
        setLoading(false);
        Alert.alert(
          "Usuario inserido com sucesso",
          "Clique no botão abaixo para realizar o login",
          [
            {
              text: "Ok",
              style: "default",
              onPress: () => {
                navigation.navigate("LoginScreen");
              },
            },
          ]
        );
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data) {
          Alert.alert("Ocorreu um erro", err.response.data.errors[0]);
        } else {
          Alert.alert("Ocorreu um erro", "Um erro inesperado aconteceu");
        }
      });
  };

  return (
    <>
      <View style={styles.view}>
        <TextInput
          style={[styles.inputStyled, { marginBottom: 5 }]}
          placeholder="Nome"
          keyboardAppearance="dark"
          value={user.nome}
          onChangeText={(value) => {
            setUser((currentUser) => {
              let newUser = Object.assign({}, currentUser);
              newUser.nome = value;
              return newUser;
            });
          }}
        />

        <TextInput
          style={[styles.inputStyled, { marginBottom: 5 }]}
          placeholder="Usuário"
          keyboardAppearance="dark"
          value={user.usuario}
          onChangeText={(value) => {
            setUser((currentUser) => {
              let newUser = Object.assign({}, currentUser);
              newUser.usuario = value;
              return newUser;
            });
          }}
        />
        <TextInput
          style={styles.inputStyled}
          value={user.senha}
          secureTextEntry={true}
          placeholder="Senha"
          keyboardAppearance="dark"
          onChangeText={(value) => {
            setUser((currentUser) => {
              let newUser = Object.assign({}, currentUser);
              newUser.senha = value;
              return newUser;
            });
          }}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonStyled} onPress={handleSubmit}>
            <Text style={styles.styledText}> Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadComponent isLoading={loading} />
    </>
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
  inputStyled: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#b0b4b5",
    borderRadius: 5,
    padding: 5,
  },
});
