/// <reference types="phaser" />

type Aligns = keyof typeof Phaser.Display.Align

type AlignKey = Exclude<Aligns, 'To' | 'In'>
