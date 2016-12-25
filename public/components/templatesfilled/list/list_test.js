var QUnit = require("steal-qunit");
var PlayerList = require("./list");
var defineFixtures = require("mosaico/models/fixtures/templatesfilled").defineFixtures;
var F = require('funcunit');
var fixture = require('can-fixture');
var stache = require("can-stache");
var $ = require("jquery");
var Player = require("mosaico/models/player");
F.attach(QUnit);

var vm;
QUnit.module("components/player/list/", {
	beforeEach: function () {
		localStorage.clear();
		fixture.delay = 1;
		defineFixtures();
		vm = new PlayerList.ViewModel();
	},
	afterEach: function () {
		defineFixtures();
		vm = undefined;
	}
});

QUnit.test("templatesfilled property loads templatesfilled from server during instantiation", function (assert) {
	var done = assert.async();
	vm.templatesfilledPromise.then(function (templatesfilled) {
		assert.ok(templatesfilled.length, "we got some templatesfilled");
		done();
	});
});

QUnit.test("editPlayer sets editingPlayer to passed in player", function (assert) {
	var player = new Player({ name: "Ryan" });
	vm.editPlayer(player);
	assert.deepEqual(vm.editingPlayer, player, "editingPlayer was set");
});

QUnit.test("removeEdit removes editingPlayer", function (assert) {
	var player = { name: "Ryan" };
	vm.editingPlayer = player;
	vm.removeEdit();
	assert.notOk(vm.editingPlayer, "editingPlayer was removed");
});

QUnit.test('Loading message shown while templatesfilled list is loaded', function (assert) {
	var frag = stache('<player-list />')();

	var resolveFixture;

	$('#qunit-fixture').html(frag);

	fixture('GET /services/templatesfilled', function (req, res) {
		resolveFixture = res;
	});

	F('tbody tr.info')
		.exists('Loading element is present')
		.text('Loading', 'Loading message is shown')
		.then(function () {
			assert.ok(true, 'Request is resolved');
			resolveFixture({ data: [] });
		})
		.closest('tbody')
		.size(0, 'Loading element was removed');
});

QUnit.test('Placeholder message is shown when player list is empty', function () {
	var frag = stache('<player-list />')();

	// Make the templatesfilled fixture return an empty list
	fixture('GET /services/templatesfilled', function () {
		return { data: [] };
	});

	$('#qunit-fixture').html(frag);

	F('tbody tr.empty-list-placeholder')
		.exists('Placeholder element is present');
});
