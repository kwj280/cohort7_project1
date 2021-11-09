import InputBox from './InputBox.js'
import LogBox from './LogBox.js'
import Player from './Player.js'
import Monster from './Monster.js'

const monsters = [{
        name: 'skeleton',
        maxHP: 40,
        base_damage: 3,
        x: 400,
        y: 400,
    },
    {
        name: 'goblin',
        maxHP: 50,
        base_damage: 4,
        x: 200,
        y: 300,
    },
    {
        name: 'flying_eye',
        maxHP: 20,
        base_damage: 5,
        x: 400,
        y: 200,
    },
    {
        name: 'reper',
        maxHP: 100,
        base_damage: 15,
        x: 200,
        y: 300,
    },
]

const player_data = {
    name: 'player',
    maxHP: 100,
    base_damage: 10,
    dice_damage: 2,
    x: 600,
    y: 300
}

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super();
        Phaser.Scene.call(this, { key: 'battle', active: false });

        this.char;
        this.player;
        this.monsters = [];
        this.logBox;
    }

    preload() {
        this.logBox = this.scene.get('LogBox');
        //player
        this.load.spritesheet('player', 'assets/player/char.png', { frameWidth: 112, frameHeight: 133 });
        this.load.spritesheet('player_idle', 'assets/player/idle.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('player_light_atk', 'assets/player/light_atk.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('player_run', 'assets/player/run.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('player_take_hit', 'assets/player/hurt2.png', { frameWidth: 80, frameHeight: 80 });
        //skeleton
        this.load.spritesheet('skeleton_idle', 'assets/Skeleton/Idle.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('skeleton_attack', 'assets/Skeleton/Attack.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('skeleton_walk', 'assets/Skeleton/Walk.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('skeleton_take_hit', 'assets/Skeleton/Take_Hit.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('skeleton_death', 'assets/Skeleton/Death.png', { frameWidth: 150, frameHeight: 150 });
        //goblin
        this.load.spritesheet('goblin_idle', 'assets/Goblin/Idle.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('goblin_attack', 'assets/Goblin/Attack.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('goblin_walk', 'assets/Goblin/Run.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('goblin_take_hit', 'assets/Goblin/Take_Hit.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('goblin_death', 'assets/Goblin/Death.png', { frameWidth: 150, frameHeight: 150 });
        //flying eye
        this.load.spritesheet('flying_eye_idle', 'assets/Flying_eye/Flight.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('flying_eye_attack', 'assets/Flying_eye/Attack.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('flying_eye_take_hit', 'assets/Flying_eye/Take_Hit.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('flying_eye_death', 'assets/Flying_eye/Death.png', { frameWidth: 150, frameHeight: 150 });

        //Reper
        this.load.spritesheet('reper_idle', 'assets/Boss/idle2.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('reper_attack', 'assets/Boss/attacking.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('reper_take_hit', 'assets/Boss/skill1.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('reper_death', 'assets/Boss/death.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('reper_walk', 'assets/Boss/idle.png', { frameWidth: 100, frameHeight: 100 });

        this.load.image('bg', 'assets/background1.png');


    }

    create() {
        this.add.dom(700, 500).createFromHTML(`<div id="dice-battle"></div>`); // elementType = 'div'
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height - 70, 'bg').setOrigin(0);
        this.createAnimation();

        let scene = this;
        let player_sp = this.add.sprite(0, 0)
        player_sp.setScale(3)
        player_sp.flipX = true;
        this.player = new Player({ scene, player_sp, player_data });
        this.add.existing(this.player)


        monsters.forEach(monster_data => {
            let monster_sp = this.add.sprite(0, 0);
            monster_sp.setScale(2);
            if(monster_data.name == 'reper')
                monster_sp.setScale(4);

            let mon = new Monster({ scene, monster_sp, monster_data })
            this.add.existing(mon);
            mon.setVisible(false);
            this.monsters.push(mon);
        })
            this.scene.switch('main');
    }
    rollDice(numDice, attackCallback) {
        if (numDice == 0)
            return attackCallback(this.monsters, this.player, [0])
        numDice = numDice ? numDice : 1

        const element = document.getElementById('dice-battle');
        const numberOfDice = parseInt(numDice, 10);
        const options = {
            element, // element to display the animated dice in.
            numberOfDice, // number of dice to use 
            callback: (res) => {
                this.logBox.emitLog(`result: ${res}`);
                attackCallback(this.monsters, this.player, res);
                this.player.diceNum -= numDice;

            }
        }
        rollADie(options);
    }

    createAnimation() {

        this.anims.create({
            key: 'anim',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 17 }),
            frameRate: 28,
            repeat: -1
        });
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player_idle'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'player_run',
            frames: this.anims.generateFrameNumbers('player_run'),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'player_light_atk',
            frames: this.anims.generateFrameNumbers('player_light_atk'),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'player_take_hit',
            frames: this.anims.generateFrameNumbers('player_take_hit'),
            frameRate: 20,
            repeat: 0
        });


        this.anims.create({
            key: 'skeleton_idle',
            frames: this.anims.generateFrameNumbers('skeleton_idle'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'skeleton_attack',
            frames: this.anims.generateFrameNumbers('skeleton_attack'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'skeleton_walk',
            frames: this.anims.generateFrameNumbers('skeleton_walk'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'skeleton_death',
            frames: this.anims.generateFrameNumbers('skeleton_death'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'skeleton_take_hit',
            frames: this.anims.generateFrameNumbers('skeleton_take_hit'),
            frameRate: 12,
            repeat: 0
        });


        this.anims.create({
            key: 'goblin_idle',
            frames: this.anims.generateFrameNumbers('goblin_idle'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'goblin_attack',
            frames: this.anims.generateFrameNumbers('goblin_attack'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'goblin_walk',
            frames: this.anims.generateFrameNumbers('goblin_walk'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'goblin_death',
            frames: this.anims.generateFrameNumbers('goblin_death'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'goblin_take_hit',
            frames: this.anims.generateFrameNumbers('goblin_take_hit'),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'flying_eye_idle',
            frames: this.anims.generateFrameNumbers('flying_eye_idle'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'flying_eye_attack',
            frames: this.anims.generateFrameNumbers('flying_eye_attack'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'flying_eye_walk',
            frames: this.anims.generateFrameNumbers('flying_eye_idle'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'flying_eye_death',
            frames: this.anims.generateFrameNumbers('flying_eye_death'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'flying_eye_take_hit',
            frames: this.anims.generateFrameNumbers('flying_eye_take_hit'),
            frameRate: 12,
            repeat: 0
        });


        this.anims.create({
            key: 'reper_idle',
            frames: this.anims.generateFrameNumbers('reper_idle'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'reper_attack',
            frames: this.anims.generateFrameNumbers('reper_attack'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'reper_walk',
            frames: this.anims.generateFrameNumbers('reper_walk'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'reper_death',
            frames: this.anims.generateFrameNumbers('reper_death'),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'reper_take_hit',
            frames: this.anims.generateFrameNumbers('reper_take_hit'),
            frameRate: 12,
            repeat: 0
        })
    }
    spawnMonster(monsters){
        this.monsters.forEach(monster =>{

            if($.inArray(monster.name, monsters) > -1){
                monster.spawn();
            }
        })

    }
    attack(target, numDice) {
        let monsters = this.monsters;
        let player = this.player;
        this.rollDice(numDice, function(monsters, player, res) {
            monsters.forEach(monster => {
                if (target == monster.name) {
                    player.attack(monster, res)
                }
            })
        })
    }
    monsterAttack() {
        let player = this.player
        this.monsters.forEach((monster, i) => {
            if (monster.isAlive() && monster.visible) {
                setTimeout(function() {
                    monster.attack(player)
                }, i * 1000)

            }
        })
    }
    battleFinished(){
        let finished = true;
        this.monsters.forEach(monster=>{
            if(monster.isAlive() && monster.visible)
                finished = false;
        })
        return finished
    }
    cleanUp(){
        this.monsters.forEach(monster=>{
            monster.setVisible(false)
        })
        this.scene.switch('main')
    }
    getPlayer(){
        return this.player
    }
}