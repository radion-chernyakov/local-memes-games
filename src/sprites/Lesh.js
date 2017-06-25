import Phaser from 'phaser'

const SPACE = Phaser.Keyboard.SPACEBAR

export default class extends Phaser.Sprite {
  static createLesh({ game }) {
    const lesh = new this({
      game,
      x: game.world.centerX,
      y: game.world.centerY,
      asset: 'lesh',
    })
    lesh.setUp()
    return lesh
  }

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
  }

  update() {
    if (this.game.input.keyboard.isDown(SPACE)) {
      this.body.velocity.y = -300
    }
  }

  setUp() {
    this.game.add.existing(this)
    this.game.physics.enable(this, Phaser.Physics.ARCADE)

    this.scale.setTo(0.05, 0.05)
    this.body.collideWorldBounds = true
    this.body.bounce.y = 0.8
  }
}
