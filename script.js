var shoplist = {};
shoplist.name = "shoplist";
shoplist.time = "2018/2/28";
shoplist.items = [
  { name: "蔬菜", price: 100 },
  { name: "牛肉", price: 195 },
  { name: "香菇", price: 30 },
  { name: "水餃", price: 80 },
  { name: "珍珠", price: 50000 }
];

var item_html =
  "<li id={{id}} class='items'><div class='check'>☐</div><div class='item_name'>{{num}}. {{name}}</div><div class='price'>{{price}}</div><button id={{del_id}} data-delid={{del_item_id}} class='delete'>X</button></li>";

var total_html =
  "<li class='items total'><div class='item_name'>總價</div><div class='price'>{{price}}</div></li>";

function showlist() {
  $("#itemlist").html("");
  var total = 0;
  for (var i = 0; i < shoplist.items.length; i++) {
    var item = shoplist.items[i];
    var item_id = "item_num" + i;
    var del_item_id = "del_item_num" + i;
    total += parseInt(item.price);
    //用replace取代內容
    var temp_item_html = item_html
      .replace("{{id}}", item_id)
      .replace("{{num}}", i + 1)
      .replace("{{name}}", item.name)
      .replace("{{price}}", item.price)
      .replace("{{del_id}}", del_item_id)
      .replace("{{del_item_id}}", i);

    $("#itemlist").append(temp_item_html);
    //刪除需要先append才能運作，故放這
    $("#" + del_item_id).click(function() {
      removeitem(parseInt($(this).attr("data-delid")));
    });
    $('.check').click(function(){
      if($(this).text()=="☐"){
        $(this).text("☑");
      }else{
        $(this).text("☐");
      }
    });
  }
  var temp_total_html = total_html.replace("{{price}}", total);
  $("#itemlist").append(temp_total_html);
}

function removeitem(id) {
  shoplist.items.splice(id, 1);
  showlist();
}

showlist();

$(".add").click(function() {
  var price;
  //用val取得input內容
  //判斷如為空值則預設為0，以免影響運算總價
  if($("#input_price").val()==""){
    price=0;
  }else{
    price=$("#input_price").val();
  }
  shoplist.items.push({
    name: $("#input_name").val(),
    price: price
  });
  $("#input_name").val("");
  $("#input_price").val("");
  showlist();
});


