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
