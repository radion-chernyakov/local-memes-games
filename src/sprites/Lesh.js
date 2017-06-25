import Phaser from 'phaser'

const SPACE = Phaser.Keyboard.SPACEBAR

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
  }

  update() {
    if (this.game.input.keyboard.isDown(SPACE)) {
      this.body.velocity.y = -300
    }
  }
}
