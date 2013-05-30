exports.render = function(blueprintData){

	function renderBlueprint() {

		var _ = require("underscore");
		var ApiaryBlueprintParser = require("apiary-blueprint-parser");

		var blueprint = ApiaryBlueprintParser.parse(blueprintData);

		var htmlCode = [];
		htmlCode.push('<html>');
		htmlCode.push('<head>');
		htmlCode.push('<title>' + blueprint.name + '</title>');
		htmlCode.push('</head>');
		htmlCode.push('<link rel="stylesheet" type="text/css" href="style.css">');
		htmlCode.push('<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>');
		htmlCode.push('<body>');
		htmlCode.push('<div id="main">');
		htmlCode.push('<h1>' + blueprint.name + '</h1>');
		htmlCode.push('<p>' + blueprint.location + '</p>');
		htmlCode.push('<p>' + blueprint.description + '</p>');

		_.each(blueprint.sections,function(section) {

			htmlCode.push("<h2>" + section.name + "</h2>");

			_.each(section.resources,function(resource) {
				var htmlResource = [];
				htmlResource.push('<div class="method">' + resource.method + '</div><div class="url">' + resource.url + "</div>");
				htmlResource.push('<div class="resourceContent">');
				htmlResource.push('<div class="description">' + resource.description + '</div>');
				htmlResource.push("<h4>Request</h4>");
				htmlResource.push("<p>Accept: " + resource.request.headers.Accept + "</p>");
				htmlResource.push('<pre class="prettyprint">' + resource.request.body + '</pre>');
				htmlResource.push("<h4>Response</h4>");

				_.each(resource.responses,function(response) {
					htmlResource.push("<p>Status: " + response.status + "</p>");
					htmlResource.push("<p>Content-Type: " + response.headers['Content-Type'] + "</p>");
					htmlResource.push('<pre class="prettyprint">' + response.body + '</pre>');

				});
				htmlResource.push('</div>');

				htmlCode.push('<div class="resource">' + htmlResource.join('\n') + "</div>");

				//console.log(JSON.stringify(resource.responses));
			});
		});

		htmlCode.push('</body>');
		htmlCode.push('</html>');
		return htmlCode.join("\n");
	}
	return renderBlueprint();

}