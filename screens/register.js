import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import db from "../config";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
      classData: 0,
      strength: 0,
    };
  }

  fetchData() {
    var dataRef = db.ref("/main");
    dataRef.on("value", (data) => {
      this.setState({
        classData: data.val(),
      });
    });
  }

  componentDidMount() {
    this.fetchData();
    this.referClassData();
  }

  refresh = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  };

  referClassData() {
    var dataRef = db.ref("/main/classData/strength");
    dataRef.on("value", (data) => {
      this.setState({ strength: data.val() });
    });
  }
  referDatabseRoll = (Sno) => {
    if (this.state.classData !== 0) {
      var cadetRoll = this.state.classData[Sno].rolNum;
      var cadetName = this.state.classData[Sno].name;
      var cadetData = cadetRoll + " " + cadetName;
      if (cadetName === undefined && cadetRoll === undefined && Sno === 1) {
        cadetData = "Scroll Down and return back to HOME and reopen this page";
      }
      return cadetData;
    } else {
      return "Loading...";
    }
  };

  updateDataBase = (Sno) => {
    var databaseRef = db.ref("/main/" + Sno);
    databaseRef.update({
      status: "present",
    });
  };

  render() {
    return (
      <ScrollView
        style={styles.parentClass}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
          />
        }
      >
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(1);
          }}
        >
          <Text>{this.referDatabseRoll(1)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(2);
          }}
        >
          <Text>{this.referDatabseRoll(2)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(3);
          }}
        >
          <Text>{this.referDatabseRoll(3)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(4);
          }}
        >
          <Text>{this.referDatabseRoll(4)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(5);
          }}
        >
          <Text>{this.referDatabseRoll(5)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(6);
          }}
        >
          <Text>{this.referDatabseRoll(6)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(7);
          }}
        >
          <Text>{this.referDatabseRoll(7)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(8);
          }}
        >
          <Text>{this.referDatabseRoll(8)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(9);
          }}
        >
          <Text>{this.referDatabseRoll(9)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(10);
          }}
        >
          <Text>{this.referDatabseRoll(10)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(11);
          }}
        >
          <Text>{this.referDatabseRoll(11)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(12);
          }}
        >
          <Text>{this.referDatabseRoll(12)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(13);
          }}
        >
          <Text>{this.referDatabseRoll(13)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(14);
          }}
        >
          <Text>{this.referDatabseRoll(14)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(15);
          }}
        >
          <Text>{this.referDatabseRoll(15)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(16);
          }}
        >
          <Text>{this.referDatabseRoll(16)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(17);
          }}
        >
          <Text>{this.referDatabseRoll(17)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(18);
          }}
        >
          <Text>{this.referDatabseRoll(18)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(19);
          }}
        >
          <Text>{this.referDatabseRoll(19)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(20);
          }}
        >
          <Text>{this.referDatabseRoll(20)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(21);
          }}
        >
          <Text>{this.referDatabseRoll(21)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(22);
          }}
        >
          <Text>{this.referDatabseRoll(22)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(23);
          }}
        >
          <Text>{this.referDatabseRoll(23)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(24);
          }}
        >
          <Text>{this.referDatabseRoll(24)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(25);
          }}
        >
          <Text>{this.referDatabseRoll(25)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(26);
          }}
        >
          <Text>{this.referDatabseRoll(26)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(27);
          }}
        >
          <Text>{this.referDatabseRoll(27)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(28);
          }}
        >
          <Text>{this.referDatabseRoll(28)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(29);
          }}
        >
          <Text>{this.referDatabseRoll(29)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.main}
          onPress={() => {
            this.updateDataBase(30);
          }}
        >
          <Text>{this.referDatabseRoll(30)}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  main: {
    backgroundColor: "#779ae5",
    padding: 15,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    borderRadius: 50,
    alignSelf: "center",
  },
  parentClass: {
    marginTop: 0,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#212121",
  },
});
