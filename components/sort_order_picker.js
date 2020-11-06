import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default class PostsOrderPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      onOrderChange: props.onSortOrderChange,
      sortOrder: "published_at"
    }
  }

  handleChange(order) {
    this.props.onSortOrderChange(order);
  }

  render() {
    const pickerStyle = {
      inputIOS: {
        color: 'black',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        fontSize: 18
      },
      inputAndroid: {
        color: 'white',
      },
      placeholderColor: 'black',
      underline: { borderTopWidth: 0 },
      icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
      },
    };

    return <RNPickerSelect
      placeholder={{ label: "Sort by", value: 'published_at' }}
      onValueChange={this.handleChange}
      items={[
        { label: 'Publication Date', value: 'published_at' },
        { label: 'Title', value: 'title' },
      ]}
      useNativeAndroidPickerStyle={false}
      style={pickerStyle}
    />

  }
}
