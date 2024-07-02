export enum GameState {
  LOADING = 'loading',
  CREATE = 'create',
  GAMEOVER = 'gameOver'
}

export enum GameEvents {
  PAUSE = 'pause',
  RESUME = 'resume',
  GAMEOVER = 'gameOver'
}

export enum PLACE_ON {
  CIRCLE = 'PlaceOnCircle',
  ELLIPSE = 'PlaceOnEllipse',
  LINE = 'PlaceOnLine',
  RECTANGLE = 'PlaceOnRectangle',
  TRIANGLE = 'PlaceOnTriangle',
  RANDOM_CIRCLE = 'RandomCircle',
  RANDOM_ELIPSE = 'RandomEllipse',
  RANDOM_LINE = 'RandomLine',
  RANDOM_RECTANGLE = 'RandomRectangle',
  RANDOM_TRIANGLE = 'RandomTriangle'
}

export enum GEO {
  CIRCLE = 'Circle',
  ELLIPSE = 'Ellipse',
  LINE = 'Line',
  RECTANGLE = 'Rectangle',
  TRIANGLE = 'Triangle'
}

// placeOn对应的Geo
export const GeoMap = {
  [PLACE_ON.CIRCLE]: GEO.CIRCLE,
  [PLACE_ON.ELLIPSE]: GEO.ELLIPSE,
  [PLACE_ON.LINE]: GEO.LINE,
  [PLACE_ON.RECTANGLE]: GEO.RECTANGLE,
  [PLACE_ON.TRIANGLE]: GEO.TRIANGLE,
  [PLACE_ON.RANDOM_CIRCLE]: GEO.CIRCLE,
  [PLACE_ON.RANDOM_ELIPSE]: GEO.ELLIPSE,
  [PLACE_ON.RANDOM_LINE]: GEO.LINE,
  [PLACE_ON.RANDOM_RECTANGLE]: GEO.RECTANGLE,
  [PLACE_ON.RANDOM_TRIANGLE]: GEO.TRIANGLE
}

export const PlaceOnTextMap = {
  [PLACE_ON.CIRCLE]: '圆形',
  [PLACE_ON.ELLIPSE]: '椭圆',
  [PLACE_ON.LINE]: '直线',
  [PLACE_ON.RECTANGLE]: '矩形',
  [PLACE_ON.TRIANGLE]: '三角形',
  [PLACE_ON.RANDOM_CIRCLE]: '圆形随机填充',
  [PLACE_ON.RANDOM_ELIPSE]: '椭圆随机填充',
  [PLACE_ON.RANDOM_LINE]: '直线随机填充',
  [PLACE_ON.RANDOM_RECTANGLE]: '矩形随机填充',
  [PLACE_ON.RANDOM_TRIANGLE]: '三角形随机填充'
}

export enum ROTATE_TYPE {
  ROTATE = 'Rotate',
  ROTATE_AROUND = 'RotateAround',
  ROTATE_AROUND_DISTANCE = 'RotateAroundDistance'
}

// RotateXXX对应的描述
export const RotateTextMap = {
  [ROTATE_TYPE.ROTATE]: '旋转对应角度',
  [ROTATE_TYPE.ROTATE_AROUND]: '绕点旋转对应角度',
  [ROTATE_TYPE.ROTATE_AROUND_DISTANCE]: '绕点旋转对应角度和距离'
}

export enum SET_TYPE {
  SET_ALPHA = 'SetAlpha',
  SET_BLEND_MODE = 'SetBlendMode',
  SET_DEPTH = 'SetDepth',
  SET_HIT_AREA = 'SetHitArea',
  SET_ORIGIN = 'SetOrigin',
  SET_ROTATION = 'SetRotation',
  SET_SCALE = 'SetScale',
  SET_SCALE_X = 'SetScaleX',
  SET_SCALE_Y = 'SetScaleY',
  SET_SCROLL_FACTOR = 'SetScrollFactor',
  SET_SCROLL_FACTOR_X = 'SetScrollFactorX',
  SET_SCROLL_FACTOR_Y = 'SetScrollFactorY',
  SET_TINT = 'SetTint',
  SET_VISIBLE = 'SetVisible',
  SET_X = 'SetX',
  SET_Y = 'SetY',
  SET_XY = 'SetXY'
}

export const BlendModesMap = {
  NORMAL: Phaser.BlendModes.NORMAL,
  ADD: Phaser.BlendModes.ADD,
  MULTIPLY: Phaser.BlendModes.MULTIPLY,
  SCREEN: Phaser.BlendModes.SCREEN,
  ERASE: Phaser.BlendModes.ERASE
}
