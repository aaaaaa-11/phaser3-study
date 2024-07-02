# Utils

## Array

### BringToTop
```js
/**
 * 将指定元素放到数组顶部
 */
BringToTop(array, item)

// 例如：
let a = [1, 2, 3, 4] 
BringToTop(a, 2) // a = [1, 3, 4, 2] 
```

### Range
```js
/**
 * 用数组a、b中的元素按照options配置，填充成新的数组
 * @param {array} arr1
 * @param {array} arr2
 * @param {object} option
 * option可选：
 *  repeat：重复次数，-1表无线重复,
 *  random, randomB, yoyo, max, qty
 */
Range(arr1, arr2, [options])

// 例：
let arr1 = ['1', 'a', false]
let arr2 = [true, 'arr2']
Phaser.Utils.Array.Range(arr1, arr2);
/* 
[
    {a: '1', b: true},
    {a: '1', b: 'arr2'},
    {a: 'a', b: true},
    {a: 'a', b: 'arr2'},
    {a: false, b: true},
    {a: false, b: 'arr2'},
]
*/
```
