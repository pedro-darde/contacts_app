import LottieView from "lottie-react-native";
import { Modal, StyleSheet, View } from "react-native";
import React from "react";
type LoadProps = {
  isLoading: boolean;
};

export default function LoadComponent({ isLoading }: LoadProps) {
  return (
    <Modal animationType={"fade"} visible={isLoading} transparent={true}>
      <View style={styles.modalBackground}>
        <LottieView
          source={require("../lotties/spinner.json")}
          autoPlay={true}
          style={{ width: 50, height: 50 }}
          loop
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
});
