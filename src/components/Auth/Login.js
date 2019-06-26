import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Button, Input } from "react-native-elements";

import { loginMock, loginInitialize, changeScreen } from "../../actions";

const mapStateToProps = state => ({
  authError: state.auth.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleLoginMock: loginMock,
      handleLogin: loginInitialize,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

const initialState = {
  email: "",
  password: "",
  error: ""
};

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  showError = () => {
    this.setState({ error: "Failed to log in, email/password incorrect" });
  };

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  onButtonPress = () => {
    const { email, password } = this.state;
    this.props.handleLogin({ email, password });
    // this.navigate("MainTab")();

    // const { email, password } = this.state;
    // this.props.firebase
    //   .doSignInWithEmailAndPassword(email, password)
    //   .then(authUser => {
    //     this.setState({ ...initialState });
    //     console.log(authUser);
    //     this.navigate("MainTab")();
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //     this.setState({ error: error.message });
    //   });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Icon name="heartbeat" type="font-awesome" color="#f50" />
          <Text style={styles.textStyle}>Welcome to Flex</Text>
          <Text style={styles.textStyle}>Find fitness trainers near you</Text>
        </View>

        <View>
          <Text>{this.state.error}</Text>
          <Text>{this.props.authError}</Text>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={this.onButtonPress}
            title="Login"
          />
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={this.navigate("Register")}
            type="outline"
            title="Create new account"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  buttonStyle: {
    margin: 5
  },
  textStyle: {
    color: "#c5cae9",
    fontStyle: "italic",
    fontSize: 25
  },
  errorStyle: {
    color: "#c5cae9",
    fontSize: 10
  }
});

// const Login = withFirebase(LoginBase);
// const Login = LoginBase;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBase);