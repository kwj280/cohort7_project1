import InputBox from './InputBox.js'
import LogBox from './LogBox.js'
import CardBase from './CardBase.js'
import BattleScene from './battle.js'


class MainScene extends Phaser.Scene {
    constructor() {
        super('main');
        this.logBox;
        this.battleScene;
        this.inputBox
        this.cards = [];
        this.playerCard;
        this.player;
    }

    preload() {
        this.load.image('bg_blue', './assets/card/bg_blue.png')
        this.load.image('bg_grey', './assets/card/bg_grey.png')
        this.load.image('bg_red', './assets/card/bg_red.png')
        this.load.image('bg_purple', './assets/card/bg_purple.png')

        this.load.image('frame_wood', './assets/card/frame_wood.png')
        this.load.image('frame_stone', './assets/card/frame_stone.png')

        this.load.image('cost_wood', './assets/card/cost_wood.png')
        this.load.image('cost_stone', './assets/card/cost_stone.png')

        this.load.image('desc_wood', './assets/card/desc_wood.png')
        this.load.image('desc_stone', './assets/card/desc_stone.png')

        this.load.image('skull', './assets/icon/skull.png')
        this.load.image('trade', './assets/icon/human.png')
        this.load.image('event', './assets/icon/scroll.png')
        this.load.image('campfire', './assets/icon/heart.png')
        this.load.image('treasure', './assets/icon/coin_gold.png')

        this.load.image('main_char', './assets/main_char.png')
        this.load.image('none', './assets/none.png')
    }

    create() {
        this.logBox = this.scene.get('LogBox')
        this.inputBox = this.scene.get('InputBox');
        this.battleScene = this.scene.get('battle')
        this.player = this.battleScene.getPlayer()
        this.add.dom(700, 500).createFromHTML(`<div id="dice-box1"></div>`); // elementType = 'div'
        this.loadCards();
        // this.scene.switch('battle');

    }

    showMap() {
        this.cards.forEach(card => {
            this.tweens.add({
                targets: card,
                y: '+=700',
                duration: Phaser.Math.Between(1900, 2000),
                ease: 'Expo.easeInOut',
                yoyo: true,
                hold: 800
            });
        })
    }

    moveChar(direction) {
        let moveX = 0;
        let moveY = 0;
        if (direction === "up") {
            this.playerCard.arrY--
            moveY -= 200;
        }
        if (direction === "right") {
            this.playerCard.arrX++
            moveX += 200;
        }
        if (direction === "left") {
            this.playerCard.arrX--;
            moveX -= 200
        }
        let cardMovingTo = this.getCardAtPos(this.playerCard.getPos())
        if(cardMovingTo == undefined){
            this.logBox.emitLog("Cannot move to there")
            return;
        }
        if (cardMovingTo.textCost.text > this.playerCard.textCost.text) {

            //revert the position
            if (direction === "up") {
                this.playerCard.arrY++
                moveY += 200;
            }
            if (direction === "right") {
                this.playerCard.arrX--
                moveX -= 200;
            }
            if (direction === "left") {
                this.playerCard.arrX++;
                moveX += 200
            }
            this.logBox.emitLog("Not enough moving cost")
            this.logBox.emitLog("use roll command to get moving cost")

            return;
        }


        let tween = this.tweens.add({
            targets: this.playerCard,
            x: this.playerCard.x + moveX,
            y: this.playerCard.y + moveY,
            duration: 1000,
            ease: 'Power3',
            onComplete: this.centerMap,
            onCompleteParams: [this.playerCard, this.cards, this, direction],

        });
        this.playerCard.setCost(0)

        // console.log(this.playerCard.getPos())

    }

    handleCardEvent(card) {
        if (!card)
            return;

        switch (card.title) {
            case "Battle":
            case "Boss":
                this.scene.switch('battle');
                this.battleScene.spawnMonster(card.monsters)
                this.logBox.emitLog('battle started');
                break;
            case "Rest":
                this.logBox.emitLog('You have reached safe place');
                this.logBox.emitLog('Here, you can either:');
                this.logBox.emitLog('<i>Heal</i> yourself');
                this.logBox.emitLog('<i>Make</i> dice');
                this.player.action = "Rest";
                break;
            case "Trade":
            case "Treasute":
                this.logBox.emitLog('Not implemented yet');
                break;
            case "Event":
                this.player.action = "Event";
                let event = card.event;
                let choices = card.event.choices;
                this.logBox.emitLog(event.description);
                choices.forEach(choice =>{
                    this.logBox.emitLog(choice);
                })
                break;
        }

    }

    centerMap(tween, target, playerCard, cards, scene, direction) {
        const center = {
            x: 400,
            y: 500
        }
        let xGap = center.x - playerCard.x;
        let yGap = center.y - playerCard.y;
        scene.tweens.add({
            targets: cards,
            // x: `+=${xGap}`,
            y: `+=${yGap}`,
            duration: 1000,
            ease: 'Power3',
        });

        //remove bottom cards
        if (direction == "up") {
            cards.forEach(card => {
                if (card.title != 'You' && card.y > 400) {
                    card.setVisible(false)
                }
            })
        }

        let card = scene.getCardAtPos(scene.playerCard.getPos())
        scene.handleCardEvent(card)
    }
    rollDiceWithoutValues(numDice) {
        numDice = numDice ? numDice : 1
        const element = document.getElementById('dice-box1');
        const numberOfDice = parseInt(numDice, 10);
        const options = {
            element, // element to display the animated dice in.
            numberOfDice, // number of dice to use 
            callback: (res) => {
                this.logBox.emitLog(`result: ${res}`)
                let diceSum = res.reduce((a, b) => a + b, 0);
                this.player.diceNum -= numDice;
                this.playerCard.setCost(diceSum)
            }
        }
        rollADie(options);
    }

    loadCards() {
        fetch('/cards').then(res => {
            return res.json()
        }).then(cards => {
            cards.forEach(card => {
                card.scene = this
                let cardObj = new CardBase(card)
                cardObj.setScale(1.5)
                this.cards.push(cardObj)
                if (card.title == 'You')
                    this.playerCard = cardObj
            })
            this.showMap()

        })
    }

    getCardAtPos(pos) {
        let cardFound;
        this.cards.forEach(card => {
            if (card.getPos().arrX == pos.arrX && card.getPos().arrY == pos.arrY && card.title != 'You')
                cardFound = card;
        })
        return cardFound;
    }
}

const config = {
    scale: {
        parent: 'myGame',
        width: 1280,
        height: 720,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    type: Phaser.AUTO,
    pixelArt: true,
    scene: [BattleScene, MainScene, InputBox, LogBox],
    dom: {
        createContainer: true
    },

}

const game = new Phaser.Game(config)