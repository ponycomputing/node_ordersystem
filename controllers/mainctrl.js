var formidable = require("formidable");
var file = require("../models/file.js");

//show homepage
exports.showIndex = function(req,res){
    res.render("index");
}

//exports a middle ware, this is Ajax gate
exports.baocun = function(req,res){
    var form = new formidable.IncomingForm();
    //recognise form by formidable widgets
    form.parse(req, function(err, fields) {
        var shoujihao = fields.shoujihao;
        var cai = fields.cai;
        //call file  module function
    	file.save(shoujihao,cai,function(err){
            if(err){
                res.send("-1");
            }else{
                res.send("1");
            }
        });
    });
}


//exports middle wares
exports.showAlldingdan = function(req,res){
    //use file model to read folder's mobile number, render views
    file.getAllFilesName(function(arr){
        //arr is all file names of folder
        res.render("alldingdan",{
            "quanbushoujihao" : arr
        });
    });
}

//export a middle ware, to display an order
exports.showOnedingdan = function(req,res){
    //recognise URL
    var shoujihao = req.params.shoujihao;
    //before render view, controleer to collect all datas 
    //let file to do something
    file.read(shoujihao , function(cai){
        if(cai == -1){
            cai = "couln't find";
        }
        
        //render views
        res.render("onedingdan",{
            "shoujihao" : shoujihao,
            "cai" : cai
        });
    });
}