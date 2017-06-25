import Phaser from 'phaser'


export default class Door extends Phaser.Sprite {
  static createFloorDoor({ game, offset }) {
    const door = new this({
      game,
      x: game.world.width + 100,
      y: game.world.height + 80 + offset,
      asset: 'door-reversed',
    })
    door.setUp()
    return door
  }

  static createCellingDoor({ game, offset }) {
    const door = new this({
      game,
      x: game.world.width + 100,
      y: offset - 80,
      asset: 'door',
    })
    door.setUp()
    return door
  }

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
