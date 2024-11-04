const mongoose = require('mongoose');
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const CategoryScheme = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    slug: {
        type:String,
        unique:true,
        lowarcase: true,
    },
    description:{
        type:String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    popular:{
        type:Boolean,
        default:true
    },
    createdAt :{
        type: Date,
        default: Date.now
    },
    updatedAt :{
        type: Date,
        default: Date.now
    }
});

CategoryScheme.pre('save',function(next){
    this.slug = slugify(this.name);
    this.updatedAt = Date.now();
    next();
});
const Category = mongoose.model('Category', CategoryScheme);


module.exports = Category;