//!                Javascript 陣列
//!#################################################
/*
?[陣列]
* 陣列是值的一個有序群集(ordered collection), 每個值都稱最為元素(element)
* 每個元素在陣列中都有個數值位置, 稱作索引(index)
* JS陣列是不具型(untyped)的, 一個陣列元素可以是任何型別, 並且同一個陣列不同元素可視不同型別
* 陣列是從零起算(zero-based), 並使用32位元的索引 (0 ~ 2**32 -2)
* JS陣列是動態的, 可視需要增長或縮減, 宣告時不必固定大小, 改變不必重新配置
* JS陣列可以是稀疏(sparse)的, 元素不需有連續的索引, 可有空缺存在
* 陣列是原始物件的一種特化型式, 並從Array.prototype繼承特性(又從Object.prototype繼承特性)

?[創建物件]

$陣列字面值
* 使用方括號, 並以逗號隔開的一串陣列元素
~ [2, 5, 3, "a", true]

$分散運算式
* 可使用...在一個陣列字面值中引入某個陣列(或其他可迭代物件)

$Array()建構器
~ new Array() //建立一個空陣列
~ new Array(n) // 建立一個長度為n(若n為數字)的陣列(預配置)
~ new Array(a, b, c, d) //建立元素為a, b, c, d的陣列

$Array.of()方法
* Array.of()解決了Array()建構器無法創建具有單一數值元素的陣列
~ Array.of(n) //建立單一元素為n的陣列

$Array.from()方法
* Array.from()預期一個可迭代物件或類陣列作為第一引數, 並回傳含有該物件的元素的一個新陣列(運作起來就像分散運算子, 同為陣列拷貝的種簡單方式)
* Array.from()接受一個為函式的第二引數, 新陣列建構的過程, 來源物件的每個元素都會被傳入給你指定的函式, 而該回傳值會被儲存在該陣列中

?[讀取和寫入陣列元素]
* 使用[]運算子來存取陣列的一個元素
* 當你使用小於2**32 - 1的非負整數作為特性名稱, 陣列會自動為你維護length特性之值
* 陣列是種特化的物件, 用來存取陣列元素的方括號運作起來跟物件特性的方括號一樣(將傳入方括號值轉為字串)
* 你可以在陣列上建立任何名稱的特性: 當特性名稱為整數且位於0 ~ 2**32 -2之間, 為陣列的索引(會影響length特性等)

?[稀疏陣列]
* 稀疏的陣列並沒有連續索引

?[陣列長度]
* 每個陣列都有一個length特性, 而正是這個特性讓陣列不同於一般JS物件
* 密集陣列: legnth特性指出陣列的元素數目, 並且值為最高索引加一
* 稀疏陣列: length特性會比元素數目要大, 並且比任何索引都要大

?[新增或刪除陣列]
* 使用push()方法新增
* 使用unshift()方法在開頭新增
* 使用pop()方法刪除
* 使用shift()方法在開頭刪除
* 使用delete刪除(會造成稀疏陣列)

?[迭代陣列]
* 使用for/of迴圈迭代每個元素
* 使用for/of搭配陣列方法entires()配合解構指定可迭代索引+元素
* forEach()提供陣列迭代的函式型做法
* 使用最原始for迴圈進行迭代
* 

?[多維陣列]
* 使用陣列組成的陣列

?[陣列方法]
* 迭代器方法(interator methods)
* 堆疊與佇列方法(stack and quene methods)
* 子陣列方法(subarray methods)
* 搜尋與排序方法(searching and sorting methods)

$迭代器方法
* 一般化描述: 
*   接受一個函式作為引數, 並為陣列的每個元素調用一次那個函式
*   所傳入的函式, 不會為不存在的元素(稀疏陣列)所調用
*   你所提供的函式, 會以三個引數調用: 陣列元素的值, 陣列元素索引, 以及該陣列本身

! forEach(): 迭代陣列, 為每個元素調用你所指定的函式
~ let data = [1, 2, 3, 4, 5];
~ sum = 0;
~ data.forEach(value => { sum += value });
~ console.log(sum);
~ data.forEach(function(value, index, array){
~    array[index] = value + 1;
~ });
~ console.log(data);

! map(): 迭代陣列, 為每個元素調用你所指定的函式, 並回傳一個新陣列, 其中包含你函式索回傳的些值
~ let array = [1, 2, 3, 4, 5];
~ console.log(
~   array.map(function(value){
~       return value * 3;
~    }), 
~    );

! fliter(): 回傳陣列, 其中含有在其上被調用的那個陣列元素經由判定式回傳值(trueOrFalse)判斷的子集
~ let data = new Array();
~ for(let i = 1; i <= 10000; i++){
~ data[i - 1] = i;
~ };
~ console.log(data);
~ data = data.filter((v) => {
~   let v_i;
~   if (v === 1) return false;
~   for(let i = 2; i < v; i++){
~       // v_i在無法整除回傳true
~       v_i = !(v % i === 0);
~       if(v_i) continue;
~       else return false;
~   }
~   return true;
~ });
~ console.log(data);

! find()&findIndex()
* 迭代陣列, 尋找元素並回傳

!every()&some()
* every(): 所有都為true回傳true, 否則false
* some(): 至少一個true回傳true, 所有false回傳false

!reduce()和reduceRight()
* 使用你指定的函式結合成單一值
~ reduce(function(累積結果, v, i, a){}, 初始值)
~ reduceRight(function(累積結果, v, i, a){}, 初始值) // 右到左

$攤平陣列
* 使用flat()方法來攤平陣列
* 使用flatMap()方法來同時進行flat()和map()

$相加陣列
* concat()方法會回傳一個新陣列(原陣列不會更改), 串接原陣列每個元素及引數

$堆疊與佇列
* push(), pop()
* unshift(), shift()

$操作子陣列
* slice(): 回傳切片 
* splice(): 就地修改陣列, 進行刪除或插入元素(通用方法)
* fill(): 填滿, 會修改到原陣列
* copyWithin(): 就地進行切片拷貝: 高效能

$搜尋和排序
* indexOf() & lastIndexOf(): 找到指定位置開始查找元素的索引值
~ function findAll(array, element) {
~   let results = [], 
~       len = array.length,
~       pos = 0;
~       while(pos < len){
~           pos = array.indexOf(element, pos);
~           if(pos === -1) break;
~           results.push(pos);
~           pos = pos + 1;
~       }
~       return results;
~ } //找到所有該元素之索引值
* includes(): 找是否有該值, 回傳true/false, NaN可被查找
* sort(): 就地排序, 並可傳入比較函式作為引數
* reverse(): 就地反轉

$陣列對字串的轉換
* join()方法可將元素轉為字串並串接他們
* toString() & toLocaleString()

$靜態陣列函式
* Array.of()
* Array.from()
* Array.isArray()

$類陣列物件
* 將具有數值length特性和對應的非負整數特性的任何物件視為某種物件, 經常是完全合理得事情
* 可使用function call 方法間接調用陣列方法到類陣列物件
*/ 






