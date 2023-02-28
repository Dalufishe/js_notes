//!                 Javascript Web
//!#################################################
/* 
* Web瀏覽器: 顯示經過格式化的文件, 也提供像繪圖, 影片, 音訊, 網路, 儲存, 執行緒等服務
* JS語言: Web瀏覽器所顯示的文件擁有動態行為
*   控制文件內容和樣式
*   判斷文件元素在螢幕上的位置
*   建立可重用的使用者元件
*   繪製圖形
*   播放與產生聲音
*   管理瀏覽器導覽與歷程
*   透過網路交換資料
*   在使用者電腦上儲存資料
*   以執行緒進行共時運算
?[Web程式]
$HTML script 標記
! HTML讀取JS指令稿
~ <script> 程式碼 </script>
~ <script src="url"> </script> (簡化, 共用, 較快(多檔案), 運用其他網頁url)

!模組
* 使用import/export
* type屬性設為module
~ <script type="module"></script> 

!類型(type)
* type屬性用途: 
*   指出是模組(module)
*   內嵌資料到網頁中, 而不再顯示他

!指令稿何時執行
* JS初次被家道Web瀏覽器, 沒有API可以操作文件之結構和內容(除非document.write())
* 同步&阻斷式: HTML剖析器遇到script元素, 預設情況會執行指令稿以確保沒有輸出HTML(嚴重降低網頁速度)
* defer屬性: 推延指令稿執行(等到文件完整載入)
* async屬性: 在不阻斷的前提下, 盡快執行指令稿

!視情況載入指令稿
* import()視情況載入模組
* DOM API 新增script標記

$Document Object Model
* "Document物件"代表顯示在瀏覽器視窗或分頁中的"HTML文件"
* 用於處理HTML文件的API稱作 "DOM" "Document Object Module"
* DOM API 反映了HTML物件的樹狀結構:
*   HTML文件本身: document物件
*   HTML標記: Element物件(每種標記都有自己的類別)
*   文字: Text物件
*   上述物件類別都為Node類別的子類別

$Web瀏覽器的全域物件(Global Object)
* 每個視窗或分頁都有一個全域物件, 那個視窗的所有JS程式碼都共用這單一個的全域物件(包括指令稿或模組, 除了worker threads)
* 若有一個指令稿在全域物件定義一個特性, 所有指令稿都看的到那個特性
* 全域物件就是定義標準程式庫的地方, Web API的主要進入點
* 全域物件: 1.管理JS程式碼 2.代表目前的瀏覽器視窗(歷史紀錄等等)
* 全域物件window特性 - 指向本身

$指令稿共用一個命名空間
* 使用模組指令稿, 頂層定義變數都是私有的, 除非被明確匯出
* 使用非模組指令稿, 頂層定義變數在同一份文件中共享
*   var, function: 會在共用的全域物件建立特性
*   const, let, class: 不會在全域物件建立特性, 然而仍然定義在一個共用的命名空間

$JS程式的執行
* JS程式共用單一個全域 windows物件 -> 存取同一個底層的document文件
* 內嵌的網頁不共用全域物件, 不共用document物件 (除非來自相同伺服器)
* 程式分為兩階段發生:
*   第一階段: 文件會被載入, <script>元素中的程式碼(不管內外)會被執行,
*       一般來說會照順序執行, 但可被async或defer屬性改變
*   第二階段: 非同步(asynchronous)且事件驅動(event-driven)的
*       非同步程式碼會在此階段執行,

!客戶端JS的執行緒模型
* JS是單執行緒語言(single-threaded language): 
*   不會有兩個事件處理器同時進行,
*   指令稿和事件處理器執行時候會停止回應使用者輸入
* web worker: 不會凍結使用者介面的背景執行緒

!客戶端的JS時間軸
* 指令稿執行階段(script-execution phase) -> 事件處理階段(event-handling phase)
* 1. Web瀏覽器創建 document物件, 並開始剖析網頁, 剖析到的element物件和text物件新增到物件中, document.readyState特性值為loading
* 2. HTML剖析器遇到<script>(非async, defer, module), 他會把指令稿物件中, 然後執行那段指令稿(同步執行的, 可讀取先前已載入的文件, 使用document.write()可插入文字到輸入串流中)
* 3. 當剖析器遇到設有async屬性的script元素, 他不會等待下載並繼續剖析(指令稿可讀取到已下載文件)
* 4. 剖析結束: document.readyState特性為iteractive
* 5. defer屬性的任何指令稿(模組指令稿預設defer屬性)在這時候執行, 並能存取完整文件
* 6. document物件觸發DOMContentLoaded事件: 指出進入非同步階段
* 7. 影像等載入完畢, async指令稿載入並執行, document.readyState特性變為complete, 瀏覽器在Windows物件上觸發load事件

$程式的輸入與輸出
* 輸入: DOM API存取文件內容本身
* 輸入: 事件形式的使用者輸入(點擊按鈕, 輸入文字)
* 輸入: doucument.URL傳入URL建構器
* 輸入: document.cookie取用cookie
* 輸入: 全域的navigator特性(瀏覽器資訊, OS等資訊), screen特性
* 輸出: DOM API操作HTML文件產生輸出
* 輸出: 使用框架(如Angular)來操作文件產生輸出
* 輸出: console.log()相關方法

$程式錯誤
* Web瀏覽器上的JS程式不會真正的當掉(crash, 不同於OS執行的應用程式)
* JS發生例外, 沒有catch處理例外, 錯誤會顯示在開發人員主控台, 但已註冊的事件處理器還是會繼續執行並回應事件
* window.onerror
* window.onunhandledrejection

$Web的安全性模型
* 網頁在個人裝置上執行客戶端JS =>
* 瀏覽器:
*   定義強大的客戶端API協助開發有用Web應用程式
*   防止惡意程式讀取或更動你的資料, 侵犯隱私等

!JS不能做甚麼
* 客戶端JS沒有提供任何方式寫入或刪除客戶端電腦的任意檔案, 或列出目錄
* 客戶端JS沒有一般用途的網路能力(無法進行未經中介的存取)

!同源政策
* 同源政策(same-origin policy): 對JS程式碼能夠互動的Web內容的全面安全性限制
*   指令稿只能讀取來源與包含該址令稿文件相同的視窗和文件的特性

!跨站指令稿操作(XSS)
* 攻擊者透過注入HTML標記或指令稿到目標網站
* 這通常涉及到一個以上的網站, 網站B包含特別設計過的連結使他們被帶到網站A,並執行網站B的惡意程式碼
* 透過淨化使用者傳入的資料(移除任何不信任的HTML標記或指令稿), 或讓不信任的內容顯示在<iframe>中, 並使用sandbox屬性設為停用指令稿與其他能力

?[事件]
* 客戶端JS使用一種非同步的事件驅動程式設計模型(asynchronous event-driven programming model)
* 當有事情發生時(如按了一個按鈕, 游標經過一個超連結), 會產生一個事件(event)
* 當你特別關心某個(類型的)事件, 可以為他註冊在那事件發生時被調用的函式
* 事件類型(event type): 字串指出發生事件種類
* 事件目標(event target): 事件在其上發生的那個物件
* 事件處理器(event handler)或事件收聽器(event-lostener): 函式, 處理或回應一個事件
* 事件物件(event object): 與某個特定的事件關聯之物件, 並含有該事件的細節
* 事件傳播(event propagation): 瀏覽器決定在哪個物件上觸發事件處理器的過程

$事件種類
* 取決於裝置的輸入事件
* 獨立於裝置的輸入事件
* 使用者介面事件
* 狀態變更事件
* API限定事件

$註冊事件處理器
* Web初期: 作為事件目標的物件設定一個特性(或文件元素上設定屬性)
* 較新且通用: addEventListener()方法

! 設定事件處理器特性
*   事件目標的特性設定為所要的事件處理器
*   慣例上特性都是由on+事件類型(名稱), 並全都是小寫(不同於某些框架)
*   缺點: 事件目標最多只能有一種同一類型的事件處理器
~ window.onload = function(){}

! 設定事件處理器屬性
* 文件元素的事件處理器也能直接定義在HTML檔案中做為對應HTML標記的屬性

!addEventListener()
* 可以作為事件目標的任何物件(window物件, document物件, element物件等), 都有定義一個名為addEventListener()的方法, 用於註冊事件處理器
~ b.addEventListener("click", () => {console.log("hi")})
* removeEventListener(type, func)可移除一個事件處理器函式
* addEventListener的第三個引數是一個boolean值或物件:
*   boolean: true(捕捉式)/false(非捕捉式)
*   物件: {capture: true/false, //捕捉式 
*          once: true/false, //是否觸發一次即刪除
*          passive: true/false //永遠不會呼叫preventDefault()來取消預設動作}

$事件處理器的調用
* 註冊一個事件處理器, Web會在指定類型的一個事件在指定物件上發生的時候, 自動調用他

!事件處理器引數
* 事件處理器以一個Event物件作為單一引數來調用的, Event物件的特性提供了該事件的細節
~ x.addEventListener("click", function(event){
~   console.log(event);
})
* Event物件特性提供了該事件的細節:
*   type: 事件類型
*   target: 事件目標(發生事件的該物件)
*   currentTarget: 對於會傳播的事件, 指出目前事件處理器在其上註冊的物件
*   timeStamp:　指出該事件何時發生的時戳
*   isTrusted: 指出該事件是由Web瀏覽器所分派, 或者是JS程式碼

!事件處理器情境
* 事件處理器是以目標物件做為this值來被調用的(除箭頭函式)

!處理器的回傳值
* 在較舊的程式碼中, 事件處理器的回傳值為告知瀏覽器不應進行有關該事件的預設動作
* 現今多使用Event物件上呼叫preventDefault()方法

$事件傳播
* 註冊於目標元素的事件處理器被調用後, 大多數的事件會往上浮(bubble up)
* 大多數事件都會往上傳播(除了focus, blur, scroll)
* 1.捕捉(反向傳播)2.調用處理器3.傳播

$事件取消
* 為瀏覽器預設會回應使用者事件註冊處理器, 並使用preventDefault()來防止瀏覽器進行預設動作(passive選項無效)
* stopPropagation(): 取消事件傳播

$分派自訂事件

?[以指令稿操控文件]
* 每個Windows物件都有一個document特性參考到一個Document物件
* Document物件是DOM的中心物件, 用以表示和操作HTML文件內容

$選取文件元素
* document特性參考到Document物件(操作HTML文件)
* Document物件head特性和body特性分別參考到head標記和body標記的元素物件
* querySelector()方法接受一個CSS選擇器字串作為引數, 並回傳第一個符合的元素, 找不到時回傳null
* querySelectorAll()回傳所有符合的元素(Nodelist類陣列物件)
* ::first-line和::first-letter偽元素不會匹配
* 許多瀏覽器拒絕為:link和:visited偽類別回傳匹配
* closest()方法(Element元素): 反向的querySelector()
* matches()單純測試一個元素是否和一個CSS選擇器相符

$文件結構和巡訪
* 巡訪用API: 把文件視為由Element物件所組成的一個樹狀結構, 並忽略Text節點
* parentNode: 父節點
* children: 元素子節點
* childElementCount: 元素子節點個數
* firstElementChild, lastElementChild: 第一個, 最後一個元素子節點
* nextElementSibling, previousElementSibling: 下一個, 上一個元素兄弟節點

* childNodes: 所有子節點
* firstChild, lastChild: 第一個, 最後一個子節點
* nextSibling, previousSibling: 下一個, 上一個兄弟節點
* nodeType: 指出節點是哪一種的數字:
*   document節點 - 9;
*   element節點 - 1;
*   text節點 - 3;
*   comment節點 - 8;
* nodeValue: 一個text節點或comment節點的文字內容
* nodeName: element節點的html標記名稱

$屬性
* 方法: getAttribute(), setAttribute(), hasAttribute(), removeAttribute()
* 特性: element物件有為通用的html屬性, 限定的html屬性設定特性, 可以進行取得, 設定和查找(無法移除!)
* class屬性: className特性(字串), classList特性(類陣列物件)

$元素內容
* 元素內容: HTML字串 & 純文字字串

!作為HTML的元素內容
* innerHTML(Element特性)會以一個標示碼字串的形式回傳該元素的內容
* outerHTML(Element特性)會包含自己本身標記
* insertAdjacentHTML(插入點, HTML字串): 插入相鄰HTML字串

!作為純文字的元素內容
* textContent特性

$建立, 插入, 與刪除節點
* Document類別的createElememt()方法創建元素
* append()和prepend()(用於Element節點): 將Node物件或字串(會被轉為Text節點)新增至元素的子節點串列
* before()和after()(用於Element和Text節點): 將Node物件或字串(會被轉為Text節點)新增至元素的兄弟節點之前或之後
* remove(), replaceWith()可刪除節點
* cloneNode(true)可複製節點

?[以指令搞操控操控CSS]

$CSS類別(操作)
* HTML標記的class屬性新增或移除CSS類別名稱
* classList特性 -> class屬性

$行內樣式(操作)
* 指令搞控制元素的style屬性以設定專屬那一個元素的行內樣式
* JS中的style特性為一個CSSStyleDeclaration物件
* CSSStyleDeclaration物件可以單一設置樣式, 也可以使用cssText特性以css語法, 單一字串形式設定樣式

$計算樣式(唯讀)
* 計算樣式 = 行內樣式 + 所有樣式表 + 規則
* CSSStyleDeclaration物件表示, 跟行內樣式不同的是, 他是唯讀的, 特性值是絕對的, 捷徑不被計算, cssText是為定義的
* windows.getComputedStyle(element, 偽元素)取得計算樣式

$操控樣式表(操作)
* 透過 <style>, <link> 直接操作指令表

$CSS動畫與事件
* 透過JS可觸發CSS變遷(transition)及動畫(animation)
* 

?[文件的幾何形狀和捲動]
* 元素, 文字節點 => 抽象樹結構
* 文件描繪到視窗中 => 視覺表現

$文件座標和Viewport座標
* 文件座標: 絕對, 文件左上方作為原點
* 檢視區座標(視窗座標): 相對, 視窗(可見)左上方作為原點
* 互換需考慮捲動偏移量
~ let documentHeight = document.documentElement.offsetHeight;
~ let viewportHeight = window.innerHeight;
* 容器座標: 相對定位容器包含絕對定位的元素建立座標系統, 獨立於文件座標和檢視區座標

$查詢一個元素的幾何形狀(元素 => 位置)
* getBoundingClientRect()方法回傳一個帶有位置大小資訊的物件
* getClientRects()方法回傳一個類陣列物件包含行內元素個別矩形

$判斷位於一個點上的元素(位置 => 元素)
* document.elementFromPoint(viewport)方法查詢點上的元素(最內層最上面(z-index))

$捲動
* window.scrollTo(絕對偏移量)方法捲動視窗
* window.scrollBy(相對當下偏移量)方法捲動視窗
* window.scrollTo(By)({
*   left:
*   top:
*   behavior:
})
* element.scrollntView()可以讓文件某個元素被看到

$檢視區大小, 內容大小, 捲動位置
* 檢視區大小: window.innerWidth, window.innerHeight
* 文件大小: <html>元素大小
* offset: 邊框+內距+內容
* client: 內距+內容
* scroll: 溢位內容(內距+內容)

?[Web元件]
* 現今大多數的Web應用程式都不是使用原始的HTML所撰寫的
*   框架(React, Angular)
*   Web元件(原生的替代方式)

$Web元件
* Web元件是以JS定義的, 使用Web元件必須引入該元件的JS檔案(通常是模組)
* Web元件定義了自己的HTML標記名稱(含有連字符)
* 某些Web元件會預期子節點, 搭配插槽(slot)做使用
* Web元件通常是由模組載入(通常帶有defer屬性), 在模組載入前標記東常不會正常顯示
* HTML範本, 自訂元素, 影子DOM使Web元件變的可能

$HTML範本
* <template>標記和他們的子節點永遠不會被Web瀏覽器所描繪
* 當一個網頁包含了重複了多次的同一個基本的HTML架構, 我們就能使用一個<template>定義一次, 用JS重複那個結構多次
* template元素由HTMLTemplateElement所表示, content特性為template的所有子節點所成的一個DocumentFragment

$自訂的元素
* JS類別關聯至HTML標記的能力, 使所有這種標記在DOM樹中都被轉為該類別的實體
~ customElements.define(標記名稱(連字符), HTMLElement的子類別)
* 瀏覽器會自動調用自訂元素類別的生命週期方法
~ connectedCallback()方法會在實體被插入到文件中被調用(進行初始化)
~ disconnectedCallback()方法會在該元素被移除時調用
~ 靜態observedAttributes特性, 其值為屬性名稱組成的一個陣列, 當自訂元素的實體上有任何屬性被設定(或改變), 瀏覽器會調用attributeChangedCallback(屬性名稱, 舊值, 新值)方法

$影子DOM
* 自訂元素 -> 更改到自己的style -> 並非強大封裝
* 影子DOM -> 更加強大的"封裝機制"

* 影子DOM: 影根(更私密的後裔元素的根) + 自訂元素or部分原生html元素, 稱為影宿主
*   影子: 影根上那些後裔元素隱藏在影子中(並非正常DOM樹, 不會被巡訪到)
*   舉例: <audio>, <video> 實作細節被隱藏

!影子DOM的封裝
* 創建一個影根, 接附到影宿主時, 可是開啟(shadowRoot特性可讀取)或封閉(完全無法讀取)模式
* 影子DOM永遠不會影響到光明DOM, 基本上兩者是完全獨立的
* 影子DOM除了部分事件以外都會被傳遞出來, 當源於影子DOM的事件跨越邊界, 事件的target特性會變為影宿主元素

!影子DOM的插槽何光明DOM的子節點
* 影宿主會有兩個後裔樹, 光明DOM後裔及影根後裔
* 影根的後裔永遠都會顯示在影宿主中
* 若那些後裔包括<slot>元素 -> 光明DOM取代插槽中的影子DOM

?[SVG]
* SVG(Scalable Vector Graphics): 可縮放向量圖形
*   GIF, PNG, JPEG: 光柵影像, 像素值所決定矩陣
*   SVG: 向量圖形, 精確且獨立於解析度(可縮放)
* SVG影像是由XML標記語言的文檔所描述(相當類似HTML)

$建立方法
* HTML<img>標記使用.svg影像檔
* HTML<svg>標記
* DOM API創建svg元素

$HTML中的SVG
* <svg>標記後裔並非一般的HTML標記
* 設定給<svg>標記的CSS特性並非普通的CSS特性
* "參考資料"

$指令搞操作SVG
* 在HTML內嵌SVG, 而非使用靜態的<img>標記, 就能夠利用DOM API來操作SVG影像

$以JS創建SVG影像
* JS DOM API創建SVG元素, 須以createElementNS(XML命名空間("https://www.w3.org/2000/svg"), "svg")

?[canvas]
* SVG: XML元素樹建立圖形
* canvas: 方法繪製圖形
* Canvas繪圖API: 
*   在<canvas>元素物件的getContext()方法獲得繪圖情境(~繪製圖形)
*   運用的路徑(不同於svg複雜的字串, canvas使用方法)的概念, 指出運算該如何進行
* 接下來包含2D Canvas API的用法

$路徑和多邊形
* 畫布上繪製線條, 需定義路徑
* 路徑是一序列的單或多個子路徑(線段或曲線段連接的兩或更多個點)
~ c為繪圖情境(2d)
~ c.beginPath() // 起始一個新路徑
~ c.moveTo(100, 100) //開始一個子路徑
~ c.lineTo(200, 200) //畫線
~ c.lineTo(100, 200) //畫線
~ c.closePath() // 封閉子路徑

$畫布的尺寸和座標
* canvas元素的width及height屬性指出畫布的尺寸
*   width及height屬性指出話不可繪入的實際像素數(硬體像素)
*   width及height屬性指出會被顯示在螢幕上的預設大小(css像素)
*   => CSS的樣式設定width及height, 並將畫布屬性width及height設定成最佳像素數(dpr * 原本單邊的大小)
* 更動畫布的尺寸, 會重置該畫布 

$圖形屬性
* 圖形屬性, 指出fill()和stroke()所表現的樣式(顏色, 粗細等)
* 圖形屬性跟繪圖命令間是分離的

!線條樣式
* lineWidth: stroke()所繪出的線條寬度
* lineCap: 兩端, "butt", square, round
* lineJoin: 關節處, "miter" round "bevel"(當給定頂點的斜接處比寬度的一半乘上miterLimit(預設10)還長)
* setLineDash([繪出, 空白]): 設定短劃
* getLineDash(): 取得短劃
* lineDashOffset: 指出何時開始

!顏色, 模式, 漸層 
* strokeStyle: 指出路徑如何畫出
*   顏色: css顏色字串
*   漸層: CanvasGradient物件(調用繪圖情境的createLinearGradient(兩點座標)或createRadialGradent(兩個圓))
*   影像: CanvasPattern物件(調用情境物件的createPattern(img元素物件或canvas元素物件, "repeat/repeat-x/repeat-y/no-repeat"))
* fillStyle: 指出路徑如何填滿
*   顏色: css顏色字串
*   漸層: CanvasGradient物件(調用繪圖情境的createLinearGradient(兩點座標)或createRadialGradent(兩個圓))
*   影像:

!文字樣式
* font: fillText()和strokeText()所用的字體
* textAlign: fillText()和strokeText()的X座標水平對齊
* textBaseline: fillText()和strokeText()的X座標垂直對齊

!陰影
* shadowColor: 陰影顏色
* shadowOffsetX, shadowOffsetY: 陰影偏移量
* shadowBlur: 模糊

!不透明度和合成
* globolAlpha: 將所繪製的每個像素alpha值乘上globolAlpha
* globolCompositeOperation: 處理合成

!儲存與回復
* Canvas API 每個<canvas>元素的情境物件只有一個
* save(): 將目前的圖形狀態加入"已儲存狀態"堆疊
* restore(): 從堆疊中取出

$繪圖運算
!矩形
* rect(): 自成一個矩形子路徑
* fillRect(): 使用fillStyle填滿矩形, 不影響路徑
* strokeRect(): 使用strokeStyle和其他線條樣式畫出矩形, 不影響路徑
* clearRect(): 以透明的黑色像素填滿矩形

!曲線
* arc(): 新增圓到路徑
* ellipse(): 新增橢圓到路徑
* arcTo(): 繪製直線及圓弧
* bezierCurveTo()
* quadraticCurveTo()

!文字
* fillText()
* strokeText()

!影像
* drawImage(img元素, x, y)
* drawImage(img元素, x, y, width, height)
* drawImage(img元素, 來源矩形, 目的矩形)

!座標系統
* translate():  平移
* rotate(): 旋轉
* scale(): 伸縮

?[Audio API]
* new Audio()
* WebAudioAPI

?[位置導航歷程]
* Window和Document物件的location特性指向Location物件
* Location物件代表視窗文件目前的URL, 也提供API來把新的文件載入到視窗
* protocol, hostname, port, pathName, href等等特性(類似於URL物件)
* hash回傳片段識別符(井字號部分), search回傳查詢字串(問號部分)
* Location物件沒有searchParams特性, 但可透過傳入URL建構器建立URL物件作使用
* document.URL回傳目前文件的url字串(非URL物件)

$載入新文件
* 指定字串給location特性, 字串會被解讀成URL, 而瀏覽器會載入它
* assign方法: 載入新頁面
* replace方法: 載入新頁面, 但歷程紀錄取代目前的文件
* Lreload方法: 重新載入頁面

$瀏覽歷程
* windw的history特性指向該視窗的History物件
* length特性指出該瀏覽歷程串列的元素數目(但基於安全考量內容不可存取)
* back(), forword(), go()方法

$hashchange事件的歷程管理
* 使用location.hash特性搭配window的hashchange事件

$pushState()和popstate事件的歷程管理
* pushState(物件(包含回復文件目前狀態的所有資訊(結構化複製)), 狀態標題, 顯示URL)
* popstate事件的state特性, 含有傳入pushState()狀態物件的一個拷貝

?[網路]
* fetch(): 基於Promise的網路API, 能處理HTTP和HTTPS請求
* SSE API: 基於事件的網路API
* WebSocket: 網路協定, 設計來與HTTP交互 

$fetch() - 基於Promise
* fetch(url(字串, URL物件), {
*   header: Header物件
*   method: 請求方法
*   body: 請求主體
*    }(option物件))

* 基本用法(三大步):
*   1.呼叫fetch(), 傳入URL
*   2.取得"回應物件"(Response物件), 並呼叫回應物件的方法取得回應主體
*   3.取得"回應主體"(不定值), 並由你操作

* Response物件:
*   status特性: http狀態碼
*   ok特性: true/false, 判斷HTTP狀態碼是否介於200~299
*   header特性: Header物件
*       has(), get()等方法
*       為可迭代物件
*   bodyUsed特性: 呼叫text(), json()等回應方法, true
*   body特性: ReadableStream物件, 用於串流讀取
*       getReader(): 獲取串流讀取器物件
*           read(): 串流讀取, 回傳promise
*   text()
*   json()
*   arrayBuffer()
*   blob()
*   formData()

?[緩衝區]
* Web可使瀏覽器在使用者本地端的電腦儲存資料
* 用於記憶, 如記錄使用者偏好, 儲存狀態等等
* 可以是暫時儲存, 也可以是永久儲存

* Web Storage: localStorage及sessionStorage, 用於客戶端儲存
* Cookies: 主要用於伺服端, 但也可用於客戶端(古怪API)
* IndexedDB: 透過索引的一個物件資料庫(非同步)

$Web Storage
* localStorage: 廣而長
*   window.localStorage指向Storage物件(特性和值必須是字串)
*   儲存在Storage物件的值會持續存在
*   範疇是文件來源, 並且瀏覽器獨立
*   clear(), deleteItems(), getItem(), setItem()
* sessionStorage: 窄而短
*   window.sessionStorage指向Storage物件(特性和值必須是字串)
*   儲存在Storage物件的值會在頁面關閉時關閉(可透過瀏覽器復原最近關閉頁面復原)
*   範疇是文件來源, 並且瀏覽器獨立和分頁視窗獨立
*   clear(), deleteItems(), getItem(), setItem()

$Cookies
* Web瀏覽器儲存的少量具名資料, 並設計用於伺服器(=> Http的擴充功能)
* 生命週期與範疇能以cookie的屬性進行設定
* document.cookie套性指向目前文件的所有cookies(值與對組並由; 所組成的字串)

$IndexedDB
* 為 Web平台的物件資料庫(非關聯式資料庫)
* 比localStorage更強大, 可靠, 有效率
* 範疇, 生命週期同 localStorage(文件來源, 永久), 但每個來源可有任意個IndexedDB資料庫
* 非同步, 基於事件
* IndexedDB資料庫有主要鍵值, 次要鍵值(具名索引)之分
* 要查詢或更新一個資料庫, 首先開啟資料庫, 接著建立交易物件, 並查找物件存放區, 並使用方法
* 提供原子性的保證, 對資料庫的查詢和更新被歸類在一筆交易, 一起成功, 或一起失敗
*/





function withIndexedDB(callback) {
    const request = indexedDB.open("fucku", 1);
    request.onerror = console.error;
    request.onupgradeneeded = () => {
        let db = request.result;
        db.createObjectStore("language", { keyPath: "id" });
    }
    request.onsuccess = () => {
        let db = request.result;
        let transaction = db.transaction("language", "readwrite");
        transaction.onerror = console.error;
        transaction.onsuccess = () => {
            let store = transaction.objectStore("language");
            store.put({ id: 1, first: "HTML", second: "Javascript" });
        }
        transaction.oncomplete = () => {
            let transaction = db.transaction("language", "readwrite");
            let request = transaction.objectStore("language").get(1);
            request.onsuccess = () => { console.log(request.result) }
        }
    }
}

withIndexedDB();