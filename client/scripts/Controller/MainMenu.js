LifeSocks.MainMenu = function(game) {};
LifeSocks.MainMenu.prototype = {
	create: function() {
		console.log('Create: MainMenu');
	    var text = "Life Socks";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = this.add.text(this.world.centerX-300, 0, text, style);
	    this.add.sprite(0, 0, 'controller-bg');

	    this.add.sprite(200, 100, 'controller-start-header');

	    StartGameButton = this.add.button(750, 550, 'controller-start', this.startGame, this, null, null, null);
	},
	startGame: function() {
		socket.emit('startGame', { rotateRight: 200 });
		this.game.state.start('Play');
	}
};