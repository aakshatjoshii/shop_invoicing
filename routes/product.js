var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var User = require("../models/user");

router.get("/products",function(req,res){
	Product.find({},function(err,products){
		if(err){
			req.flash("error","Something went wrong!!");
			res.redirect("/products");
		} else {
			res.render("products/index",{products:products});
		}
	});
});

router.get("/products/new",isAdmin,function(req,res){
	res.render("products/new");
});

router.post("/products",isAdmin,function(req,res){
	req.body.product.discount = req.body.product.price - req.body.product.mrp;
	req.body.product.disc_perc = Math.round(((req.body.product.price-req.body.product.mrp)*100)/req.body.product.mrp);
	Product.create(req.body.product,function(err,product){
		if(err){
			req.flash("error","Something went wrong!!");
			res.redirect("/products");
		} else {
			req.flash("success","Product added!!");
			res.redirect("/products");
		}
	});
});

router.get("/products/:id",function(req,res){
	Product.findById(req.params.id).populate("reviews").exec(function(err,product){
		if(err || !product) {
			req.flash("error","Product not found!!");
			res.redirect("/products");
		} else {
			res.render("products/show",{product: product});
		}
	});
});

router.get("/products/:id/edit",isAdmin,function(req,res){
	Product.findById(req.params.id,function(err,product){
		if(err || !product) {
			req.flash("error","Product not found!!");
			res.redirect("/products");
		} else {
			res.render("products/edit",{product: product});
		}
	});
});

router.put("/products/:id",isAdmin,function(req,res){
	req.body.product.discount = req.body.product.price-req.body.product.mrp;
	req.body.product.disc_perc = Math.round(((req.body.product.price-req.body.product.mrp)*100)/req.body.product.mrp);
	Product.findById(req.params.id,function(err,product) {
		if(err || !product) {
			req.flash("error","Product not found!!");
			res.redirect("/products");
		} else {
			User.find({},function(err,users) {
				if(err) {
					req.flash("error","Something went wrong!!");
					res.redirect("/products");
				} else {
					users.forEach(function(user) {
						for (var i = user.cart.items.length - 1; i >= 0; i--) {
							if(user.cart.items[i].product._id.equals(req.params.id)) {
								user.cart.cart_total+=((req.body.product.mrp-product.mrp)*user.cart.items[i].qty);
								user.cart.discount+=((req.body.product.discount-product.discount)*user.cart.items[i].qty);
								user.cart.total+=((req.body.product.price-product.price)*user.cart.items[i].qty);
								break;
							}
						}
						user.save();
					});
				}
			});
		}
	});
	Product.findByIdAndUpdate(req.params.id,req.body.product,function(err,product){
		if(err || !product) {
			req.flash("error","Product not found!!");
			res.redirect("/products");
		} else {
			req.flash("success","Product edited!!");
			res.redirect("/products/" + product._id);
		}
	});
});

router.delete("/products/:id",isAdmin,function(req,res){
	Product.findById(req.params.id,function(err,product) {
		if(err || !product) {
			req.flash("error","Product not found!!");
			res.redirect("/products");
		} else {
			User.find({},function(err,users) {
				if(err) {
					req.flash("error","Something went wrong!!");
					res.redirect("/products");
				} else {
					users.forEach(function(user) {
						for (var i = user.cart.items.length - 1; i >= 0; i--) {
							if(user.cart.items[i].product._id.equals(req.params.id)) {
								user.cart.cart_total-=(product.mrp*user.cart.items[i].qty);
								user.cart.discount-=(product.discount*user.cart.items[i].qty);
								user.cart.total-=(product.total*user.cart.items[i].qty);
								user.cart.items.splice(i,1);
								break;
							}
						}
						user.save();
					});
				}
			});
		}
	});
	Product.findByIdAndRemove(req.params.id,function(err){
		if(err) {
			req.flash("error","Something went wrong!!");
			res.redirect("/products");
		} else {
			req.flash("success","Product removed!!");
			res.redirect("/products");
		}
	});
});

function isAdmin(req,res,next) {
	if(req.isAuthenticated()) {
		if(req.user.username=='admin') {
			next();
		} else {
			req.flash("error","Permission Denied!!");
			res.redirect("/products");
		}
	} else {
		req.flash("error","Login to continue!!");
		res.redirect("/login");
	}
}

module.exports = router;