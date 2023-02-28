//!             Javascript 標準程式庫
//!#################################################
/*
?[集合與映射]
* 原始物件可用來表示集合和映射, 但總不是那麼的好
* ES6引進了Set和Map類別, 更簡單處理集合和映射 

$Set
* Set集合為值的群集, 然而沒有索引, 不允許重複
~ let s = new Set(可迭代物件)
~ s.size // => 集合含有多少值
~ s.add() // => 新增成員, 回傳改變過的集合
~ s.delete() // => 刪除成員, 回傳成功與否
~ s.clear() // => 清空集合, 回傳undefined
~ s.has() // => 檢查是否有該成員(相較於速度正比陣列大小的includes快速許多)
* Set物件是可迭代的, 並且會記得插入和刪除順序
~ s.forEach()

$Map
* Map映射代表一組稱為鍵值的值, 並有一個映射至的值(鍵值為集合)
* 映射就像是個陣列, 但可用任意的值作為索引, 並且速度和陣列差不多快
~ let m - new Map(可迭代物件並會產出兩個元素的陣列(一般會用陣列中的陣列(key, value)));
~ m.size
~ m.set()
~ m.get()
~ m.has()
~ m.clear()
~ m.forEach()

$WeakMap & WeakSet
* WeakMap不會防止其鍵值被垃圾回收
*   Map對其鍵值為強參考(其他指向該鍵值的參考都消失, 仍可透過Map觸及他們)
*   WeakMap對其鍵值為弱參考(其他指向該鍵值的參考消失, 就無法透過WeakMap觸及(被垃圾回收))

?[具型陣列]
* 具型陣列嚴格上並非陣列(Array.isArray() => false)
* 具型陣列元素全是數字, 並需要指定型別
* 創建具型陣列必須指定長度, 而且永遠不能改變
* 具型陣列元素會在該創建時被初始化為0
* new Int8Array() / IntClampedArray.of() / Uint16Array.from()
* new ArrayBuffer() // => 建立緩衝區
~ const sieve = (function () {
~   function details(n) {
~       let a = new Uint8Array(n + 1);
~       let max = Math.floor(Math.sqrt(n));
~       let p = 2;
~       while (p <= max) {
~           for (let i = 2 * p; i <= n; i += p) {
~               a[i] = 1;
~           } while (a[++p]) { };
~       }
~       while (a[n]) n--;
~       return n;
~   }
~   return function (n) {
~       return details(n);
~   }
~ }())
* set()設置具型陣列元素
* slice() -> 回傳新的, 獨立的具型陣列
* subarray() => 回傳新的觀點(共用記憶體)
* Dateview物件可用於讀寫ArrayBuffer

?[正規表達式]
* JS中, 正規表達式是描述某種文字模式的一個物件
* RegExp類別代筆正規表達式, String跟RegExp都定義了會使用正規表達式的方法
* 字元表達自身, 詮釋字元表達特殊意義, 旗標字元影響運作方式

$文法
* https://regexr.com/

$使用RegExp物件API

!用於模式比對的字串方法:
* search(): 接受正規表達式當引數, 若非正規表達式, 則自動轉換成正規表達式: 回傳第一個匹配的子字串的起始字元位置, 忽略全域搜尋(g旗標)
* replace(): 第一引數接受正規表達式當引數, 若使用字串而非正規表達式, 則使用字串作為引數(不會自動轉換): 進行搜尋與取代的運算
* replace(string, string);
* replace(RegExp, string(普通字串或括號記億($)));
* replace(string/RegExp, function)
~ let quote = /(?<quote>["'])(?<text>[^"']*)\k<quote>/;
~ let data = "'Javascript' is a powerful programming language";
~ console.log(data.replace(quote, "<<$<text>>>")); //使用括號記憶替代功能
* match(): 接受正規表達式當引數, 若非正規表達式, 則自動轉換成正規表達式: 回傳陣列, 其中含有匹配的結果.
* match(RegExp(g旗標)): 回傳陣列包含所有結果
* match(RegExp(沒有g旗標): 回傳陣列包含第一個結果, 匹配該結果之括號捕捉群組之子字串, 等等資訊
* match(RegExp(沒有g旗標, 但有y旗標)): 可透過RegExp物件的lastIndex特性設為想要開始的索引
* matchAll(): 預期設有g旗標的RegExp物件, 回傳迭代器(match()方法非全域物件)
* split(): 拆分

!RegExp類別
* new RegExp(string(正規表達式主體(反斜線需雙倍))/正規表達式, string(旗標)): 適合用於動態建構及拷貝正規表達式(可更改旗標)
* sourse特性, flags特性, global ~  sticky特性
* lastIndex特性可指出要開始尋找的字元位置(match字串方法(y), matchAll字串方法(g,y不會自動新稱, 歸零), exec物件方法(g,y), test物件方法(g,y))
~ let text = "Java or Javascript";
~ let r = /[Jj]ava([Ss]cript)*\/g;

~ let match;
~ while ((match = r.exec(text)) !== null) {
~   console.log(match[0]);
~   console.log(r.lastIndex);
~　}

~ console.log("---------");

~ for (let word of text.matchAll(r)) {
~   console.log(word[0]);
~   console.log(r.lastIndex);
~ }

?[日期和時間]
$日期與時間
* new Date(): 表示目前日期與時間
* new Date(n): 將n解讀為1970紀元開始算起的毫秒數, 回傳日期與時間
* new Date(a, b, c...): 解讀年, 月, 日..., 回傳日期與時間 (一年的第一個月是0)
* Date.UTC(a, b, c...): 回傳以UTC解讀的毫秒時戳, 能傳入Date()建構器
* toString()會預設以當地時區印出, toUTCString()和toISOString()能以標準時間印出
* new Date(string): 能剖析toString(), toUTCString(), toISOString()方法的日期格式
* 各種 set和 get方法能查詢或修改該Date的年月日小時分鐘秒毫秒欄位

$時戳(Timestamps)
* JS內部將日期表示為整數, 指出從UTC時間1970年1月1日算起的毫秒數
* getTime()回傳時戳, setTime()設置時戳
* Performance API(非EC標準)能測得更高精準度的計時

$時間算數
* 可使用 <, <=, >, >= 來比較時間, 也可以相減Date物件
* set搭配get使用也可進行算數

$格式化Date物件
* toString(): 當地時區, 沒有當地格式
* toLocaleString(): 當地時區, 當地格式
* toUTCString(): UTC時區
* toISOString(): ISO標準
* toDateString(): 當地時區日期部分, 沒當地格式
* toLocaleDateString(): 當地時區日期部分, 沒當地格式
* toTimeString(): 當地時區日期部分, 沒當地格式
* toLocaleTimeString(): 當地時區時間部分, 沒當地格式

?[錯誤類別]
* thorw和catch可擲出和捕捉任意JS的值, 但傳統上使用Error物件
* name特性, message特性, stack特性, toString()方法

?[JSON的序列化和剖析]
* 將記憶體中的資料結構轉換為由位元組或字元所構成的一個字串, 以做儲存或傳輸之用, 並且之後可被剖析以還原原本在記憶體中的資料結構, 轉換的過程稱為序列化
* JSON序列化格式 - 支援物件陣列, 數字,字串,true,false,null這些值
* JSON.stringify()負責序列化格式, JSON.parse()負責剖析
~ JSON.stringify(object/array, replacer(更換器), 縮排)
~ JSON.parse(string, reviver(復甦器))

$JSON客製化
* 各式物件的toJSON()方法和JSON.stringify()的replacer允許客製化序列化
~ JSON.stringify(object, array/replacer(更換器))
* JSON.parse()的reviver允許客製化剖析
~ JSON.parse(string, reviver(復甦器))

?[國際化API]
* 由3個類別組成: Intl.NumberFormat, Intl.DateTimeFormat, IntlCollator
* 他們能讓我們以適合當地的方式格式化數字, 日期和時間, 以及適合所在地區的方式比較字串

$格式化數字
~ Intl.NumberFormat(地區, 物件(細節)); 並使用format()方法格式化你要的數字(繫結到物件)
~ 地區: undefined - 系統地區設定. 字串 - 所要的地區, 如"en-US". 也可以是字串所構成的陣列
~ 物件: style特性("decimal", "percent", "currency"), currency特性("USD", "GBP"等ISO貨幣碼), currencyDisplay特性("symbol", "code", "name"), useGrouping特性(true, false), minimumIntegerDigits特性(正數部分最少位數), minimumFractionDigits, maimumFractionDigits特性(小數部分格式化), minimumSignificantDigits, maximumSignificantDigits特性(有效數字位數)

$格式化日期和時間
~ Intl.DateTimeFormat(地區, 物件); 並使用format()方法格式化你要的Date物件(繫結到物件)
~ 地區: undefined - 系統地區設定. 字串 - 所要的地區, 如"en-US". 也可以是字串所構成的陣列
~ 物件: 請參考書籍

$比較字串
~ Intl.Collator(地區, 物件); 並使用compare()方法傳入sort()方法進行適合當地的字串排序

?[Console API]
* Console(控制台)
~ console.log(...args): 引數轉為字串, 引數之間包括空格, 輸出完後開新一行
~ console.debug(...args): 和console.log幾乎一樣, 用於區分等級或嚴重性
~ console.info(...args): 和console.log幾乎一樣, 用於區分等級或嚴重性
~ console.warn(...args): 和console.log幾乎一樣, 用於區分等級或嚴重性
~ console.error(...args): 和console.log幾乎一樣, 用於區分等級或嚴重性(node將輸出送到stderr資料流)
~ console.trace(): 除了印出還加上堆疊軌跡(Node將其輸出至stderr)

~ console.assert(boolean, ...args): 第一個引數是falsy值, 引出的值就如傳入console.error()但帶有Assertion failed 前綴
~ console.clear(): 在可行的前提下清空主控台
~ console.table(table, choosed): 嘗試以表格形式呈現他的引數(若無法則用log格式顯示)
~ console.count(strnig): 紀錄該字串被呼叫的次數
~ console.countReset(string): 重製該字串的計數器
~ cnonsole.group(): 印出引數到主控台, 然後設定後續所有主控台訊息都會被縮排
~ console.groupCollapsed(): 印出引數到主控台, 然後設定後續所有主控台訊息都會被隱藏(僅限瀏覽器)
~ console.groupEnd(): 結束group()或groupCollapsed()分組
~ console.time(): 紀錄時間
~ console.timeLog(): 紀錄時間
~ console.timeEnd(): 紀錄時間

?[URL API]
* 處理url各個組成部分, 剖析修改, 轉義, 反轉義等等
~ let url = new URL(string)

?[計時器]
* setTimeOut()和setInterval()
~ setTimeout(func, number); // 指出多少毫秒才調用該函式
~ setInterval(func, number); // 指出多少毫秒重複調用該函式
~ clearTimeout()和clearInterval() // 用於取消函式執行
*/







