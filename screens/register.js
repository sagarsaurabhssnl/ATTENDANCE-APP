import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  View,
  ActivityIndicator
} from "react-native";
import db from "../config";
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
      classData: [],
      strength: 0,
      appState: 0,
      map: [],
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
  fetchData() {
    var dataRef = db.ref("/main");
    dataRef.on("value", (data) => {
      var maP = [];
      for (var i = 1; i <= (data.val()).classData.strength; i++) {
        maP.push(i)
      }
      setTimeout(() => {
        this.setState({
          classData: data.val(),
          strength: data.val().classData.strength,
          map: maP,
          appState: 1,
          showAlert: false
        });
      }, 200)

    });
  }

  componentDidMount() {
    this.qrefresh();
  }

  refresh = () => {
    this.fetchData();
    this.setState({
      refreshing: true,
      appState: 0,
    });
    setTimeout(() => {
      if (this.state.appState === 0) {
        this.setState({
          showAlert: true
        });
      }
    }, 5000);
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  };

  qrefresh = () => {
    this.setState({
      appState: 0,
    });
    this.fetchData();
    setTimeout(() => {
      if (this.state.appState === 0) {
        this.setState({
          showAlert: true
        });
      }
    }, 5000);
  };

  referDatabseRoll = (Sno) => {
    if (this.state.classData !== 0) {
      var cadetRoll = this.state.classData[Sno].rolNum;
      var cadetName = this.state.classData[Sno].name;
      var cadetData = cadetRoll + " " + cadetName;
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
    this.qrefresh();
  };

  getColor(index) {
    if (this.state.classData[index].status === "present") {
      return ("#9ae577")
    } else {
      return ("#779ae5")
    }
  }

  render() {
    const { showAlert } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#212121" }}>
        {this.state.appState === 1 ? (
          <ScrollView
            style={styles.parentClass}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refresh}
              />
            }
          >
            {(this.state.map).map((indexData) => {
              return (
                <TouchableOpacity
                  style={[styles.main, { backgroundColor: this.getColor(indexData) }]}
                  onPress={() => {
                    this.updateDataBase(indexData);
                  }}
                  key={indexData}
                >
                  <Text>{this.referDatabseRoll(indexData)}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <ActivityIndicator size={60} color="#666" />
          </View>
        )}
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
            this.qrefresh();
          }}
          contentContainerStyle={{ backgroundColor: "#000", borderRadius: 20 }}
          titleStyle={{ color: "#a44" }}
        />
      </View>
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
