var fs = require("fs");
var baseurl = "./data";

//save
exports.save = function(shoujihao,data,callback){
	//write in this file
	fs.writeFile(baseurl + "/" + shoujihao + ".txt",data,callback)
}

//this function get all file names from folder
exports.getAllFilesName = function(callback){
	//readdir is fs' API，can read all file names of one folder to another folder
	fs.readdir(baseurl,function(err,filenameArray){
		if(err){
			throw new Error("failed to read file's list！");
			return;
		}
		//prepare an array, in this array, save files without .txt
		var resultArr = [];
		for (var i = 0; i < filenameArray.length; i++) {
			//.txt used 4 bytes, extract strings doesn't include the last 4 bytes
			resultArr.push(filenameArray[i].substr(0,filenameArray[i].length - 4));
		};
		//this function is asynchronous, if want send data back to prevous caller, must use callback function
		callback(resultArr);
	});
}


//reading files, the contents use call back function give back
exports.read = function(shoujihao,callback){
	fs.readFile(baseurl + "/" + shoujihao + ".txt" , function(err,data){
		if(err){
			//files doesn't exist
			callback(-1);
			return;
		}

		callback(data.toString());
	});
}