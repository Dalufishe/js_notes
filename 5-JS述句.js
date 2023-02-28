//!                Javascript 述句
//!#################################################
/*
?[述句]
* 述句就是JS的句子或命令, 以分號做結
* 運算式會被估算(evaluated)以產生一個值, 述句則是被執行(executed)使某些事發生
* 具有副作用的運算式(可單獨使用)被稱為運算式述句(expresstion statements)
* 宣告述句(declaration statements)會宣告新的變數和定義新的函式
* JS程序就是要執行一系列述句. 預設情況直譯器會以它們被寫出的順序執行述句. JS有幾個述句或控制結構可更動這種預設的執行順序(如if述句, while述句)

?[運算式述句]
* 具有副作用的運算式(如指定運算子, 遞增遞減運算子, delete運算子, 函式呼叫運算式) 
* 沒有副作用的運算式若被當作一個述句做使用, 則沒有任何意義

?[複合述句與空述句]
* 一個述句區塊(statement block, 包在大括號內)會把多個述句結合成單一個複合述句(compound statement)
* 複合述句被當作單一個述句, 因此可在JS預期單一述句的任何地方作使用
* 空述句(empty statement, ;)允許你在預期一個述句的地方不放任何述句

?[條件式]
* 條件式述句(conditional statements)會依據指定的運算式的值來執行或跳過其他的述句(分支(branches))

$if
* if述句能讓JS條件式地執行述句
~ if (expresstion) statement(子述句) (if~statement, if述句)
* 如果expresstion值是truthy的 -> statement會被執行
* 如果expresstion值是falsy的 -> statement不會被執行
* 你可以引入else述句, 他會在expresstion是falsy時執行
~ if(expresstion) statement1
~ else statement2
* 重複運用if/else述句時產生的else if慣用語, 用於判斷執行多段述句中的一段

$switch
* switch述句用於判斷相同運算式的分支(取代else if, 費時費力)
~ switch(expresstion){
~ case expresstion1: 
~   //執行程式碼區塊
~   break;
~ case expresstion2:
~   //執行程式碼區塊
~   break;
~ default:
~   //執行程式碼區塊
~   break;
~}
* switch述句會估算switch關鍵字後的運算式, 並估算case標籤後那些運算式, 直到找到相符(使用嚴格相等運算式, ===)的值並執行程式碼
* case標籤僅為想要執行程式碼之起始點, 你需使用break(或return, 函式中)終結switch子句, 否則程式會掉落通過(fall through)剩餘的case標籤

?[迴圈]
* 迴圈述句(looping statements)會重複你的程式碼的某個部分

$while
~ while(expresstion) statement
* 當while述句的expresstion是truthy的, 直譯器會重複執行statement
* 幾乎每個迴圈, 迴圈的迭代(iteration)都會有一個或多個變數發生改變, 因此每此執行statement的動作可能都有所不同, expresstion中若涉及了有改變的變數, 那麼運算式的值每次通過迴圈也可能不同.

$do/while
~ do statement
~ while(expresstion);
* 迴圈運算式是在最底部測試, 因此迴圈主體一定至少會執行一次

$for
~ for(initialize; test; increment)
~   statement
* for述句簡化了依循計計數器模式的迴圈, 計數器變數會在迴圈啟動前被初始化, 並在每次迭代前被測試, 最後在迴圈主體的結尾被更新(遞增或遞減等方式)

$for/of
~ for(let element of data) statement
* for/of可用於迭代(陣列, 字串, 集合, 映射都是可迭代的)
* 原始物件預設是不可迭代的, 使用for/of會值出一個錯誤TypeError, 需用特殊方法迭代

!for/of與物件
* 若想要迭代一個物件的特性, 可以使用for/in迴圈(下篇提到), 或將Object.keys()方法(取得鍵值), Object.values()方法(取得值), Object,entries()方法(搭配解構指定取得鍵值和值)與for/of並用
~ let o = {apple:100, banana:150, pear:200}
~ // Object.keys會回傳以物件特性名稱所構成的陣列
~ for(let k of Object.keys(o)){
~    console.log(k)
~ }
~ // Object.values會回傳以物件特性值所構成的陣列
~ for(let v of Object.values(o)){
~    console.log(v);    
~ }
~ // Object.entries會回傳以物件特性名稱和值所構成的陣列的陣列(array of arrays)
~ for(let [k, y] of Object.entries(o)){
    ~    console.log(k, y);
~}

!for/of與字串
* 字串是可逐字元迭代的
* 字元是以Unicode編碼位置來迭代的, 並不是採用16位元個數(和length不同)
~ // 將字串迭代並將字母與出現次數存入物件中
~ let object = {};
~ for(let letter of "typeSomethingHere"){
~    if(object[letter]){
~        object[letter]++;
~    }
~    else{
~        object[letter] = 1;
~    }
~ } console.log(object);

!for/of與集合及映射
* 集合和映射是可迭代的
* Map物件的迭代器不會迭代出Map的鍵值或者是值, 而是其鍵值與值得對組(以陣列表示)

!for/await非同步迭代
* 非同步迭代(asynchronous iterator)

$for/in
~ for(variale in object) statement
* for/of迴圈只能用於可迭代資料型別, for/in卻可用於任何物資料型別(包括原始物件)
* for/of用於迭代可迭帶的物件(和字串)的值, for/in用於迭代所有物件(和字串)的特性名稱
* for/in迴圈實際上不會列舉一個物件的所有特性(如symbols, 不可列舉之特性)

?[跳躍]
* 跳躍述句(jump statements)會使JS直譯器跳躍到原始碼的一個新位置去

$帶有標籤的述句
~ indentifier: statement
* 為一個述句加上標籤, 你就賦予了它可在程式其他地方用來參考至他的一個名稱
* 你可使用break或continue來退出或重新開始一個被賦予標籤的述句

$break
* 單獨使用時, 用於跳出最內層迴圈或switch述句
* 與標籤並用時, 他會跳到具有指定標籤的那個外圍述句的結尾
* break述句無法跨越函式邊界轉移控制權

$continue
* continue述句會重啟一個迴圈進行下次迭代
* continue不管是否帶有標籤, 都只能用於一個迴圈的主體中

$return
* 一個函式內的return述句指出該函式的調用值
* 一個函式會在一個return述句被執行時回到他的呼叫者, 即使函式主體仍有剩餘的述句

$yield
* 嚴格來說是運算子
* 用於迭代器和產生器

$throw
~ throw expresstion;
* 用於擲出(明確地)一個例外(錯誤訊號)
* 可搭配Error物件使用
* 當一個例外被擲出, JS直譯器就會停止正常的程式執行, 並跳掉最近的例外處理器(exception handler, try/catch/finally述句的catch字句), 若是沒有關聯的例外處理器, 繼續檢查更外圍的例外處理器, 若沒找到, 該例外就會被視為錯誤並回報給使用者.

$try/catch/finally
~ try{
~ //例外要處理的程式碼區塊
~ }
~ catch(e){
~ //try區塊擲出一個例外時執行
~ }
~ finally{
~ //一定會執行的述句, 不管try區塊中是否被擲出例外
~ }

?[其他述句]
$with
~ with(object) statement
* 能夠建立物件的特性的暫時範疇
* 應該被棄用(效率低, 難最佳化)

$debugger
* 若有除錯器程式可用並正在執行, 能作為中斷點(js程式停止), 可進行除錯

$use strict
* 實際上為一種指引(directive)並非述句, 但極為相似
*   他並不包含任何語言關鍵字, "use strict"指引只是由一個特殊的字串字面值構成的運算式述句
*   他只能出現在一個指令搞開頭, 或函式主體的開頭
* 用於開啟嚴格模式(除了使用use strict開啟, 程式碼於class主體或模組也會是嚴格模式的)
* 嚴格模式用於修正重大的語法缺失

?[宣告]
* 技術上來說並非述句, 但很像述句並應被當做述句
* 程式運行時, 會被估算(evaluated)的是運算式, 會被執行(executed)的是述句, 然而宣告並不是以同樣方式運行的, 宣告是在程式碼運行前, 會先被處裡的結構(定義了程式本身的結構)

$const, let, var
* const宣告常數, let宣告變數(舊版本使用var)
* const, let屬於區塊範疇, var屬於函式範疇

$function
* function宣告用於定義函式
* 函式宣告會創建一個函式物件, 並且函式名稱會被繫結到該函式物件
* 函式宣告會被拉升(hoisted)

$class
* class宣告會建立新的類別, 並賦予可以參考它的名稱
* 類別宣告不可被拉升

$import和export
* 用於模組的匯出匯入
*/








