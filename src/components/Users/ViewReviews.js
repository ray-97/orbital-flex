import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  Thumbnail,
  View,
  List, 
  ListItem
} from "native-base";
import { FlatList } from 'react-native';
import { changeScreen, fetchUserReviews } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "../Home/ScheduleList";

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserReviews: fetchUserReviews,
    },
    dispatch
  );

class ViewReviews extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserReviews(this.props.uid);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  reviewCard = review => {

  }

  render() {
    const reviews = this.props.user.reviews;
    if (!reviews) {
      return <Text>Loading</Text>
    }
    const ownReview = this.props.user.ownReview;

    return (
      <Container>
        <Content>
          <FlatList 
            data={reviews} 
            renderItem={({ item }) => (
              reviewCard(item)
            )}
            keyExtractor={item => item.poster}
          />
        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviews);