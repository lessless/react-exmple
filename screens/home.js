import React from 'react';


import {
  Button,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import FilterPicker from '../components/filter_picker';
import SortOrderPicker from '../components/sort_order_picker';
import Feed from '../components/feed';
import APIAdapter from '../src/api_adapter';
import Posts from '../src/posts';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.APIAdapter = new APIAdapter('http://localhost:4000')
    this.posts = new Posts();
    this.navigation = props.navigation;

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.state = {
      posts: [],
      filter: '',
      sortOrder: '',
      isLoading: true,
    }
  }

  componentDidMount() {
    this.updatePosts({ filter: this.props.filter, sortOrder: this.props.sortOrder })
  }

  async updatePosts(params) {
    try {
      const json = await this.APIAdapter.posts(params);

      if (typeof json === 'object') {
        this.posts.save(json.data);
        this.setState({ posts: json.data });
      }
    }
    catch (error) {
      const posts = await this.posts.all();
      this.setState({ posts });
    }

    this.setState({ isLoading: false });
  }

  async fetchPosts(params) {
    const posts = await this.posts.allSortedAndFiltered(params);
    this.setState({ posts });
  }

  handleFilterChange(filter) {
    this.setState({ filter });
    return this.fetchPosts({ filter, sortOrder: this.state.sortOrder });
  }

  handleSortOrderChange(sortOrder) {
    this.setState({ sortOrder });
    return this.fetchPosts({ filter: this.state.filter, sortOrder });
  }

  render() {
    const { posts, isLoading } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {isLoading ? <ActivityIndicator /> : (
            <>
              <FilterPicker onFilterChange={this.handleFilterChange} />
              <SortOrderPicker onSortOrderChange={this.handleSortOrderChange} />
              <Button title="+New Post" onPress={() => this.navigation.navigate('NewPost')} />
              <Feed posts={posts} />
            </>
          )}
        </SafeAreaView>
      </>
    );
  }
}
