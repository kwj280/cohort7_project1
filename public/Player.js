import LogBox from './LogBox.js'


export default class Player extends Phaser.GameObjects.Container {
	constructor(data){
		let {scene, player_sp, player_data} = data;
		let x = player_data.x;
		let y = player_data.y;
		let hp_text = new Phaser.GameObjects.Text(scene, 0, 80, player_data.maxHP, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 20 });
		let name_text = new Phaser.GameObjects.Text(scene, 0, 50, player_data.name, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 16 });
		hp_text.x = -hp_text.width/2 + 30
		name_text.x = -name_text.width/2 + 30

		super(scene,x,y,[ player_sp,hp_text,name_text]);
		this.player_sp = player_sp;
		this.x = x;
		this.y = y;
		this.player_sp.play('player_idle')
		this.alive = true;
		this.hp = hp_text;
		this.name = player_data.name
		this.base_damage = player_data.base_damage;
		this.dice_damage = player_data.dice_damage;
        this.logBox = scene.scene.get('LogBox');
        this.battleScene = scene.scene.get('battle');
        this.diceNum = 30;
        this.action = '';

	}

	attack(target, diceRes){
		this.player_sp.play('player_run')
		this.player_sp.chain(['player_light_atk', 'player_idle'])
		this.scene.tweens.add({
            targets: this.player_sp,
            x: target.x - this.x + 100,
            y: target.y - this.y,
            duration: 1000,
            hold: 1100,
            yoyo: true,
            ease: 'Linear',
            onComplete: function(tween, target, scene, logBox, battleScene){
            	scene.monsterAttack();
            	if(scene.battleFinished()){
            		logBox.emitLog('Battle finished')
            		battleScene.cleanUp();
            	}
            },
            onCompleteParams: [this.scene, this.logBox, this.battleScene]
        });
        let diceSum = diceRes.reduce((a,b)=>a+b, 0);
		let totalDamage = diceSum*this.dice_damage + this.base_damage;
        setTimeout(function(){
        	target.getHit(totalDamage)
        },1200)
        this.logBox.emitLog(`Attack ${target.name} with ${totalDamage} damage`)

	}

	getHit(dmg){
		this.hp.text -= dmg
		this.player_sp.play(`${this.name}_take_hit`)
		this.player_sp.chain([`${this.name}_idle`])
		if(this.hp.text <=0)
			this.death()
	}
	death(){
		this.alive = false;

	}
	isAlive(){
		return this.alive
	}

}