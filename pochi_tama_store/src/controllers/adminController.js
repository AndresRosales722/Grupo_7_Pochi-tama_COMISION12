const fs = require("fs");
const path = require("path");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = require("sequelize");

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const ProductImages = db.ProductImage;

let controller = {
  all: (req, res) => {
    Subcategories.findAll()
    .then((subcategories) => {
      res.render("products/productsV2", {
        subcategories,
        toThousand,
        session: req.session,
      });
    });
  },

  add: (req, res) => {
    let allCategories = Categories.findAll();
    let allSubcategories = Subcategories.findAll();
    Promise.all([allCategories, allSubcategories]).then(
      ([categories, subcategories]) => {
        res.render("admin/products/productCreate", {
          categories,
          subcategories,
          session: req.session,
        });
      }
    );
  },

  create: (req, res) => {
    let errors = validationResult(req);
    let arrayImages = [];
    if (req.files) {
      req.files.forEach((image) => {
        arrayImages.push(image.filename);
      });
    }

    if (errors.isEmpty()) {
      const { name, price, category, subcategory, description, discount } =
        req.body;

      Products.create({
        name,
        price,
        description,
        discount,
        subcategory_id: subcategory,
      })
        .then((product) => {
          if (arrayImages.length > 0) {
            let images = arrayImages.map((image) => {
              return {
                image: image,
                product_id: product.id,
              };
            });
            ProductImages.bulkCreate(images)
              .then(() => res.redirect("/admin"))
              .catch((error) => console.log(error));
          } else {
            ProductImages.create({
              image: "default-image.jpg",
              product_id: product.id,
            })
              .then(() => {
                res.redirect("/admin");
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    } else {
      errors = errors.mapped()
            if(req.fileValidationError) {
                //console.log(req.fileValidationError)
                errors = {
                    ...errors,
                    image : {
                        msg: req.fileValidationError
                    }
                }
            }
      let allCategories = Categories.findAll();
      let allSubcategories = Subcategories.findAll();
      Promise.all([allCategories, allSubcategories])
        .then(([categories, subcategories]) => {
          res.render("admin/products/productCreate", {
            categories,
            subcategories,
            errors,
            old: req.body,
            session: req.session,
          });
        })
        .catch((error) => console.log(error));
    }
  },

  edit: (req, res) => {
    let productId = Number(req.params.id);
    const productPromise = Products.findByPk(productId,{
        include: [{association: 'subcategories'}]
    });
    const categoriesPromise = Categories.findAll();
    const subcategoriesPromise = Subcategories.findAll();
    Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
      .then(([product, categories, subcategories]) => {
        /*  res.send(product) */
        res.render("admin/products/ProductEdit", {
          product,
          categories,
          subcategories,
          session: req.session,
        });
      })
      .catch((error) => console.log(error));
  },

  update: (req, res) => {
    let errors = validationResult(req);
    /* console.log(req.files); */

    if (errors.isEmpty()) {
      let arrayImages = [];
      if (req.files) {
        req.files.forEach((image) => {
          arrayImages.push(image.filename);
        });
      }

      const { name, price, category, subcategory, description, discount } =
        req.body;
      Products.update(
        {
          name,
          price,
          description,
          discount,
          subcategory_id: subcategory,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((result) => {
        console.log(arrayImages.length);
        if (arrayImages.length > 0) {
          ProductImages.findAll({
            where: {
              product_id: req.params.id,
            },
          }).then((image) => {
            console.log('AAAAAAAAAAAAAAAAAAA');
            /* res.send(image) */
             image.forEach(item => {
               /* console.log(item); */
               fs.existsSync(
                "./public/img/products/",item.image && item.image !== "default-image.jpg")
                ? fs.unlinkSync(`./public/img/products/${item.image}`)
                : console.log("No se encontro el archivo");
            }) 
            ProductImages.destroy({
              where: {
                product_id: +req.params.id,
              },
            })
              .then(() => {
                let images = arrayImages.map((image) => {
                  return {
                    image: image,
                    product_id: +req.params.id,
                  };
                });
                ProductImages.bulkCreate(images)
                  .then(() => res.redirect("/admin"))
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          });
        } else {
          res.redirect("/admin");
        }
      });
    } else {
      let productId = Number(req.params.id);
      const productPromise = Products.findByPk(productId);
      const categoriesPromise = Categories.findAll();
      const subcategoriesPromise = Subcategories.findAll();
      Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories]) => {
          res.render("admin/products/ProductEdit", {
            product,
            categories,
            subcategories,
            errors: errors.mapped(),
            old: req.body,
            session: req.session,
          });
        })
        .catch((error) => console.log(error));
    }
  },

  destroy: (req, res) => {
    ProductImages.findAll({
      where: {
        product_id: req.params.id,
      },
    })
      .then((images) => {
        images.forEach((image) => {
          fs.existsSync("./public/img/products/", image.image)
            ? fs.unlinkSync(`${"./public/img/products/"}${image.image}`)
            : console.log("No se encontro el archivo");
        });
        ProductImages.destroy({
          where: {
            product_id: req.params.id,
          },
        })
          .then((result) => {
            Products.destroy({
              where: {
                id: req.params.id,
              },
            })
              .then(res.redirect("/admin"))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
};

module.exports = controller;
