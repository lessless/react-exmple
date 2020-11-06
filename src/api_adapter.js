import {
  URL,
  URLSearchParams
} from 'react-native-url-polyfill';

export default class APIAdapter {
  constructor(backendURL) {
    let url = new URL(backendURL);
    url.pathname = '/api/posts';
    this.postsURL = url;
  }

  posts(params) {
    let url = new URL(this.postsURL)
    if (typeof params.filter === 'string' && params.filter !== 'all') {
      url.searchParams.append('status', params.filter);
    }

    if (typeof params.sortOrder === 'string') {
      url.searchParams.append('order_by', params.sortOrder);
    }

    return fetch(url.toString()).
    then((response) => response.json()).
    catch(error => {
      throw new Error(error);
    });
  }
}
