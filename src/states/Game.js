/* globals __DEV__ */
import Phaser from 'phaser'
import Lesh from '../sprites/Lesh'
import Door from '../sprites/Door'


export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.speedMultiplier = 1.0

    this.setUpPhysics()

    this.lesh = Lesh.createLesh({ game: this })

    this.time.events.add(Phaser.Timer.SECOND * 2, this.spawnDoorPair.bind(this))
    this.time.events.loop(Phaser.Timer.SECOND * 2, this.increaseSpeedMultiplier.bind(this))
  }

  setUpPhysics() {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.physics.arcade.gravity.y = 300
  }

  spawnDoorPair() {
    const offset = Phaser.Math.between(0, 400) - 200

    Door.createFloorDoor({ game: this, offset })
    Door.createCellingDoor({ game: this, offset })

    const spawnMultiplier = Math.sqrt(this.speedMultiplier)
    this.time.events.add((Phaser.Timer.SECOND * 2) / spawnMultiplier, this.spawnDoorPair.bind(this))
  }

  increaseSpeedMultiplier() {
    this.speedMultiplier += 0.02
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.lesh, 32, 32)
    }
  }
}
