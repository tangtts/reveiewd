//

let arr = [1, 3, 2, 5, 4, 0];
// 最大值冒泡到最后
function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <= arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}
bubble(arr);

// 选择排序
// 找到最小值，然后拿当前值 与 最小值进行替换
function selectSort(arr) {
  let miniIndex;
  for (let i = 0; i < arr.length; i++) {
    miniIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[miniIndex]) {
        miniIndex = j;
      }
    }
    [arr[i], arr[miniIndex]] = [arr[miniIndex], arr[i]];
  }
  return arr;
}
selectSort(arr);

// 插入排序
// 拿出当前的一张牌，如果后面的牌比自己小，自己往后移动，知道后面的牌比自己大
function insertedSort(arr) {
  let current, prev;
  for (let i = 1; i < arr.length; i++) {
    current = arr[i];
    prev = i - 1;
    while (current < arr[i] && prev > 0) {
      prev--;
      arr[j + 1] = arr[j];
    }
    arr[prev + 1] = current;
  }
  return arr;
}
let r = insertedSort(arr);
console.log(r);
