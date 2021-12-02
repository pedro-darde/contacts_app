import React, { useState } from "react";
import formatTelefone from "../helper/format-telefone";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import LoadComponent from "../components/LoadComponent";
import { baseService } from "../services/api";
import moment from "moment";

type Contact = {
  nome: string;
  sobrenome: string;
  telefone: string;
  dataNascimento: Date;
  endereco: string;
  email: string;
};
export default function AddContactScreen({ navigation }: any) {
  const [contact, setContact] = useState<Contact>({
    dataNascimento: new Date(Date.now()),
    email: "",
    endereco: "",
    nome: "",
    sobrenome: "",
    telefone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const handleSubmit = () => {
    setLoading(true);
    baseService
      .post("contact", { contact })
      .then((res) => {
        setLoading(false);
        navigation.push("BottomStack");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data.errors) {
          Alert.alert("Ocorreu um erro", err.response.data.errors[0]);
        } else {
          Alert.alert("Ocorreu um erro", "Um erro inesperado aconteceu");
        }
      });
  };
  const tabBarHeight = Platform.OS === "ios" ? 100 : 70;
  return (
    <>
      <View style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 30 }}>Criar contato</Text>
      </View>
      <ScrollView style={{ marginBottom: tabBarHeight + 10, width: "100%" }}>
        <View style={styles.view}>
          <TextInput
            style={[styles.inputStyled, { marginBottom: 5 }]}
            placeholder="Nome"
            keyboardAppearance="dark"
            value={contact.nome}
            onChangeText={(value) => {
              setContact((currenctContact) => {
                let newContact = Object.assign({}, currenctContact);
                newContact.nome = value;
                return newContact;
              });
            }}
          />

          <TextInput
            style={[styles.inputStyled, { marginBottom: 5 }]}
            placeholder="Sobrenome"
            keyboardAppearance="dark"
            value={contact.sobrenome}
            onChangeText={(value) => {
              setContact((currecntContact) => {
                let newContact = Object.assign({}, currecntContact);
                newContact.sobrenome = value;
                return newContact;
              });
            }}
          />
          <TextInput
            style={[styles.inputStyled, { marginBottom: 5 }]}
            value={formatTelefone.doFormat(contact.telefone)}
            placeholder="Telefone"
            keyboardAppearance="dark"
            onChangeText={(value) => {
              setContact((currentContact) => {
                let newContact = Object.assign({}, currentContact);
                newContact.telefone = value;
                return newContact;
              });
            }}
          />
          <TouchableOpacity
            style={[styles.inputStyled, { marginBottom: 5 }]}
            onPress={() => setShow(true)}>
            <Text> {moment(contact.dataNascimento).format("DD/MM/YYYY")}</Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={contact.dataNascimento}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(evt: any, selectDate: any) => {
                const currentDate = selectDate || contact.dataNascimento;
                setShow(Platform.OS === "ios");
                setContact((currentContact) => {
                  let newContact = Object.assign({}, currentContact);
                  newContact.dataNascimento = currentDate;
                  return newContact;
                });
              }}
            />
          )}

          <TextInput
            style={[styles.inputStyled, { marginBottom: 5 }]}
            value={contact.email}
            placeholder="Email"
            keyboardAppearance="dark"
            onChangeText={(value) => {
              setContact((currentContact) => {
                let newContact = Object.assign({}, currentContact);
                newContact.email = value;
                return newContact;
              });
            }}
          />
          <TextInput
            style={[styles.inputStyled, { marginBottom: 5 }]}
            value={contact.endereco}
            placeholder="Endereço"
            keyboardAppearance="dark"
            onChangeText={(value) => {
              setContact((currentContact) => {
                let newContact = Object.assign({}, currentContact);
                newContact.endereco = value;
                return newContact;
              });
            }}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonStyled}>
              <Text style={styles.styledText} onPress={handleSubmit}>
                {" "}
                Criar conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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
    width: "100%",
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
