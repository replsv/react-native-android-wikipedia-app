let React = require('react');
let ReactNative = require('react-native');
let _ = require('lodash');
let HTMLView = require('react-native-htmlview');

let {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  ScrollView,
  Image,
} = ReactNative;

import wikiApi from "./../Service/api.js";

class ResultsView extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	    });
		this.state = {
			search: false,
			article: {
				title: 'Searching...',
				content: 'Please wait',
			},
			term: props.searchTerm,
		};
		if (!this.state.search) {
			this.state.search = true;
			this.getContent();
		}
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
		      	<Text
		      	 style={{marginTop: 50, marginBottom: 15, fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}
		      	 	>
		      	 	{this.state.article.title}
	      	 	</Text>
		      	<ScrollView>
			      	<HTMLView
			          value={this.state.article.content}
			          >
			        </HTMLView>
	      		</ScrollView>
		  </View>
		);
	}
	getContent() {
		let term = this.state.term;
		wikiApi(term).then(
	      (article) => {
	        if(!article.title) {
        		article = {
					title: 'No article found',
					content: 'Please search for a new term...',
				};
	        }
	        this.setState({
				article: article,
			});
	      }
	    );
	}
}

let NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
  	return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          &larr;
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          <Image style={{height: 20, width: 20}} source={require('./../../wiki.png')}></Image>
          Search Results
        </Text>
      </TouchableOpacity>
    );
  }
};

export default ResultsView;