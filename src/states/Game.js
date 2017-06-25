/* globals __DEV__ */
import Phaser from 'phaser'
import Lesh from '../sprites/Lesh'
import Door from '../sprites/Door'


export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.speedMultiplier = 1.0

    this.lesh = new Lesh({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'lesh',
    })

    this.add.existing(this.lesh)
    this.lesh.scale.setTo(0.05, 0.05)


    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.physics.arcade.gravity.y = 300

    this.physics.enable(this.lesh, Phaser.Physics.ARCADE)

    this.lesh.body.collideWorldBounds = true
    this.lesh.body.bounce.y = 0.8

    this.time.events.add(Phaser.Timer.SECOND * 2, this.spawnDoorPair.bind(this))

    this.time.events.loop(Phaser.Timer.SECOND * 2, this.increaseSpeedMultiplier.bind(this))
  }

  spawnDoorPair() {
    const offset = Phaser.Math.between(0, 400) - 200
    const floorDoor = new Door({
      game: this,
      x: this.world.width + 100,
      y: this.world.height + 80 + offset,
      asset: 'door-reversed',
    })

    const cellingDoor = new Door({
      game: this,
      x: this.world.width + 100,
      y: (0 - 80) + offset,
      asset: 'door',
    })

    floorDoor.setUp()
    cellingDoor.setUp()

    const spawnMultiplier = Math.sqrt(this.speedMultiplier)

    this.time.events.add((Phaser.Timer.SECOND * 2) / spawnMultiplier, this.spawnDoorPair, this)
  }

  increaseSpeedMultiplier() {
    this.speedMultiplier += 0.02

    this.physics.arcade.gravity.y = 300 * this.speedMultiplier
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.lesh, 32, 32)
    }
  }
}
