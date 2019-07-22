import React, { Component } from "react";
import {
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Right,
  Left,
  Input,
  Form,
  Item,
  Label,
  Picker,
  Icon,
  View
} from "native-base";
import { connect } from "react-redux";
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import { bindActionCreators } from "redux";
import { updateUserInfo, changeScreen } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleUpdateInfo: updateUserInfo,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    const { username, contact, about, profilePic, gender } = this.props.user;
    this.state = {
      username,
      contact, 
      about, 
      profilePic, 
      gender,
      checkProfilePicVisible: false
    };
  }

  submitForm = () => {
    const { username, contact, about, profilePic, gender } = this.state;
    if (!username) return;
    this.props.handleUpdateInfo({
      username,
      contact, 
      about, 
      profilePic, 
      gender
    });
  };

  setValue = key => value => {
    this.setState({
      [key]: value
    })
  };

  toggleCheckPicture = value => () => {
    this.setState({checkProfilePicVisible: value })
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Edit User Info</Title>
          </Body>
          <Right>
            <Button onPress={this.navigate("Home")}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                maxLength={12}
                value={this.state.username}
                onChangeText={this.setValue("username")}
              />
            </Item>
            <Item stackedLabel>
              <Label>Profile Picture URL</Label>
              <Input
                value={this.state.profilePic}
                onChangeText={this.setValue("profilePic")}
              />
              <Button rounded block bordered onPress={this.toggleCheckPicture(true)}>
                <Text>Check Image</Text>
              </Button>
            </Item>

            <Item picker fixedLabel>
              <Label>Gender</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.gender}
                onValueChange={this.setValue("gender")}
              >
                <Picker.Item label="Prefer not to say" value={0} />
                <Picker.Item label="Male" value={1} />
                <Picker.Item label="Female" value={2} />
              </Picker>
            </Item>

            <Item stackedLabel>
              <Label>Contact</Label>
              <Input
                value={this.state.contact}
                onChangeText={this.setValue("contact")}
              />
            </Item>

            <Item stackedLabel>
              <Label>About</Label>
              <Input
                maxLength={32}
                value={this.state.about}
                onChangeText={this.setValue("about")}
              />
            </Item>
            
          </Form>
          <Button rounded block bordered onPress={this.submitForm}>
            <Text>Submit</Text>
          </Button>

          <Dialog
            visible={this.state.checkProfilePicVisible}
            onTouchOutside={this.toggleCheckPicture(false)}
            dialogTitle={<DialogTitle title="Check Profile Picture" />}
            footer={
              <View>
                <Button block onPress={this.toggleCheckPicture(false)}>
                  <Text>Done</Text>
                </Button>
              </View>
            }
          >
            <DialogContent>
              {profilePictureDisplay(this.state.profilePic, {large: true})}
            </DialogContent>
          </Dialog>
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoForm);
