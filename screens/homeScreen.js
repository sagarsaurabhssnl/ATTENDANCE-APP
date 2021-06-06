import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";
import db from "../config"

import AwesomeAlert from 'react-native-awesome-alerts';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      check: 0,
      status: 0,
      showAlert: false
    }
  }
  check() {
    this.setState({
      check: 0,
      status: 0,
    })
    var networkCheck = db.ref("/main/classData/strength");
    networkCheck.on("value", (value) => {
      this.setState({
        check: value.val(),
        status: 1
      })
    })
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  componentDidMount() {
    this.check();
  }
  render() {
    const { showAlert } = this.state;
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
            if (this.state.status === 1) {
              this.props.navigation.navigate("Register");
            } else {
              this.check();
              this.showAlert();
            }
          }}
        >
          <View style={[styles.button, { backgroundColor: "#ffccaa" }]}>
            <Text style={{ fontSize: 24 }}>Attendance Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (this.state.status === 1) {
              this.props.navigation.navigate("Details");
            } else {
              this.check();
              this.showAlert();
            }
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
            onPress={() => {
              if (this.state.status === 1) { this.props.navigation.navigate("Feedback") } else {
                this.check();
                this.showAlert();
              }
            }}
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
        <AwesomeAlert
          show={showAlert}
          title="Network Error!"
          message="Retry or Check your network connection and try again."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonStyle={{ width: 80, alignItems: "center", justifyContent: "center" }}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          contentContainerStyle={{ backgroundColor: "#000", borderRadius: 20, alignItems: "center", justifyContent: "center" }}
          titleStyle={{ color: "#a44" }}
          messageStyle={{ alignSelf: "center", textAlign: "center" }}
        />
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
