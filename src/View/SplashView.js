let React = require('react');
let ReactNative = require('react-native');

let {
  Component,
  View,
  Text,
  Image,
  StyleSheet
} = ReactNative;

class SplashView extends Component {
  componentWillMount() {
    let navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'SearchView',
      });
    }, 1000);
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#0089f2', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Wiki App</Text>
        <Text style={styles.credits}>A React-Native simple app</Text>
		<Image source={require('./../../wiki.png')}></Image>

		<Text style={styles.credits}>&copy; Gabriel C, TMW, 2016</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
	credits: {
		marginTop: 60,
	    margin: 20,
	    textAlign: 'center',
	    borderTopColor: "#e3e3e3",
	}
});

export default SplashView;