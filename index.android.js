/**
 * Wiki Search React Native App
 * GC
 */

'use strict';

let React = require('react');
let ReactNative = require('react-native');
let GiftedSpinner = require('react-native-gifted-spinner');
let _ = require('lodash');
let wikiApi = require("./src/Service/api.js");
let ScrollableView = require('react-native-scrollable-view');
let HTMLView = require('react-native-htmlview');

let {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ListView,
  ScrollView
} = require('react-native');

let TmwWiki = React.createClass({
  getInitialState: function(){
    return {
      query: null,
      hasResult: false,
      noResult: false,
      result: null,
      isLoading: false,
      title: 'Wiki API Search',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  },
  render: function() {
    return (
      <View style={styles.container}>

        <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>{this.state.title}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.search}>
            <TextInput
              style={styles.text_input}
              onChangeText={this.changeText}
              onSubmitEditing={this.search}
              placeholder="Type a term here..."
            />
          </View>

          {
            this.state.hasResult &&

            <View style={styles.result}>
              <Text style={styles.main_text}>{this.state.result.title}</Text>
              {this.renderPostText()}
            </View>

          }

          {
            this.state.noResult &&
            <View style={styles.no_result}>
              <Text style={styles.main_text}>No article found...</Text>
            </View>
          }

          {
            this.state.isLoading &&
            <View style={styles.loader}>
              <GiftedSpinner />
            </View>
          }
        </View>
        <View style={styles.footer}>
          <Text style={styles.credits}>&copy; Gabriel C, 2016</Text>
          <Image
              source={require('./wiki.png')}
          ></Image>
        </View>
      </View>
    );
  },
  changeText: function(text){
    this.setState({
        query: text
      });
    },
  search: function(){
    let articleTitle = _.capitalize(this.state.query);
    this.setState({
      isLoading: true
    });
    wikiApi(articleTitle).then(
      (article) => {
        if(article.title) {
          this.setState({
            hasResult: true,
            noResult: false,
            result: article,
            isLoading: false
          });
        } else {
          this.setState({
            hasResult: false,
            noResult: true,
            isLoading: false,
            result: null
          });
        }
      }
    );
  },
  renderPostText: function(){
    if(!this.state.result.content){
      return null;
    }
    return(
      <ScrollView pagingEnabled={true}>
        <HTMLView
          value={this.state.result.content}
          >
        </HTMLView>
      </ScrollView> 
    );
  }
});

let styles = StyleSheet.create({
  toolbar: {
    backgroundColor:'#0089f2',
    paddingTop:40,
    paddingBottom:20,
    flexDirection:'row',
    justifyContent: 'center'
  },
  toolbarTitle: {
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  body: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  search: {
    flex: 1
  },
  result: {
    flex: 8
  },
  no_result: {
    flex: 8,
    alignItems: 'center'
  },
  loader: {
    flex: 1,
    alignItems: 'center'
  },
  main_details: {
    padding: 30,
    alignItems: 'center'
  },
  header_post_text:{
    fontSize: 14,
    marginBottom: 20,
    color: '#000000'
  },
  scrollView: {
    flex: 1
  },
  main_text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sub_text: {
    color: '#6e6e6e'
  },
  description: {
    marginTop: 5
  },
  text_input: {
    height: 50,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  credits: {
    margin: 20,
    textAlign: 'center',
    borderTopColor: "#e3e3e3"
  }
});

AppRegistry.registerComponent('TmwWiki', () => TmwWiki);