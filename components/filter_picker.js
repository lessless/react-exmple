import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default class PostsFilterPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      onFilterChange: props.onFilterChange,
      postsFilter: "all"
    }
  }

  handleChange(filter) {
    this.props.onFilterChange(filter);
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
      placeholder={{ label: "Filter posts", value: 'all' }}
      onValueChange={this.handleChange}
      items={[
        { label: 'All', value: 'all' },
        { label: 'Published', value: 'published' },
        { label: 'Unpublished', value: 'unpublished' },
      ]}
      useNativeAndroidPickerStyle={false}
      style={pickerStyle}
    />

  }
}
