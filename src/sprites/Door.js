import Phaser from 'phaser'


export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
  }

  update() {
    if (!this.inCamera && this.posision && this.posision.x < 0) {
      this.parent.removeChild(this)
      this.destroy()
    }
  }

  setUp() {
    this.game.add.existing(this)
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.velocity.x = -150 * this.game.speedMultiplier
    this.body.allowGravity = false
  }

  setUpSpeed() {
    this.body.velocity.x = this.game.gameSpeed
  }


}
