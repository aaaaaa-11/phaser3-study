/// <reference types="phaser" />

type Aligns = keyof typeof Phaser.Display.Align

type AlignKey = Exclude<Aligns, 'To' | 'In'>

type AllPlaceOn = Phaser.Geom.Circle &
  Phaser.Geom.Ellipse &
  Phaser.Geom.Line &
  Phaser.Geom.Rectangle &
  Phaser.Geom.Triangle

type AnyPlaceOn =
  | Phaser.Geom.Circle
  | Phaser.Geom.Ellipse
  | Phaser.Geom.Line
  | Phaser.Geom.Rectangle
  | Phaser.Geom.Triangle
