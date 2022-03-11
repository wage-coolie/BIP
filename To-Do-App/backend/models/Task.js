const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
	description:{
		type:String,
		required:true
	},
	status:{
		type:Boolean,
		default:false
	}
},
{ timestamps:true }
);


module.exports = mongoose.model("Task",TaskSchema)