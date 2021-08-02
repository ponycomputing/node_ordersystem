var express = require("express");
var app = express();
var mainctrl = require("./controllers/mainctrl.js");

//define template engine
app.set("view engine","ejs");

//当有人用post请求访问/baocun的时候做的事情
app.get("/"					 ,mainctrl.showIndex);	//display home page
app.post("/baocun"			 ,mainctrl.baocun);	//Ajax gate，to write in txt file
app.get("/dingdan"			 ,mainctrl.showAlldingdan);	//display all orders
app.get("/dingdan/:shoujihao",mainctrl.showOnedingdan);	//display a single order

//to static public folder, then the folder will automaticlly have router
app.use(express.static("public"));

app.listen(3000);
console.log("Order system is running, please visit port 3000！");