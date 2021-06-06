import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import db from "../config";

import AwesomeAlert from 'react-native-awesome-alerts';

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
      data: ".....",
      class: ".....",
      section: ".....",
      strength: ".....",
      present: 0,
      absent: 0,
      absentArr: "Absenties' Roll numbers: ",
      appState: 0,
      showAlert: false
    };
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
  refresh() {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  }

  referClassData() {
    this.setState({
      data: ".....",
      class: ".....",
      section: ".....",
      strength: ".....",
      present: 0,
      absent: 0,
      appState: 0,
      absentArr: "Absenties' Roll numbers: ",
    });
    setTimeout(() => {
      if (this.state.appState === 0) {
        this.showAlert()
      }
    }, 5000)
    var dataRef = db.ref("/main");
    dataRef.on("value", (data) => {
      this.setState({
        data: data.val(),
      });
      setTimeout(() => {
        this.setState({
          class: this.state.data.classData.class,
          section: this.state.data.classData.section,
          strength: this.state.data.classData.strength,
          absentArr: "Absenties' Roll numbers: ",
          present: 0,
          absent: 0,
          appState: 1
        });
        this.presentAbsent(this.state.strength);
      }, 500);
    });
  }

  presentAbsent(strengthPassed) {
    for (var i = 1; i <= strengthPassed; i++) {
      if (this.state.data[i].status === "present") {
        this.setState({
          present: this.state.present + 1,
        });
      } else if (this.state.data[i].status === "absent") {
        this.setState({
          absent: this.state.absent + 1,
          absentArr: this.state.absentArr + this.state.data[i].rolNum + ", ",
        });
      }
    }
  }

  updateAbsent() {
    for (var i = 1; i < this.state.strength + 1; i++) {
      var databaseRef = db.ref("/main/" + i);
      databaseRef.update({
        status: "absent",
      });
    }
  }

  componentDidMount() {
    this.referClassData();
  }
  render() {
    const { showAlert } = this.state;
    return (
      <View style={styles.main}>
        {this.state.appState === 1 ? (
          <View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.refresh();
                  }}
                />
              }
            >
              <Text style={styles.text}>Class: {this.state.class}</Text>
              <Text style={styles.text}>Section: {this.state.section}</Text>
              <Text style={styles.text}>Strength: {this.state.strength}</Text>
              <Text style={styles.text}>Present: {this.state.present}</Text>
              <Text style={styles.text}>Absent: {this.state.absent}</Text>
              <Text style={[styles.text, { fontSize: 10 }]}>
                {this.state.absentArr}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.referClassData();
              }}
            >
              <Text>Re-Configure</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#7777e5" }]}
              onPress={() => {
                this.updateAbsent();
              }}
            >
              <Text>Mark all as absent</Text>
            </TouchableOpacity></View>) : (<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <ActivityIndicator size={60} color="#666" />
            </View>)}
        <AwesomeAlert
          show={showAlert}
          title="Network Error!"
          message="Check your network connection and try again."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonStyle={{ width: 80, alignItems: "center", justifyContent: "center" }}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
            this.referClassData();
          }}
          contentContainerStyle={{ backgroundColor: "#000", borderRadius: 20 }}
          titleStyle={{ color: "#a44" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "#212121",
  },
  text: {
    color: "#fff",
    padding: 10,
    fontSize: 20,
    marginLeft: 20,
  },
  button: {
    padding: 20,
    backgroundColor: "#779ae5",
    borderRadius: 50,
    marginTop: 100,
    alignItems: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: "10%",
  },
});
