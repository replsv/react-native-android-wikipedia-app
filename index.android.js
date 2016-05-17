
let React = require('react');
let ReactNative = require('react-native');

let {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} = ReactNative;

import SearchView from "./src/View/SearchView"
import SplashView from "./src/View/SplashView"
import ResultsView from "./src/View/ResultsView"

class App extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{id: 'SplashView', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashView') {
      return (
        <SplashView
          navigator={navigator} />
      );
    }
    if (routeId === 'SearchView') {
      return (
        <SearchView
          navigator={navigator} />
      );
    }
    if (routeId === 'ResultsView') {
      return (
        <ResultsView
            navigator={navigator} searchTerm={route.searchTerm} />
      );
    }
    return this.noRoute(navigator);
  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>Unknown route!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TmwWiki', () => App);