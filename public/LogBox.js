export default class LogBox extends Phaser.Scene {
    constructor() {
        super();
        Phaser.Scene.call(this, { key: 'LogBox', active: true });
    }

    preload() {
        this.load.html('log_box', './log_box.html')

    }

    create() {
        let element = this.add.dom(1050, 340).createFromCache('log_box');
    }
    emitLog(text) {
    	$('#log_box').append(`<div class="log">&ensp;${text}</div>`)
    	let container = $('#log_container');
    	container.animate({scrollTop: container.height()}, 1000);
    }
    emitCommand(text) {
    	$('#log_box').append(`<div class="log"> > ${text}</div>`)
    	let container = $('#log_container');
    	container.animate({scrollTop: container.height()}, 1000);
    }
    clear(){
    	$('#log_box')[0].innerHTML = '';
    }
}