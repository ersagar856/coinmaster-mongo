const express = require('express');
const router = express.Router();
const Industry = require('../models/IndustryModel');
//Post Method
router.post('/add-industry', async (req, res) =>{
    try{
        const {id, name, isActive, popular} = req.body;
        
        const existingIndustry = await Industry.findOne({ name });
        if (existingIndustry) {
            return res.status(400).json({ message: 'Industry name already exists' });
        }
        const industry = new Industry({
            id,name,isActive,popular
        });
        await industry.save();
        res.status(201).json({message: 'Industry Created successfully', IndustryID: industry.id})
    }
    catch(err)
    {
        res.status(500).json({error: 'Server error', details: err});
    }
});
//get method
router.get('/get-industry',async (req , res) => {
    try{
        Industry.find({}, '_id name slug isActive')
            .then(results => {
                res.status(200).json({results})
            })
            .catch(err => {
                res.status(500).json({err})
            });
    }
    catch(err)
    {
        res.status(500).json({error:"Error in industry",details:err})
    }
});
//Edit category API using Put method
router.put('/update-industry/:id',async(req, res)=>{
    let id = String(req.params.id);
    if (id.startsWith('id:')) 
    {
        id = id.replace('id:', '');
    }
    const { name,isActive,description } = req.body;
    try{
        const industry = await Industry.findById(id);
        if(!industry) 
        {
            return res.status(404).json({ message: 'Industry not found' });
        }
        industry.description = description || industry.description;
        industry.name = name || industry.name;
        industry.isActive = isActive !== undefined ? isActive : industry.isActive;
        industry.updatedAt = new Date();
        const updatedindustry = await industry.save();
        res.status(200).json(updatedindustry);
    }
    catch(err)
    {
        res.status(500).json({ message: 'Error updating industry', err });
    }
});
//Delete category 
router.delete('/delete-industry/:id', async (req, res) =>{
    let id = String(req.params.id);
    if (id.startsWith('id:')) 
    {
        id = id.replace('id:', '');
    }
    if (!id) {
        return res.status(400).json({ message: 'Industry is required' });
    }
    try{
        const deletedIndustry = await Industry.findByIdAndDelete(id);
        if (!deletedIndustry) {
            return res.status(404).json({ message: 'Industry not found' });
        }
        res.status(200).json({ message: 'Industry deleted successfully', deletedIndustry });
    }
    catch(err)
    {
        res.status(500).json({ message: 'Error Industry platform', err });
    }
} );
module.exports = router;

