// imorting express , and intialising router in the path
const router = require('express').Router();
const Task = require('../models/Task');

// Checking main route
router.get('/',(req,res)=>{
	res.send("The api works fine for task");
})

router.post('/', async (req,res)=>{
	try{
		const task = await new Task({...req.body});
		await task.save();
		res.status(200).json(task)
	}catch(err){
		console.log(err);
		res.status(404).json('Something Went Wrong')
	}
})

// Getting all the tasks
router.get('/all', async(req,res) => {
	try{
		const tasks = await Task.find({}).sort({createdAt:-1});
		res.status(200).json(tasks)
	}catch(e){
		return res.status(500).json(e)
	}
})


router.put('/:id', async (req,res)=>{

	try{
		const task = await Task.findByIdAndUpdate(req.params.id,{
			$set:req.body,
		});
		// const task = await Task.findById(req.params.id)
		res.status(200).json(task)
	}catch(err){
		console.log(err);
		res.status(404).json('Something Went Wrong with Update')
	}
})

router.delete('/:id', async (req,res)=>{
	try{
		const task = await Task.findByIdAndDelete(req.params.id);
		res.status(200).json("The Message has been deleated")
	}catch(err){
		console.log(err);
		res.status(404).json('Something Went Wrong with Delete')
	}
})

// export roouter so it can be used by index.js , where it is imported
module.exports = router