import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
} from "react-native";
import LoadComponent from "../components/LoadComponent";
import formatTelefone from "../helper/format-telefone";
import { baseService } from "../services/api";
type Contact = {
  id: number;
  nome: string;
  sobrenome: string;
  telefone: string;
  dataNascimento: Date;
  endereco: string;
  email: string;
};
export default function ContactsScreens({ navigation }: any) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const tabBarHeight = Platform.OS === "ios" ? 100 : 70;
  const fetchData = () => {
    setLoading(true);

    baseService
      .get<{ contacts: Contact[] }>("contacts")
      .then((res) => {
        setLoading(false);

        setContacts(res.data.contacts);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  const handleDeleteContact = (id: number) => {
    setLoading(true);
    baseService
      .delete("contact", id)
      .then((res) => {
        setLoading(false);
        console.log("parei de carregar");
        Alert.alert("Contato removido com sucesso");
        fetchData();
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);
  return (
    <>
      <View style={styles.view}>
        <ScrollView
          style={{ marginBottom: tabBarHeight + 10 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {contacts.map((contact, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  navigation.navigate("EditContactScreen", {
                    id_contact: contact.id,
                  });
                }}>
                <View style={styles.styledView}>
                  <View style={styles.cover}>
                    <View style={styles.row}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                        }}>
                        {contact.nome + " " + contact.sobrenome}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Você tem certeza ?",
                            "Ao aceitar o usuário será removido do sistema",
                            [
                              {
                                text: "Ok",
                                style: "default",
                                onPress: () => {
                                  handleDeleteContact(contact.id);
                                },
                              },
                              {
                                text: "Cancelar",
                                style: "cancel",
                              },
                            ]
                          );
                        }}>
                        <AntDesign name="delete" color="red" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                      }}>
                      {formatTelefone.doFormat(contact.telefone)}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                      }}>
                      {contact.email}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                      }}>
                      {moment(contact.dataNascimento).format("DD/MM/YYY")}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                      }}>
                      {contact.endereco}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <LoadComponent isLoading={loading} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "10%",
  },
  row: {
    padding: 13,
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
  },
  styledView: {
    marginBottom: 7,
    width: 355,
    height: 200,
    borderRadius: 14,
    backgroundColor: "#c393db",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },

  cover: {
    height: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: "hidden",
  },

  styledTitle: {
    top: 20,
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    width: 300,
  },
});
