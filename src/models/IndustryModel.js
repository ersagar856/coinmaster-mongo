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

const IndustryScheme = new mongoose.Schema({
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
    popular:{
        type:Boolean,
        default:true
    },
    isActive: {
        type: Boolean,
        default: true
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

IndustryScheme.pre('save',function(next){
    this.slug = slugify(this.name);
    this.updatedAt = Date.now();
    next();
});
const Industry = mongoose.model('Industry', IndustryScheme);


module.exports = Industry;