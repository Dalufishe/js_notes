//!                Javascript 函式
//!#################################################
/*
?[函式]
* 區塊組成的JS程式碼, 被定義了一次, 可被調用任意次
* 參數化, 調用時為參數提供引數
* 調用情境 - this關鍵字的值
* 函式被指定給某物件特性 - 方法
* 作為初始化一個新創物件函式 - 建構器
* 函式是物件, 指定變數, 傳入函式, 設定特性, 調用方法

?[定義函式]
* function關鍵字: 宣告 或 運算式
* 不使用function關鍵字: 箭頭語法
* 物件字面值和類別定義的簡便語法, 取值器設值器, Function()建構器, 產生器函式(function*), 非同步函式(async function)

$函式宣告
~ function indentifier(indentifier, indentifier, ......){
~   statement
~   ......
~ }
* 函式的名稱會變成一個變數, 值為函式本身
* 函式"宣告"述句會被拉升(hoisted)到外圍指令搞或函式或區塊的頂端 - 可在定義前的程式碼區塊調用
* return值作為調用運算式的值
* 函式宣告可在檔案頂層, 另一個函式中, 區塊中(嚴格模式函式僅存於該區塊)

$函式運算式
* 出現在運算式或述句中, 名稱是選擇性的
~ cosnt f = function indentifier(可寫可不寫)() {}
* 可選擇是否該函式運算式估算的函式值指定到一個變數
* 函式運算式的名稱, 在該函式的區域函式範疇就會包含那個名稱對還是物件的一個繫結
* 函式運算式指定到變數並不會被拉升

$箭頭函式
~ const f = (parameter) => {statement}
* 若只有一個return述句, 可省略return, 分號, 和曲括號
* 若只有一個參數, 可省略括號 (沒有參數須要括號)
* 箭頭函式沒有prototype, 沒有調用情境(它們從定義處範疇繼承this)

$(巢狀函式)
* JS函式定義可內嵌在其他函式定義中
* 內嵌的函式可存取他們內嵌其中的函式的變數和參數

?[調用函式]
* 函式主體的程式碼會在被調用的時候執行
*   作為函式調用
*   作為方法調用
*   作為建構器調用
*   call() apply() 間接調用
*   js語言功能隱含地調用

$函式調用
* 函式是以調用運算式(invocation expresstion)作為函式或方法被調用
~ f(argument)
* 函式的回傳值就是調用運算式的值
* 非嚴格模式的函式調用, 調用情境(this)會式全域物件, 嚴格模式則式undefined(不包含箭頭語法)
~ const strict = function(){return !this}(); //可用來判斷是否為嚴格模式

$方法調用
~ o.m(argument)
* 調用情境(this): 物件本身
* 方法串鏈(method chaining): 利用方法回傳this可重複使用物件並調用方法
* this關鍵字範疇(箭頭函式除外):
*   內嵌的函式不會繼承包含他們函式的this值(被認為是種缺陷, 
*    可透過方法中將this指定變數給內嵌函式使用, 或使用箭頭函式(ES6+), 或使用bind())
~ let object = {
~   method: function(){
~       console.log(this === object); //true
~       console.log(this); //該物件
~       f()
~       function f(){
~           console.log(this === object); //false
~           console.log(this); //全域物件(非嚴格模式)/undefined(嚴格模式)
~       }
~   }
~ }
~ object.method();

$建構器調用
* new + 函式或方法調用
* 用於建立新物件, 並繼承該建構器的prototype特性, 並用於初始化物件
* 新建的物件會被用來當作調用環境, 可使用this參考他

$間接調用
* JS函式是物件, 擁有方法, 其中call()和apply()會間接地調用函式

$隱藏的函式調用
* 取值器和設值器
* 物件被用在字串情境或數值情境
* 迴圈跑可迭代物件的元素
* 帶標記的翻本字面值
* 代理物件

?[函式引數和參數]
* JS的函式定義不會為函式參數指定預期的型別
* 函式調用也不會在你傳入的引數進行型別檢查
* JS函式調用甚至不會檢查傳入的引數數目

$選擇性參數和預設值
* 引數 < 參數, 額外的參數就會被設為預設值, 通常是undefined
* ES6+, 你可以在參數列中為參數定義預設值

$其餘參數和長度不定引數列
* 引數 > 參數, 啥都不會發生, 但可利用其餘參數(rest parameters)來做處理
* 其餘參數(...)可將傳入參數的引數儲存進一陣列中, 陣列可能是空的, 但永遠不會是undefined
~ function max (first = Infinity, ...rest) {
~   let maxValue = first;
~   for(let n of rest){
~     if(n > maxValue) maxValue = n;
~   } return maxValue;
~ }

$Arguments物件
* ES6版本之前, varargs函式是使用Arguments物件撰寫的
* 函式主體中, 可使用識別字arguments來參考該次調用的Arguments物件
* Arguments物件是一個類陣列物件, 可將傳入的引數藉由數字取用
~ function max(x) {
~   let maxValue = -Infinity;
~   for (let i = 0; i < arguments.length; i++) {
~       console.log(arguments);
~       if(arguments[i] > maxValue) maxValue = arguments[i];
~   } return maxValue;
~ }
* 太多歷史包袱, 沒效率並難最佳化, 應使用其餘參數取代

$函式呼叫的分散運算子
* 函式調用也可使用分散運算子, 用於拆一個陣列(或其他可迭代物件)
~ //此函式接受一個函式, 並回傳包裹起來的版本
~ function timed(f) {
~   return function (...args) {
~       console.log(`Entering function ${f.name}`);
~       let startTime = Date.now();
~       try {
~           return f(...args);
~       } finally {
~           console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`)
~        }
~   }
~ }

$解構函式引數為參數
* 以引數值調用函式, 最終會被指定給函式定義中的參數, 此階段類似變數指定:
*   因此可將解構指定技巧用於函式
* 可用於陣列解構, 或物件解構(須注意左邊永遠善特性名稱, 右邊是變數或參數名稱)
* 解構函式可用於模擬引數對值的方便作法
~ function arraycopy({from, to=from, n=from.length, fromIndex=0, toIndex=0}){
~   let valuesToCopy = from.slice(fromIndex, fromIndex + n);
~   to.splice(toIndex, 0, ...valuesToCopy); return to;
~ }
~ let a = [4,5], b = [9,8,7,6,5];
~ console.lo1,2,3,g(arraycopy({from: a, to: b, n: 3, toIndex: 4}));

$引數型別
* JS參數沒有宣告型別, 你傳入函式的值也不會進行型別檢查
* 你可以額外添加型別檢查

?[函式作為值]
* JS中函式不僅是語法, 也是值 - 能指定給變數, 儲存在物件特性, 陣列元素, 作為引數等
~ const operators = {
~   add(x , y) {return x + y},
~   subtract(x, y) {return x - y},
~   multiply(x, y) {return x * y},
~   devide(x, y) {return x / y},
~   pow(x, y) {return Math.pow(x, y)},
~ }

~ function operate(operation, operand1, operand2) {
~   if(typeof operators[operation] === "function"){
~       return operators[operation](operand1, operand2);    
~   } else throw new Errow("unknown operator");
~ }
$定義自己的函式特性
* 當函式需要其值會"跨調用"保存的一個靜態變數
~ function factorial(n){
~   factorial[0] = 1;
~   if(Number.isInteger(n) && n >= 0) {
~       if(!(n in factorial)){
~           factorial[n] =  n * factorial(n - 1)
~       } return factorial[n]
~   } else return NaN;
~ }  
~ console.log(factorial(5));

$函式作為命名空間
* 函式內宣告的變數在函式外是看不到的
* 你可以在函式內定義變數, 而不會弄亂全域命名空間

$Closures
* JS使用語彙範疇(lexical scoping): 函式使用"定義時"的變數範疇, 而非呼叫時的變數範疇
* 實作語彙範疇 - 函式物件須有"參考"指向該函式定義的範疇 - 閉包
~ let scope = "global scope";
~ function checkscope () {
~   let scope = "local scope";
~   function f(){ return scope }
~   return f
~ }
~ console.log(checkscope()()) //函式呼叫使用定義處範疇, 而非調用時範疇
* 兩個方法共享對私有變數n的存取權
* 每次調用counter()建立新的範疇和物件
~ const counter = (function () {
~  let n = 0;
~   return {
~       count() {return n++},
~       reset() { n = 0 }, 
~   };
~ })
~ let o1 = counter();
~ let o2 = counter();

$函式特性, 方法, 建構器
* length特性: 參數數目(不包括其餘參數)
* name特性: 函式名稱
* prototype特性: 特性指向原型物件
* ------------
* call()方法: 間接調用
* apply()方法: 間接調用
~ let cracker = {
~   summer(n) {
~       let sum = 0;
~       for(let i = 0; i < n; i++){
~           sum += 1;
~       } return sum;
~   },
~   multiplier(n) {
~       let result = 0;
~       for(let i = 0; i < n; i++){
~           result *= 1;
~       } return result;
~   }
~ };

~ function trace(object, method){
~   let original = object[method];
~   object[method] = function(...args){
~       console.log(new Date(), "Entering", method);
~      let result = original.apply(this, args);
~       console.log(new Date(), "Exiting", method);
~       return result;
~   }
~ } 
~ trace(cracker, "summer")
~ console.log(cracker.summer(1000000000));

* bind()方法: 將函式繫結到一個物件
* toString()方法

$Function()建構器
* 函式是物件, 可使用Function()建構器來創建新的函式
~ const f = new Function("x", "y", "return x + y");
* Function()建構器會建立匿名函式
* Function()建構器允許函式執行時期動態的建立並編譯
* Function()建構器, 使用起來沒效率
* 他所創建的函式不使用語彙範籌, 而且永遠被當作最頂層函式

?[函式型程式設計]

$高階函式
* 以函式最為引數, 並回傳一個函式

$部分應用
* 將函式引數拆開

$記憶
* 快取結果


*/

