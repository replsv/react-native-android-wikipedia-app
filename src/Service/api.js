var apiWiki = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=';

module.exports = function(term) {
	return fetch(apiWiki + term).then(function(response) {
		return response.json();
	}).then(function(json) {
		var article = {};
		var results = json.query.pages;

		for (var i in results) {
			if (i > 0) {
				var result = results[i];
				article.title = result.title;
				article.content = result.extract;
				break;
			}
		}

		return article;
	});
}