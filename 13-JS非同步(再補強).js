//!               Javascript 非同步
//!#################################################
/*
?[非同步]
* 程式經常得停止運算, 同時等候資料抵達或某些事情發生再執行: 非同步程式設計 
* ES6: Promise, ES2017: async / await, ES2018: 非同步迭代器和for/await迴圈

?[非同步 - 使用Callbacks]
* 在最基本的層次, Javascript的非同步程式設計是使用callbacks(回呼)執行的
* callback: 傳入其他"函式"作為引數的某"函式", 並在某個條件達成時調用(回頭呼叫 calls back)你的函式
~ function(callback){
~   callback() 
~ }

$計時器
* 指定長度的一段時間過去後, 執行某些程式碼, 最簡單的非同步姓
~ setTimeout(callback, time) //callback在一定時間後執行(非同步)
~ setInterval(callback, time) //callback在固定時間間隔重複執行(非同步)

$事件驅動
* 指定情境發生時, 執行某些程式碼

$網路事件

$Node中的Callbacks

?[Promise]
* Promise代表一項非同步計算之結果的物件
* Promise可表達相較callbacks的巢狀回呼(nested callback)更為線性的Promise串練(chain)
* Promise可讓錯誤處理變得更簡單
* Promise僅能代表"單一個"非同步計算的未來結果
* Promise物件的then()方法用於執行非同步 及catch()用於捕捉錯誤

$Promise術語
* Promise-履行: then()第一個引數(callback)被調用
* Promise-拒絕: then()第二個引數(callback)被調用
* Promise-待決: Promise沒被履行且拒絕
* Promise-解決: Promise被履行或拒絕

?[async & await]
* await: 取得promise履行值或拒絕值(等到promise解決為止)
* async: 非同步函式定義: 回傳promise, return值為履行值, thorw值為拒絕值
*/



