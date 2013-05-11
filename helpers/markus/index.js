var path = require('path'),
	fs = require('fs'),
	ent = require('ent'),
	marks = require('marks');

marks.encode({
    entities: ent.encode
});

// Register all tags contained in tags folder:
fs.readdirSync(path.join(__dirname, 'tags'))
	.filter(function(file) {
		return !(/^\./).test(file);
	})
	.forEach(function(file) {
		marks.register(require('./tags/' + file));
	});

module.exports = {
	marks: function(content, param) {
		if (!content) return '';
		if (!param) param = {};
		param.encoding = 'entities';
		return marks.parse(content).render(param);
	}
};