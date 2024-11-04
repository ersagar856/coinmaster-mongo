const express = require('express');
const router = express.Router();
const Category = require('../models/CategoryModel');
//Post Method
router.post('/category', async (req, res) =>{
    try{
        const {id, name, isActive,popular} = req.body;
        
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category name already exists' });
        }
        const category = new Category({
            id,name,isActive,popular
        });
        await category.save();
        res.status(201).json({message: 'Category Created successfully', CategoryId: category.id})
    }
    catch(err)
    {
        res.status(500).json({error: 'Server error', details: err});
    }
});
//get method
router.get('/category',async (req , res) => {
    try{
        Category.find({}, 'id name slug popular')
            .then(results => {
                res.status(200).json({results})
            })
            .catch(err => {
                res.status(500).json({err})
            });
    }
    catch(err)
    {
        res.status(500).json({error:"Error in category",details:err})
    }
});
//Edit category API using Put method
router.put('/categories/:id',async(req, res)=>{
    let id = String(req.params.id);
    if (id.startsWith('id:')) 
    {
        id = id.replace('id:', '');
    }
    const { name,isActive,description } = req.body;
    try{
        const category = await Category.findById(id);
        if(!category) 
        {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.description = description || category.description;
        category.name = name || category.name;
        category.isActive = isActive !== undefined ? isActive : category.isActive;
        category.updatedAt = new Date();
        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
    }
    catch(err)
    {
        res.status(500).json({ message: 'Error updating category', err });
    }
});
//Delete category 
router.delete('/categories/:id', async (req, res) =>{
    let id = String(req.params.id);
    if (id.startsWith('id:')) 
    {
        id = id.replace('id:', '');
    }
    if (!id) {
        return res.status(400).json({ message: 'Category ID is required' });
    }
    try{
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
    }
    catch(err)
    {
        res.status(500).json({ message: 'Error deleting category', err });
    }
} );
module.exports = router;

