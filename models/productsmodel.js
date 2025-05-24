const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true,
    },  
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
    
    },
    category:{
        type:String,
        
    },
    image:{
        type:String,

    },  
    rating:{
        type:Number,
        
    },
    stock:{
        type:Number,
        
    },
    //reviews is a array of objects username and review and rating and optional
    reviews:[{
        username:{
            type:String,
            required:true,
        },
        review:{
            type:String,
            
        },
        rating:{
            type:Number,
    
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },

},{
    collection:'products',
    timestamps:true
});
const productmodel=mongoose.model('products',productSchema);  
module.exports=productmodel;