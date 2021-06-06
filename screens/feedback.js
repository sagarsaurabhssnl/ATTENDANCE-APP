import * as React from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import db from "../config";

import AwesomeAlert from 'react-native-awesome-alerts';


export default class Feedback extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            feed: "",
            feedCount: 0,
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
    feedDatabase() {
        if (this.state.name !== "" && this.state.feed !== "") {
            var databaseRef = db.ref("/feedback/" + this.state.feedCount);
            databaseRef.update({
                feed: this.state.feed,
                name: this.state.name,
            });
            var databaseRef1 = db.ref('/feedback/');
            databaseRef1.update({
                count: this.state.feedCount
            })
            this.showAlert();
            // Alert.alert(
            //     "Feedback",
            //     "Thanks for Feedback",
            //     [
            //         {
            //             text: "OK",
            //             onPress: () => this.props.navigation.navigate("MAURYANS HOME"),
            //         },
            //     ],
            //     {
            //         cancelable: false,
            //     }
            // );
        } else if (this.state.name === "" && this.state.feed === "") {
            alert("Identity and Feed cannot be empty");
        } else if (this.state.feed === "") {
            alert("Feed cannot be empty");
        } else if (this.state.name === "") {
            alert("Identity cannot be empty");
        }
    }
    checkCount() {
        var dataRef = db.ref("/feedback/count");
        dataRef.on("value", (data) => {
            this.setState({ feedCount: parseInt(data.val()) + 1 });
            setTimeout(() => {
                if (this.state.feedCount === 0) {
                    var random = Math.random() * 10000000000;
                    this.setState({
                        feedCount: random,
                    });
                }
            }, 500);
        });
    }
    componentDidMount() {
        this.checkCount();
    }
    render() {
        const { showAlert } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={"Enter your identity here"}
                    maxLength={30}
                    onChangeText={(n) => {
                        this.setState({
                            name: n,
                        });
                    }}
                    value={this.state.data}
                />
                <TextInput
                    style={styles.inputStyle}
                    multiline
                    numberOfLines={4}
                    placeholder={"Enter the feedback here"}
                    maxLength={500}
                    onChangeText={(f) => {
                        this.setState({
                            feed: f,
                        });
                    }}
                    value={this.state.data}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.feedDatabase();
                    }}
                >
                    <Text>Feed</Text>
                </TouchableOpacity>
                <AwesomeAlert
                    show={showAlert}
                    title="Thanks for feedback !"
                    message="Have a nice day ahead !"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonStyle={{ width: 80, alignItems: "center", justifyContent: "center" }}
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => {
                        this.hideAlert();
                        this.props.navigation.navigate("MAURYANS HOME")
                    }}
                    contentContainerStyle={{ backgroundColor: "#579cc1", borderRadius: 20, width: 350 }}
                    titleStyle={{ color: "#9ae577" }}
                    messageStyle={{ color: "#222" }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#aab8b8",
        alignItems: "center",
    },
    inputStyle: {
        borderRadius: 20,
        borderColor: "black",
        height: 100,
        width: "90%",
        backgroundColor: "#ffffff",
        textAlign: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#aa88bb",
        borderRadius: 20,
        margin: 20,
        padding: 10,
        width: 60,
        alignItems: "center",
        alignSelf: "flex-end",
    },
});
