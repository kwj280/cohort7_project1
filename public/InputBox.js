export default class InputBox extends Phaser.Scene {
    constructor() {
        super();
        Phaser.Scene.call(this, { key: 'InputBox', active: true });
        this.commandHistory = [];
    }

    preload() {
        this.load.html('input_box', './input_box.html')

    }

    create() {
        let battleScene = this.scene.get('battle');
        let mainScene = this.scene.get('main');

        let logBox = this.scene.get('LogBox')
        let element = this.add.dom(450, 680).createFromCache('input_box');
        let consoleInput = element.getChildByName('console');
        let handleCommand = this.handleCommand;
        let commandHistory = this.commandHistory;
        let commandHistoryIndex = 0;

        consoleInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                handleCommand(event, this.value, logBox, battleScene, mainScene)
                commandHistory.unshift(this.value);
                this.value = '';
                commandHistoryIndex = 0;
            }
            //handle arrow up
            if(event.keyCode == '38' && commandHistoryIndex < commandHistory.length){
                this.value = commandHistory[commandHistoryIndex++]
            }
            //handle arrow down
            if(event.keyCode == '40'&& commandHistoryIndex > 0){
                this.value = commandHistory[--commandHistoryIndex]
            }
        })
    }

    handleCommand(event, value, logBox, battleScene, mainScene){
        logBox.emitCommand(value)
        let command = value.split(" ")
        let player = battleScene.getPlayer();

        switch(command[0]){
            case "battle":
                mainScene.scene.switch('battle');
                logBox.emitLog('battle started');
                break;

            case "/commands":
                fetch('/commands').then(res=>{
                    return res.json()
                }).then(data => {
                    data.forEach(command => logBox.emitLog(command.command)) 
                })
                break;
            case "/clear":
                logBox.clear();
                break;
            case "/man":
                command[1] = command[1]? command[1]: '/man' 
                fetch(`/man?command=${command[1]}`).then(res=>{
                    return res.json()
                }).then(data => {
                    for(let key of Object.keys(data))
                        logBox.emitLog(`${key}: ${data[key]}`)
                })
                break;
            case "/dice":
                logBox.emitLog(`${player.diceNum} dice left`)
                break;


            case "back":
                battleScene.scene.switch('main');
                break;

            case "move":
                mainScene.moveChar(command[1])
                break;
                
            case "roll":
                mainScene.rollDiceWithoutValues(command[1]);
                break;
            case "attack":
                let numDice = command[2] ? command[2]:0 
                battleScene.attack(command[1], numDice);
                break;
            case "heal":
            case "Heal":
                if(player.action == 'Rest'){
                    let newHP = parseInt(player.hp.text,10) + 20;
                    player.hp.text = newHP
                    logBox.emitLog('Player healed +20 hp')
                }
                    
                else
                    return;
                player.action = 'none';
                break;
            case "make":
            case "Make":
                if(player.action == 'Rest'){
                    player.diceNum += 5;
                    logBox.emitLog('Player made 5 dice')
                }
                else
                    return;
                player.action = 'none';
                break;
            case "run":
            case "Run":
                if(player.action == 'Event'){
                    logBox.emitLog('You ran away')
                }
                else
                    return;
                player.action = 'none';
                break;
            case "eat":
            case "Eat":
                if(player.action == 'Event'){
                    player.base_damage ++;
                    logBox.emitLog('Became healty. Player gained +1 base damage')
                }
                else
                    return;
                player.action = 'none';
                break;
                

        }
    }
}