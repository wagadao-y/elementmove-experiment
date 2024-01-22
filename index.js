(function () {
  let area = document.getElementById("area");
  let elem_red = document.createElement("div");
  elem_red.classList.add("drag-and-drop");
  elem_red.id = "red-box";
  elem_red.textContent = "drag";
  area.appendChild(elem_red);

  const elem_blue = document.createElement("div");
  elem_blue.classList.add("drag-and-drop");
  elem_blue.id = "blue-box";
  elem_blue.textContent = "and";
  area.appendChild(elem_blue);

  const elem_yellow = document.createElement("div");
  elem_yellow.classList.add("drag-and-drop");
  elem_yellow.id = "yellow-box";
  elem_yellow.textContent = "drop";
  area.appendChild(elem_yellow);
})();


(function () {

  //要素の取得
  var elements = document.getElementsByClassName("drag-and-drop");

  //要素内のクリックされた位置を取得するグローバル（のような）変数
  var x;
  var y;

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, false);
    elements[i].addEventListener("touchstart", mdown, false);
  }

  //マウスが押された際の関数
  function mdown(e) {

    //クラス名に .drag を追加
    this.classList.add("drag");
    this.classList.add("changed");

    //タッチデイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
  }

  //マウスカーソルが動いたときに発火
  function mmove(e) {
    //ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if (e.type === "mousemove") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす
    let top = Math.floor((event.pageY - y) / 50) * 50;
    let left = Math.floor((event.pageX - x) / 50) * 50;
    drag.style.top = top + "px";
    drag.style.left = left + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);

  }

  //マウスボタンが上がったら発火
  function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    // document.body.removeEventListener("touchmove", mmove, false);
    // drag.removeEventListener("touchend", mup, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
    drag.classList.remove("changed");
  }

})();