import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#212121",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
        >
          <View style={[styles.button, { backgroundColor: "#ffccaa" }]}>
            <Text style={{ fontSize: 24 }}>Attendance Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Details");
          }}
        >
          <View style={[styles.button, { backgroundColor: "#aaccaa" }]}>
            <Text style={{ fontSize: 24 }}>Attendance Details</Text>
            <Text>For Teachers</Text>
          </View>
        </TouchableOpacity>
        <View style={{ alignSelf: "flex-end" }}>
          <Icon
            raised="true"
            name="feedback"
            color="#268"
            onPress={() => this.props.navigation.navigate("Feedback")}
            containerStyle={{
              backgroundColor: "#f50",
              borderRadius: 100,
              marginRight: 20,
              width: 55,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
            iconStyle={{ borderRadius: 1 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    margin: "10%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
