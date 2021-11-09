export default class CardBase extends Phaser.GameObjects.Container {
	constructor(data){
		let {scene, arrX, arrY, title, ui, cost_num, monsters, event} = data;
		//set initial x,y position
		let x = arrX*200 + 200;
		let y = arrY*200 - 500;

		let spriteBg = new Phaser.GameObjects.Sprite(scene, 0, 0, ui.bg);
		let spriteImg = new Phaser.GameObjects.Sprite(scene, 0, -5, ui.img);
		let spriteFrame = new Phaser.GameObjects.Sprite(scene, 0, -10, ui.frame);
		let spriteCost = new Phaser.GameObjects.Sprite(scene, -33, -40, ui.cost);
		let sptireDesc = new Phaser.GameObjects.Sprite(scene, 0, 50, ui.desc);
		let textTitle = new Phaser.GameObjects.Text(scene, 0, 40, title, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		let textCost = new Phaser.GameObjects.Text(scene, -36, -52, cost_num, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		textTitle.x = -textTitle.width/2
		spriteCost.setScale(1.2)
		spriteImg.setScale(1.4)

		super(scene,x,y,[spriteBg, spriteImg,spriteFrame, spriteCost, sptireDesc, textTitle, textCost]);
		this.spriteBg = spriteBg;
		this.spriteCost = spriteCost;
		this.sptireDesc = sptireDesc;
		this.scene = scene;
		this.scene.add.existing(this);
		this.arrX = arrX;
		this.arrY = arrY;
		this.title = title
		this.monsters = monsters
		this.textCost = textCost;
		this.event = event;

	}

	getPos(){
		return {arrX: this.arrX,
				arrY: this.arrY};
	}
	setCost(num){
		this.textCost.text = num;
	}
}