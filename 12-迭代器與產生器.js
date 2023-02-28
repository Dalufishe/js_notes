//!             Javascript 迭代器與產生器
//!#################################################
/*
?[迭代器]
* 可迭代(物件)(iterable, 使用迭代器)意味著資料結構可使用for/of迴圈來迭代(ES6新功能)
~ let sum = 0;
~ for(let i of [1, 2, 3]){
~   sum += i;
~ } console.log(sum);
* 迭代器可與...運算子搭配, 用於分散(spead)

?[迭代器運作方式]
* 可迭代物件: 可被迭代的物件本身, 如Array, Set, Map物件
* 迭代器物件: 負責進行迭代
* 迭代結果物件: 用以存放每個迭代每個步驟的結果
* 運作原理:
*   可迭代物件具有一個特殊的迭代器方法([Symbol.iterator]()), 他會回傳一可迭代器物件
*   一個迭代器物件具有一個next()方法, 此方法會回傳一個迭代結果物件
*   一個迭代結果物件具有value和done特性, 指出迭代出的值和是否結束迭代
~ let iterable = [12, 20, 99];
~ let iterator = iterable[Symbol.iterator]();
~ for (let result = iterator.next(); !result.done; result = iterator.next()){
~   console.log(result.value);
~ }
* 迭代器物件本身也是可迭代物件>_<

?[實作可迭代物件]
* 不仰賴產生器實作可迭代物件
~class Range {
~   constructor(from, to) {
~       this.from = from;
~       this.to = to
~   }
~   has(x) { return typeof x === "number" && this.from <= x && x <= this.to }
~   toString() { return `x | ${this.from} <= x <= ${this.to}` }
~   [Symbol.iterator]() {
~       let next = Math.ceil(this.from);
~       let last = this.to;
~       return {
~           next() {
~               return (next <= last ? { value: next++ } : { done: true })
~           },
~           [Symbol.iterator]() { return this; }
~       }
~   }
~ }
?[產生器]
~ function * (){
~   yield 1;
~   yield 2;
~   yield 4;
~   yield 7;
~ } //定義產生器函式
* 調用產生器函式, 回傳一個產生器物件(一個迭代器, 同時是可迭代物件)
*   next() -> 找yeild數據的值
*   [Symbol.iterator]() -> 回傳本身, 使其可迭代

?[產生器的進階功能]
* 產生器函式中return的值會成為next()done最先抵達true同時的value值
* yield*, yeild運算式的值搭配next()引數, 產生器的return()和thorw()方法等等
*/










