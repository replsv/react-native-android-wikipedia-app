let React = require('react');
let ReactNative = require('react-native');
let _ = require('lodash');

let {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
} = ReactNative;

class SearchView extends Component {
  constructor(props) {
    super(props)
    this.query = '';
  }
  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center', margin: 20,}}>
          <Text>
            Use the following input to search for an article on Wikipedia
          </Text>
          <TextInput
            style={{height: 50,  borderColor: 'gray', borderWidth: 1 }}
            onChangeText={this.onChangeText.bind(this)}
            onSubmitEditing={this.goToSearchResults.bind(this)}
            placeholder="Type a term here..."
          />
      </View>
    );
  }
  onChangeText(text) {
    this.setState({
      query: text
    });
  }
  goToSearchResults() {
    let searchTerm = _.capitalize(this.state.query).replace(' ', '|');
    this.props.navigator.push({
      id: 'ResultsView',
      name: 'Results',
      searchTerm: searchTerm,
    });
  }
}

let NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          <Image style={{height: 20, width: 20}} source={require('./../../wiki.png')}></Image>
          Search Article
        </Text>
      </TouchableOpacity>
    );
  }
};

export default SearchView;