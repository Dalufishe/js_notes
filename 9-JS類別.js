//!                Javascript 類別
//!#################################################
/*
?[類別]
* 類別使用基於原型(prototype-based)的繼承(兩個物件從相同的原型繼承特性)
* 類別從最開始就存在, ES6引進了種嶄新的語法(class關鍵字)來使類別建立變得容易

?[類別與原型]
* JS類別是從相同原型繼承特性的物件所組成的一個集合
* 原型物件為類別的中心特色 - 物件們從相同的原型繼承特性 - 物件們為相同類別的實體
* 舊版本使用Object.create()來使物件繼承原型
* 一個類別的實體通常還需要初始化
* 可使用工廠函式, 調用建構器, class關鍵字等等建構類別

?[類別與建構器]
* 建構器設計用來初始化新創物件的函式, 使用new關鍵字調用
~ function Range(from, to) {
~   this.from = from;
~   this.to = to;
~ } 
~ Range.prototype = {
~   toString() {return "(" + this.from + "..." + this.to + ")"},
~   includes(x) { return this.from <= x && x <= this.to },
~ };

?[建構器, 類別身分, instanceOf]
* 原型物件是類別的必要基礎, 初始化並非類別的必要基礎
* 類別身分取決於該物件之原型物件
* instanceOf會判斷右邊是否為左邊之原型

?[constructor特性]
* 預設prototype特性中有個constructor特性, 指向原本的函式物件

?[class關鍵字]
~　class Range {
~   constructor(from, to){
~       this.from = from;
~       this.to = to;
~   }
~   include(x) { return x <= this.from && this.to <= x; }
~   toString() { return "(" + this.from + "..." + this.to + ")" }
~ }

~ class Circle {

~   #r = 0;
~   static PI = Math.PI;
~   static No_Circle = new Circle(0);
~   static newTime = 0;

~   constructor(radius) {
~       if (radius >= 0) this.#r = radius;
~       else { throw new Error("Radius Must Larger Than 0") };
~       Circle.newTime++ ;
~   }
~   get radius() { return this.#r }
~   set radius(radius) {
~       if (radius >= 0) this.#r = radius;
~       else { throw new Error("Radius Must Larger Than 0") }
~   }
~   circumference() {
~       return Circle.PI * 2 * this.#r;
~   }
~   area() {
~       return Circle.PI * Math.pow((this.#r), 2)
~   }
~   toString() {
~       return `Circle-r-${this.#r}`
~   }
~   static eqal(a, b) {
~       return a instanceof Circle &&
~           b instanceof Circle &&
~           a.#r === b.#r
~   }
~ }

?[子類別]
* 某類別為一個類別的子類別, 其prototype特性需繼承該類別prototype特性
~ Sapn.prototype = Object.create(Range.prototype);
* 使用extends和super
* extends不只繼承了prototype特性, 還繼承了靜態方法等 (繼承了整個class)
* super()用來調用超類別建構器(若子類別沒有建構器, 會自動建立並將收到的直傳給super())
* super()前不可在建構器使用this
* 
~ class TypeArray extends Array {
~   #elementType = undefined;
~ static whoNew = []; // 紀錄建構器調用(包括子類別super)
~   constructor(type, ...elementArgs) {
~       for (let element of elementArgs) {
~           if (typeof element !== type) throw new TypeError(`Wrong type for element ${element} at index ${elementArgs.indexOf(element)}`);
~       } super(...elementArgs);
~       this.#elementType = type;
~       TypeArray.whoNew.push(new.target.name);
~   }
~   push(...elementArgs) {
~       for (let element of elementArgs) {
~           if (typeof element !== this.#elementType) throw new TypeError("Wrong type push");
~       } return super.push(...elementArgs);
~   }
~   unshift(...elementArgs) {
~       for (let element of elementArgs) {
~           if (typeof element !== this.#elementType) throw new TypeError("Wrong type unshift");
~       } return super.unshift(...elementArgs);
~   }
~   static from(arraylike) {
~       return new TypeArray(typeof arraylike[0], ...arraylike);
~   }
~   static of(...elementArgs) {
~       return new TypeArray(typeof elementArgs[0], ...elementArgs);
~   }
~ }
*/


