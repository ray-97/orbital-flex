import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Accordion,
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Card,
  Content,
  Right,
  Left,
  CardItem,
  Thumbnail,
  View
} from "native-base";
import { changeScreen, logout, scheduleFetchHome, fetchUserInfo } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "../Home/ScheduleList";

const mapStateToProps = state => ({
  users: state.users,
  uid: state.userProfileToView
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleLogout: logout,
      handleChangeScreen: changeScreen,
      handleScheduleFetch: scheduleFetchHome,
      handleFetchUserInfo: fetchUserInfo,
    },
    dispatch
  );

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.uid);
    // this.props.handleScheduleFetch();
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const user = this.props.users[this.props.uid];
    if (!user) {
      return <Text>Loading</Text>
    }
    const postedScheduleList = <ScheduleList 
      scheduleArr={Object.keys(user.postedSchedules)}
      refArray={true}
      onButtonPress={(index) => () => {}}
    />
    const scheduleArray = [
      { title: "Posted Schedules", content: postedScheduleList },
    ]

          // <Right>
          //   <Button onPress={() => {}}>
          //     <Text>Back</Text>
          //   </Button>
          // </Right>

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>User Profile</Title>
          </Body>
        </Header>

        <Content>
          <Card>
            <CardItem>
              <Left>
                {profilePictureDisplay(user.profilePic)}
              </Left>
              <Body>
                <Text>{user.username}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{user.about}</Text>
              </Body>
            </CardItem>
          </Card>

          <Accordion dataArray={scheduleArray} renderContent={item => <View>{item.content}</View>} />

        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
