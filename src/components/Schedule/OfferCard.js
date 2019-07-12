import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  ListItem,
  Body,
  Button,
  Right,
  Left,
  View
} from "native-base";
import { changeScreen, fetchUserInfo } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid],
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserInfo: fetchUserInfo,
    },
    dispatch
  );

class OfferCard extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    // uid of booker
    offer: PropTypes.object.isRequired,
    // offer of booker
  };

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.uid);
  }

  render() {
    const user = this.props.user;
    if (!user) {
      return <Text>Loading</Text>
    }
    const offer = this.props.offer;
    return (
      <ListItem bordered>
        <Left>
          {profilePictureDisplay(user.profilePic, {large: true})}
        </Left>
        <Body>
          <Text>{user.username}</Text>

          <Text note>Offer price:</Text>
          <Text>{offer.price.toString()}</Text>
          <Text note>Remarks:</Text>
          <Text>{offer.remarks}</Text>

          <Button onPress={this.navigate("UserProfile/" + uid)}>
            <Text>View Profile</Text>
          </Button>
        </Body>
      </ListItem>
    );
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);