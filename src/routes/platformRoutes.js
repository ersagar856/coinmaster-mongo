const express = require('express');
const router = express.Router();
const Platform = require('../models/PlatformModel');
//Post Method
router.post('/add-platform', async (req, res) =>{
    try{
        const {id, name, isActive, popular} = req.body;
        
        const existingPlatform = await Platform.findOne({ name });
        if (existingPlatform) {
            return res.status(400).json({ message: 'Platform name already exists' });
        }
        const platform = new Platform({
            id,name,isActive,popular
        });
        await platform.save();
        res.status(201).json({message: 'Platform Created successfully', PlatformID: platform.id})
    }
    catch(err)
    {
        res.status(500).json({error: 'Server error', details: err});
    }
});
//get method
router.get('/get-platform',async (req , res) => {
    try{
        Platform.find({}, '_id name slug isActive')
            .then(results => {
                res.status(200).json({results})
            })
            .catch(err => {
                res.status(500).json({err})
            });
    }
    catch(err)
    {
        res.status(500).json({error:"Error in platform",details:err})
    }
});
//Edit category API using Put method
router.put('/update-platform/:id',async(req, res)=>{
    let id = String(req.params.id);
    if (id.startsWith('id:')) 
    {
        id = id.replace('id:', '');
    }
    const { name,isActive,description } = req.body;
    try{
        const platform = await Platform.findById(id);
        if(!platform) 
        {
            return res.status(404).json({ message: 'Platform not found' });
        }
        platform.description = description || platform.description;
        platform.name = name || platform.name;
        platform.isActive = isActive !== undefined ? isActive : platform.isActive;
        platform.updatedAt = new Date();
        const updatedplatform = await platform.save();
        res.status(200).json(updatedplatform);
    }
    catch(err)
    {
        res.status(500).json({ message: 'Error updating platform', err });
    }
});
//Delete category 
router.delete('/delete-platform/:id', async (req, res) =>{
    let id = String(req.params.id);
    if (id.startsWith('id:')) 
    {
        id = id.replace('id:', '');
    }
    if (!id) {
        return res.status(400).json({ message: 'Platform is required' });
    }
    try{
        const deletedPlatform = await Platform.findByIdAndDelete(id);
        if (!deletedPlatform) {
            return res.status(404).json({ message: 'Platform not found' });
        }
        res.status(200).json({ message: 'Platform deleted successfully', deletedPlatform });
    }
    catch(err)
    {
        res.status(500).json({ message: 'Error deleting platform', err });
    }
} );
module.exports = router;

