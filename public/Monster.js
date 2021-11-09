import LogBox from './LogBox.js'

export default class Monster extends Phaser.GameObjects.Container {
	constructor(data){
		let {scene,x,y, monster_sp, monster_data} = data;
		let hp_text = new Phaser.GameObjects.Text(scene, 0, 80, monster_data.maxHP, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 20 });
		let name_text = new Phaser.GameObjects.Text(scene, 0, 50, monster_data.name, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 16 });
		hp_text.x = -hp_text.width/2
		name_text.x = -name_text.width/2

		super(scene, monster_data.x, monster_data.y,[monster_sp,hp_text, name_text]);
		this.monster_sp = monster_sp;
		this.x = monster_data.x;
		this.y = monster_data.y;
		this.name = monster_data.name
		this.hp = hp_text;
		this.max_hp = monster_data.maxHP;
		this.base_damage = monster_data.base_damage;
		this.alive = true;
		this.active = false;
        this.logBox = scene.scene.get('LogBox');

	}

	attack(target){
		this.monster_sp.play(`${this.name}_walk`, true)
		this.monster_sp.chain([`${this.name}_attack`, `${this.name}_idle`])
		this.scene.tweens.add({
            targets: this.monster_sp,
            x: target.x - this.x - 100,
            y: target.y - this.y,
            duration: 800,
            hold: 1100,
            yoyo: true,
            ease: 'Linear',
        });
		let base_damage = this.base_damage
        setTimeout(function(){
        	target.getHit(base_damage)
        },1200)
        this.logBox.emitLog(`${base_damage} damage gtaken by ${this.name}`)
	}
	getHit(dmg){
		this.hp.text -= dmg
		if(this.hp.text <=0)
			return this.death()
		this.monster_sp.play(`${this.name}_take_hit`, true)
		this.monster_sp.chain([`${this.name}_idle`])
		
	}
	death(){
		this.monster_sp.play(`${this.name}_death`)
		this.alive = false;

	}
	isAlive(){
		return this.alive
	}
	spawn(){
		this.hp.text = this.max_hp;
		this.alive = true;
		this.setVisible(true);
		this.monster_sp.play(`${this.name}_idle`)

	}

}