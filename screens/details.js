import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import db from "../config";

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
    };
  }

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
      absentArr: "Absenties' Roll numbers: ",
    });

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
    return (
      <View style={styles.main}>
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
          style={styles.button}
          onPress={() => {
            this.updateAbsent();
          }}
        >
          <Text>Mark all as absent</Text>
        </TouchableOpacity>
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
