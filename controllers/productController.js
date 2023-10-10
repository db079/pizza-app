const baseModele = require('../modles/product/baseModels');
const categoryModels = require('../modles/categoryModels');
const sauceModels = require('../modles/product/sauceModels');
const cheeseModels = require('../modles/product/cheeseModels');
const vegiesModels = require('../modles/product/vegiesModels');
const productModels = require('../modles/product/productModels');
const slugify = require('slugify');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const app = express();
app.use(express.json());


//  ================ pizza base ==================//
// create base
const creatBaseController = async (req,res)=>{
    try {
        const {name,price,qty} = req.body

        switch(true){
             case !name:
                return res.status(500).send({success:false,message:"Name is required"});
             case !price:
                return res.status(500).send({success:false,message:"Price is required"});
             case !qty:
                return res.status(500).send({success:false,message:"quantity is required"});
            }
         const existingBase = await baseModele.findOne({name});
         if(existingBase){
            return res.status(200).send({
               success: false,
               message: "Base Already Exisits",
            });
         }
        const base = new baseModele({
            name,
            slug:slugify(name),
            price,
            quantityAvailable:qty 
         });
         await base.save();
         res.status(201).send({
         success: true,
         message: "Base Created Successfully",
         base,
    });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in create base",
            error
        })
    }
}

// get base
const getBaseController = async (req, res) => {
   try {
     const base = await baseModele.find({});
     res.status(200).send({
       success: true,
       message: "All pizza base List",
       base,
     });
   } catch (error) {
     res.status(500).send({
       success: false,
       error,
       message: "Error while getting all base",
     });
   }
 };

// single base
const singleBaseController = async (req, res) => {
   try {
      const name = req.params.name;
     const category = await baseModele.findOne({slug:slugify(name)});
     res.status(200).send({
       success: true,
       message: "Get SIngle Base SUccessfully",
       category,
     });
   } catch (error) {
     res.status(500).send({
       success: false,
       error,
       message: "Error While getting Single base",
     });
   }
 };

// delete Base
const deleteBaseController = async (req, res) => {
   try {
    const { id } = req.params;
     const result = await baseModele.findByIdAndDelete(id);

     if (result) {
       res.status(200).send({
         success: true,
         message: "Base deleted successfully",
       });
     } else {
       res.status(404).send({
         success: false,
         message: "Base not found",
       });
     }
   } catch (error) {
     res.status(500).send({
       success: false,
       message: "error while deleting Base",
       error,
     });
   }
 };
// update
const updateBaseController = async (req, res) => {
  try {
    const { name, price, qty } = req.body;
    const { id } = req.params;

    const updateFields = {};

    if (name) {
     updateFields.name = name;
    }
    if (price) {
     updateFields.price = price;
    }
    if (qty) {
     updateFields.quantityAvailable = qty;
    }

    if (Object.keys(updateFields).length === 0) {
     // No valid fields to update
     res.status(400).send({
       success: false,
       message: "No valid fields provided for update"
     });
     return;
    }

    let slug = slugify(name);
    updateFields.slug = slug;
    const updatedBase = await baseModele.findByIdAndUpdate(id, updateFields, { new: true });
    res.status(200).send({
       success: true,
       message: "Base Updated Successfully",
       base: updatedBase
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error
    });
  }
};

// single base by id
const singleBaseByIdController = async (req, res) => {
  try {
     const base = req.params.base;
    const category = await baseModele.findOne({_id:base});
    res.status(200).send({
      success: true,
      message: "Get SIngle Base SUccessfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single base",
    });
  }
};


//  ================ sausce  ==================//

const  createSauceController = async (req,res)=>{
  try {
      const {name,price,qty} = req.body

      switch(true){
           case !name:
              return res.status(500).send({success:false,message:"Name is required"});
           case !price:
              return res.status(500).send({success:false,message:"Price is required"});
           case !qty:
              return res.status(500).send({success:false,message:"quantityAvailable is required"});
          }
       const existingBase = await sauceModels.findOne({name});
       if(existingBase){
          return res.status(200).send({
             success: false,
             message: "Sauce Already Exisits",
          });
       }
      const sauce = new sauceModels({
          name,
          slug:slugify(name),
          price,
          quantityAvailable:qty 
       });
       await sauce.save();
       res.status(201).send({
       success: true,
       message: "Sauce Created Successfully",
       sauce,
  });
  } catch (error) {
      res.status(500).send({
          success:false,
          message:"error in create sauce",
          error
      })
  }
}

// get base
const getSauceController = async (req, res) => {
 try {
   const sauce = await sauceModels.find({});
   res.status(200).send({
     success: true,
     message: "All pizza sauce List",
     sauce,
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     error,
     message: "Error while getting all sauces",
   });
 }
};

// single base
const singleSauceController = async (req, res) => {
 try {
    const name = req.params.name;
   const category = await sauceModels.findOne({slug:slugify(name)});
   res.status(200).send({
     success: true,
     message: "Get Single suace Successfully",
     category,
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     error,
     message: "Error While getting Single Sauce",
   });
 }
};

// delete Base
const deleteSauceController = async (req, res) => {
 try {
   const { id } = req.params;
   await sauceModels.findByIdAndDelete(id);
   res.status(200).send({
     success: true,
     message: "Sauce Deleted Successfully",
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     message: "error while deleting Sauce",
     error,
   });
 }
};
// update
const updateSauceController = async (req, res) => {
  try {
    const { name, price, qty } = req.body;
    const { id } = req.params;

    const updateFields = {};

    if (name) {
     updateFields.name = name;
    }
    if (price) {
     updateFields.price = price;
    }
    if (qty) {
     updateFields.quantityAvailable = qty;
    }

    if (Object.keys(updateFields).length === 0) {
     // No valid fields to update
     res.status(400).send({
       success: false,
       message: "No valid fields provided for update"
     });
     return;
    }

    let slug = slugify(name);
    updateFields.slug = slug;
    const updatedBase = await sauceModels.findByIdAndUpdate(id, updateFields, { new: true });
    res.status(200).send({
       success: true,
       message: "Sauce Updated Successfully",
       base: updatedBase
    });

  }  catch (error) {
   res.status(500).send({
     success: false,
     message: "Error while updating sauce",
     error
   });
 }
};

//  ================ cheese  ==================//

const  createCheeseController = async (req,res)=>{
  try {
      const {name,price,qty} = req.body

      switch(true){
           case !name:
              return res.status(500).send({success:false,message:"Name is required"});
           case !price:
              return res.status(500).send({success:false,message:"Price is required"});
           case !qty:
              return res.status(500).send({success:false,message:"quantityAvailable is required"});
          }
       const existingBase = await cheeseModels.findOne({name});
       if(existingBase){
          return res.status(200).send({
             success: false,
             message: "cheese Already Exisits",
          });
       }
      const cheese = new cheeseModels({
          name,
          slug:slugify(name),
          price,
          quantityAvailable:qty 
       });
       await cheese.save();
       res.status(201).send({
       success: true,
       message: "cheese Created Successfully",
       cheese,
  });
  } catch (error) {
      res.status(500).send({
          success:false,
          message:"error in create sauce",
          error
      })
  }
}

// get cheese
const getCheeseController = async (req, res) => {
 try {
   const cheese = await cheeseModels.find({});
   res.status(200).send({
     success: true,
     message: "All pizza cheese List",
     cheese,
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     error,
     message: "Error while getting all cheese",
   });
 }
};

// single cheese
const singleCheeseController = async (req, res) => {
 try {
    const name = req.params.name;
   const cheese = await cheeseModels.findOne({slug:slugify(name)});
   res.status(200).send({
     success: true,
     message: "Get Single cheese Successfully",
     cheese,
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     error,
     message: "Error While getting Single cheese",
   });
 }
};

// delete cheese
const deleteCheeseController = async (req, res) => {
 try {
   const { id } = req.params;
   await cheeseModels.findByIdAndDelete(id);
   res.status(200).send({
     success: true,
     message: "cheese Deleted Successfully",
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     message: "error while deleting cheese",
     error,
   });
 }
};
// update cheese
const updateCheeseController = async (req, res) => {
  try {
    const { name, price, qty } = req.body;
    const { id } = req.params;

    const updateFields = {};

    if (name) {
     updateFields.name = name;
    }
    if (price) {
     updateFields.price = price;
    }
    if (qty) {
     updateFields.quantityAvailable = qty;
    }

    if (Object.keys(updateFields).length === 0) {
     // No valid fields to update
     res.status(400).send({
       success: false,
       message: "No valid fields provided for update"
     });
     return;
    }

    let slug = slugify(name);
    updateFields.slug = slug;
    const updatedBase = await cheeseModels.findByIdAndUpdate(id, updateFields, { new: true });
    res.status(200).send({
       success: true,
       message: "Cheese Updated Successfully",
       base: updatedBase
    });

  } catch (error) {
   res.status(500).send({
     success: false,
     message: "Error while updating cheese",
     error
   });
 }
};


//  ================ veggies  ================== //

const  createVeggiesController = async (req,res)=>{
  try {
      const {name,price,qty} = req.body

      switch(true){
           case !name:
              return res.status(500).send({success:false,message:"Name is required"});
           case !price:
              return res.status(500).send({success:false,message:"Price is required"});
           case !qty:
              return res.status(500).send({success:false,message:"quantityAvailable is required"});
          }
       const existingBase = await vegiesModels.findOne({name});
       if(existingBase){
          return res.status(200).send({
             success: false,
             messag:"Veggies Already Exisits",
          });
       }
      const veggies = new vegiesModels({
          name,
          slug:slugify(name),
          price,
          quantityAvailable:qty 
       });
       await veggies.save();
       res.status(201).send({
       success: true,
       message: "Veggies Created Successfully",
       veggies,
  });
  } catch (error) {
      res.status(500).send({
          success:false,
          message:"error in create Veggies",
          error
      })
  }
}

// get base
const getVeggiesController = async (req, res) => {
 try {
   const veggies = await vegiesModels.find({});
   res.status(200).send({
     success: true,
     message: "All pizza veggies List",
     veggies,
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     error,
     message: "Error while getting all sveggies",
   });
 }
};

// single base
const singleVeggiesController = async (req, res) => {
 try {
    const name = req.params.name;
   const veggies = await vegiesModels.findOne({slug:slugify(name)});
   res.status(200).send({
     success: true,
     message: "Get Single Veggies Successfully",
     veggies,
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     error,
     message: "Error While getting Single Veggies",
   });
 }
};

// delete Base
const deleteVeggiesController = async (req, res) => {
 try {
   const { id } = req.params;
   await vegiesModels.findByIdAndDelete(id);
   res.status(200).send({
     success: true,
     message: "Veggies Deleted Successfully",
   });
 } catch (error) {
   res.status(500).send({
     success: false,
     message: "error while deleting Veggies",
     error,
   });
 }
};
// update
const updateVeggiesController = async (req, res) => {
  try {
    const { name, price, qty } = req.body;
    const { id } = req.params;

    const updateFields = {};

    if (name) {
     updateFields.name = name;
    }
    if (price) {
     updateFields.price = price;
    }
    if (qty) {
     updateFields.quantityAvailable = qty;
    }

    if (Object.keys(updateFields).length === 0) {
     // No valid fields to update
     res.status(400).send({
       success: false,
       message: "No valid fields provided for update"
     });
     return;
    }

    let slug = slugify(name);
    updateFields.slug = slug;
    const updatedBase = await vegiesModels.findByIdAndUpdate(id, updateFields, { new: true });
    res.status(200).send({
       success: true,
       message: "veggies Updated Successfully",
       base: updatedBase
    });

  } catch (error) {
   res.status(500).send({
     success: false,
     message: "Error while updating veggies",
     error
   });
 }
};

// ==================================== PRODUCT ============================================//
// create product 
const createProductController = async (req,res)=>{
  try {
    let {name,category,description,base,sauce,cheese,veggies,price,quantity} = req.body;
    let photo = req.file.filename;
   

    switch(true){
         case !name:
            return res.status(500).send({success:false,message:"Name is required"});
         case !category:
            return res.status(500).send({success:false,message:"category is required"});
         case !description:
            return res.status(500).send({success:false,message:"description is required"});
         case !base:
            return res.status(500).send({success:false,message:"base is required"});
         case !sauce:
            return res.status(500).send({success:false,message:"sauce is required"});
         case !cheese:
            return res.status(500).send({success:false,message:"cheese is required"});
         case !veggies:
            return res.status(500).send({success:false,message:"veggies is required"});
         case !price:
            return res.status(500).send({success:false,message:"price is required"});
         case !quantity:
            return res.status(500).send({success:false,message:"quantity is required"});
          case photo && photo.size > 1000000:
            return res.status(500).send({success:false,message:"photo size is less than 1mb"});
        }
    
      if(photo)
      {
        const products = new productModels({ 
        ...req.body,slug: slugify(name),
        photo:photo,
      });
      await products.save();
      await products.save();res.status(201).send({
        success:true,
        products,
        message:"product created successfully"
      });
      }
      else{
        const products = new productModels({ 
          name,slug:slugify(name),category,description,base,sauce,cheese,veggies,price,quantity
        });
        await products.save();
        res.status(201).send({
          success:true,
          products,
          message:"product created successfully"
        })
      }   
  } catch (error) {
    res.status(500).send({
      success:false,
      error
    })
  }
}

// get all product

const getProductController = async (req, res) => {
  try {
    const product = await productModels.find({}).populate("category").populate("base").populate("sauce").populate("cheese");
    res.status(200).send({
      success: true,
      countTotal:product.length,
      message: "All product",
      product,
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all product",
    });
  }
};

// get single product 

const getSingleProductController = async (req,res)=>{
  try {
    const product = await productModels.findOne({slug:req.params.slug}).populate("category").populate("base").populate("sauce").populate("cheese");
    res.status(200).send({
      success: true,
      message: "product found",
      product
    })
  } catch (error) {
    
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single product",
    })
  }
}
// delete product

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product  = await productModels.findById({_id:id});
    const filePath = './uploads/'+product.photo;
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting file' });
            }
          });
          await productModels.findByIdAndDelete(id);
          res.status(200).send({
            success: true,
            message: "product Deleted Successfully",
          });
      
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "error while deleting product",
      error,
    });
  }
 };

// update product
const updateProductController = async (req ,res)=>{
  try {
    const id = req.params.id;
    const {name,category,description,base,sauce,cheese,veggies,price,quantity} = req.body;
    const photo = req.file;

    switch(true){
         case !veggies:
            return res.status(500).send({success:false,message:"veggies is required"});
        }
        const products = await productModels.findByIdAndUpdate(id,
          { ...req.body, slug:slugify(name)},{new:true});
          res.status(201).send({
            success:true,
            products,
            message:"product updated successfully"
        });
      
  } catch (error) {
    
    res.status(500).send({
      success:false,
      message:"Error in update filter",
      error
    })
  }
}

const productFilterController = async (req,res)=>{
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModels.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    
    res.status(400).send({
      success:false,
      message:"Error in filtering",
      error
    })
  }
}

const productCountController = async (req,res)=>{
  try {
    const total = await productModels.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    
    res.status(400).send({
      success:false,
      message:"Error in filtering",
      error
    })
  }
}

const productListController = async (req,res)=>{
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModels
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    
    res.status(400).send({
      success:false,
      message:"Error in page loading",
      error
    })
  }
}

const relatedProductController = async (req,res)=>{
  try {
    const { pid, cid } = req.params;
    const products = await productModels
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .limit(3)
      .populate("category");
      res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
}

const productCategoryController = async (req,res)=>{
  try {
    const category = await categoryModels.findOne({ slug: req.params.slug });
    const products = await productModels.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    
    res.status(400).send({
      success: false,
      message: "cannot able to find product category wise",
      error,
    });
  }
}
module.exports = {creatBaseController,updateBaseController,deleteBaseController,singleBaseController,getBaseController,createSauceController,updateSauceController,deleteSauceController,singleSauceController,getSauceController,  createCheeseController,updateCheeseController,deleteCheeseController,singleCheeseController,getCheeseController,  
  createVeggiesController,updateVeggiesController,deleteVeggiesController,singleVeggiesController,getVeggiesController, createProductController,getProductController,getSingleProductController,deleteProductController,updateProductController,productFilterController,productCountController,productListController,relatedProductController,productCategoryController,singleBaseByIdController};