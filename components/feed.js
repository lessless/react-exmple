import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import React from 'react';

export default class PostsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts,
      isLoading: true,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({ posts: this.props.posts });
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.posts}
        renderItem={this.renderPost}
        keyExtractor={(item) => item.id.toString()}
        style={styles.scrollView}
      />
    );
  }

  renderPost({ item }) {
    return (
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.sectionDescription}>
            {item.body}
          </Text>
          <Text style={styles.status}>
            {item.status}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
