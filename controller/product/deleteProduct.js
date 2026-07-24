const Product=require("../../models/product.model");

const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}
module.exports=deleteProduct