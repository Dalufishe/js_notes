//!                Javascript 物件
//!#################################################
/*
?[物件簡介]
* 物件是種合成值(composite value), 他聚合(aggregates)了多個值並允許你以名稱來儲存和取回那些值
* 一個物件是特性(properties)所組成的一種無序群集(unordered collection), 每個特性都有一個名稱和一個值
* 特性名稱(property names)通常是字串(但也可以使用Symbol), 因此我們可以說物件將字串(或符號)映射至值
* JS物件能夠繼承另一個物件的特性, 該物件稱作他的原型(prtotype), 這種原型式繼承(prototypal inheritance)是JS的一種關鍵特色
* JS物件是動態的, 特性通常都可以被新增或刪除(可變的), 但它們也能被用來模擬靜態物件或靜態定型語言的結構, 也能被用來表示集合
* 除了原始值的值, 都是物件(字串, 數字, boolean不是物件, 但可以表現像不可變物件)
* 物件是藉由參考(by reference)來操作, 不同變數都會參考至同一個物件, 而非該物件的拷貝
* 物件 - 最常做的事: 創建(create)他們, 設定(set), 查詢(query), 刪除(delete), 測試(test), 列舉(enumerate)他們的特性
* 為了區分繼承特性和非繼承特性, JS使用自有特性(own property)來指涉非繼承特性.
* 除了名稱和值, 每個特性還有三個特性屬性(property attributes)
*   可寫入(writable): 該特性的值是否可設定
*   可列舉(enumerable): 該特性名稱是否會被for/in迴圈回傳
*   可配置(configurable): 該特性是否能被刪除, 屬性是否能修改

?[建立物件]
* 物件能透過物件字面值, new關鍵字, Object.create()函式來創建

$物件字面值
~ let object = {
~   apple = 3, // 識別字可作為特性名稱
~   "banana" = 4 // 字串字面值(允許空字串)也可做為特性名稱
~   // 特性值是任何JS運算式, 運算式的值即為該特性的值 
~ }

$以new建立物件
~ let object = new Object(); // new關鍵字 + 函式調用(建構器, 用於初始化新建立的物件)
~ let array = new Array(); //建立其他的物件型別

$原型
* 一個物件若從第二個物件繼承特性, 第二個物件被稱作原型(prototype)
* 物件字面值創建的物件的原型 -> Object.prototype
* 使用new建立物件, 物件會使用該建構器函式的prototype特性值(物件)作為他們的原型(如new Object() -> Object.prototype, new Array() -> Array.prototype)
* 幾乎所有物件都有一個原型, 但只有相對少數的物件具備prototype特性. 這些具有prototype特性的物件為其他物件定義了原型.
* Object.prototype是極少數沒有原型的物件, 他沒有繼承任何特性. 其他的原型物件則是確實具有一個原型的正常物件.
* new Date()所建立的物件 ->原型: Date.prototype ->原型: Object.prototype (原型鍊(prototype chain))

$Object.create()
* Object.create()會創建一個新物件, 並使用他的第一個引數最為該物件的原型(第二個引數為新物件的特性)
~ let o = Object.create({a:1, b:2}) // o繼承了物件{a:1, b:2}
~ let o = Object.create(null) // o沒有繼承任何東西(基本方法都沒有)
* 使用時機為設下防護不讓你無法控制某哦程式庫函式不經意修改到一個物件

?[查詢和設定特性]
* 使用點號或芳括號獲得特性的值
~ expression. identifier
~ expesstion [expression]
* 透過對特性存取運算式賦值以創建或更改一個物件特性
~ expression. identifier = expression
~ exoression [expression] = expression

$作為關聯式陣列的物件
~ object. property // 使用點號+識別字屬於靜態欄位語法(類似C或Java)
~ object["property"] // 使用方括號及字串, 以字串索引作為陣列存取, 稱作關聯式陣列(associative array)
~ 使用點(.)運算子來存取物件特性, 該特性名稱為識別字(並非資料型別, 需逐字打入JS程式, 無法被程式操作)
~ 使用方括號([])來存取物件特性, 該特性名稱是表達為一個字串(為資料型別, 可被程式操作)

$繼承
* 查詢一物件特性, 若該自有特性沒有該名稱特性, 則會往原型物件去查找(串鏈)
* 設定一物件特性, 若該自有特性已有一同名之特性, 則更改既存特性之值, 否則建立一個新特性. 若物件之前有繼承該同名特性, 則繼承特性會被新建立之同名自有特性所隱藏(覆寫)

$特性存取錯誤
* 查詢一個不存在的特性並非錯誤, 而是回傳undefined
* 查詢一個不存在的物件之特性, 則是錯誤
* 在undefined或null存取特性會造成錯誤, 特性是唯讀的(自有特性唯讀無法改, 繼承特性唯讀無法覆寫), 物件不允許新增特性時造成設定特性嘗試失敗時, 並不會造成錯誤(程式靜默無聲)

?[刪除特性]
* delete運算子會從物件移除一特性本身
* delete運算子只會刪除自有特性, 繼承特性須到原型物件刪除他
* delete刪除成功, 刪除沒有效果(刪除不存在特性), 與不是特性存取運算式並用時, 估算為true. delete不可刪除不可配置特性, 估算為false 
* 變數宣告(var)和函式宣告所創建的全域物件特性式不可配置的

?[測試特性]
* 檢查一個物件是否擁有給定名稱的一個特性, 可使用in運算子, hasOwnProperty()方法或propertyIsEnumerable()方法, 或單純去查該該物件
$in 檢查是否為特性
~ let o = { a: 1 };
~ "a" in o // 檢查是否擁有特性"a" => true
~ "toString" in o // 適用於繼承特性

$hasOwnProperty() 檢查是否為自有特性
~ let o = { a: 1 };
~ o.hasOwnProperty("a") // => true
~ o.hasOwnProperty("toString") // 不適用於繼承特性

$propertyIsEnumerable() 檢查是否為自有特性 + 可列舉的
~ let o = { a: 1 };
~ o.propertyIsEnumerable("a") // => true
~ Object.prototype.propertyIsEnumerable("toString") //為自有特性但不可列舉 => false

$使用!==undefined 檢查是否為特性 (等同in運算子, 但不能測出被特性存在但被設為undefined的特性)
~ let o = { a : 1 };
~ o.a !== undefined // => true: o有特性a
~ o.b !== undefined // => false: o沒有特性b
~ o.ToString !== undefined // => true: o繼承了一個toString特性

?[列舉特性]
* for/in迴圈會為所指物件的每個可列舉特性(包括繼承的可列舉特性)執行一次迴圈主體, 指定特性的名稱給迴圈變數
* for/of搭配
*   Object.keys() - 回傳一個物件的可列舉自有特性 
*   Object.getOwnPropertyNames() - 回傳一個物件的自有特性, 不管是否可列舉
*   Object.getOwnPropertySymbols() - 回傳名稱為符號的自有特性, 不管是否可列舉
*   Reflect.ownKeys() - 回傳自有特性的名稱, 不管是否可列舉, 不管事字串還是符號

?[擴充物件]
* 最原始的作業方法: 
~ //將y拷貝進x
~ let x = {a:1, b:2};
~ let y = {c:3, d:4, e:5};
~ for(let key of Object.keys(y)){
~    x[key] = y[key];
~ }
* ES6中以Object.assign()被納入核心JS中
~ Object.assign(target object, source object1, source object2...)
~ //對於每個source object可列舉自有特性拷貝(覆寫)到target object, 順序為so1 -> to, so2 -> to
~ a = Object.assign({}, b, a)
~ Object.assign(a, b)為將b覆寫到a中, 若要將b設為預設值(若和a同名則a優先): 

?[序列化物件]
* 物件的序列化(serialization), 會把一個物件的狀態, 轉換成之後可以從之復原的一個字串
* JSON.stringify(): 序列化
* JSON.parse(): 回復
* 這些函式使用JSON(Javascript物件記號法, 語法類似物件與陣列的字面值)資料互換格式
* JSON無法表達所有JS值, NaN, +-Infinity 會被序列化為null(回復null), Date物件會被序列化為ISO格式的日期字串(並回復ISO日期字串), Function, RegExp, Error物件以及undefined值無法被序列化或回復 
* JSON.stringify()只會序列化一個物件的可列舉自有特性(無法序列化的會被省略)

?[物件方法]
* 所有JS物件都會從Object.prototype繼承特性(除了明確不以原型創建的物件)
* 從Object.prototype繼承的特性大多是方法, 因們為他大多是通用的

$toString()方法
* 預設的toString()(Object.prototype)方法所提供的資訊並不多: 
~   {x: 1, y: 2}.toString(); // => "[object Object]"
* 許多類別會定義他們自己版本的toString()(如Array.prototype, 覆寫掉Object.prototype)

$toLocaleString()方法
* 用於回傳本地化的字串表示值. 預設的toLocaleString()(Object.prototype)並不會做任何本地化動作, 而是單純呼叫toString()並回傳該值

$valueOf()方法
* 預設的valueOf()方法並不會做甚麼, 但許多內建的類別有定義自己的方法

$toJSON()方法
* Object.prototype並沒有定義toJSON方法(), 但JSON.stringify()方法被要求序列化任何物件時, 會尋找toJSON()方法, 若被序列化物件存在這種方法, 他就會被調用, 序列化就是他的回傳值, 而非原本的物件.

?[新增的物件字面值語法]
* 最近版本JS推出數種實用方式擴充了物件字面值語法

$簡寫特性
* 若特性與變數剛好同名稱, 可省略冒號及重複的識別字

$計算出來的特性名稱
* 可使用方括號(內含計算式)作為物件字面值中的特性名稱

$符號作為特性名稱
* Symbol可做為唯一的特性名稱(每個Symbol()建立出來的符號都不同)
* Symbol可做為安全的物件擴充機制(不會覆寫到原本的特性), 並非安全性機制(還是可刪除)

$分散運算子
* 可使用分散運算子來將現有物件拷貝到一個新的物件中
~ let x = {c:1, d:2};
~ let y = {a:3, y:4};
~ let z = {...x, ...y}; // z => {c:1, d:2, a:3, y:4};

$簡寫語法
* 撰寫方法可省綠function關鍵字和冒號, 並將瓜號加到特性名稱後
~ let o = {
~   test() {return "hi"},
~ }

$特性取值器和設值器
* 程式查詢存取器特性的值, 會調用取值器方法, 該方法回傳值極為該特性存取運算式之值  
* 程式設定存取器特性的值, 會調用設值器方法, 傳入該指定右邊的值, 進行方法操作
*/



