import AsyncStorage from '@react-native-community/async-storage';

export default class Posts {
  constructor() {
    this.postsKey = 'posts';
  }

  async all() {
    let posts = await this._readPosts();
    return this._sortPosts(posts, {
      sortOrder: 'published_at'
    });
  }

  async allSortedAndFiltered(params) {
    let posts = await this._readPosts();
    posts = this._filterPosts(posts, params.filter);
    this._sortPosts(posts, params.sortOrder);

    return posts;
  }

  async save(posts) {
    try {
      await AsyncStorage.setItem(this.postsKey, JSON.stringify(posts));
    } catch (e) {
      // no-op
    }
  }

  async _readPosts() {
    try {
      const posts = await AsyncStorage.getItem(this.postsKey);
      return posts !== null ? JSON.parse(posts) : [];
    } catch (e) {
      return [];
    }
  }

  _filterPosts(posts, filter) {
    if (typeof filter !== 'string' || ['published', 'unpublished'].indexOf(filter) === -1) {
      return posts;
    }
    return posts.filter(post => post.status === filter);
  }

  _sortPosts(posts, order) {
    if (order === 'published_at') {
      posts.sort(this._descPublishedAtSorter);
    }

    if (order === 'title') {
      posts = posts.sort(this._descTitleSorter);
    }

    return posts;
  }

  _descPublishedAtSorter(a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  _descTitleSorter(a, b) {
    if (b.title < a.title) {
      return -1;
    }
    if (b.title > a.title) {
      return 1;
    }

    return 0;
  }
}
