const Product=require("../../models/product.model");
const Joi=require("joi");

//Validation 
const validateCreateProduct=(data)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required()
    });

    return schema.validate(data,{
        convert:false,
    });
};

const createProduct=async(req,res)=>{

    try{

        const {error}=validateCreateProduct(req.body);

        if(error){
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            });
        }

        const product=await Product.create(req.body);

        res.status(201).json({
            success:true,
            message:"User created successfully",
            data:product
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};