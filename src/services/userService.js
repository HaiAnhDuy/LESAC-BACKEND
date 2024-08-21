import db from '../models/index.js'
import bcrypt from 'bcryptjs';
// import { raw } from 'body-parser';
import _ from 'lodash';
import { and, where } from 'sequelize';
import EmailService from './EmailService'
import SimpleSendEmail from './EmailService.js'
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
let handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!email || !password) {
                resolve({
                    errCode: 1,
                    message: 'Missing email or password !'
                })
            }
            else {
                let userData = {}
                let check_email = await CheckUserName(email);
                if (check_email === true) {
                    let check_password = await CheckPassword(email, password)
                    if (check_password) {
                        userData.errCode = 0;
                        userData.message = `successed`;
                        delete check_password.password;
                        userData.user = check_password;

                        resolve(userData)
                    }
                    else {
                        resolve({
                            errCode: 2,
                            message: `Your Password is wrong !`
                        })
                    }
                }
                else {
                    resolve({
                        errCode: 2,
                        message: `Your Accout isn't exits`
                    })
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

let CheckPassword = (Email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                attributes: ['id', 'email', 'roleId', 'password', 'fullName',],
                where: { email: Email },
                raw: true

            })
            if (data) {
                await bcrypt.compare(password, data.password, function (err, res) {
                    if (err) {
                        resolve(err)
                    }
                    if (res) {
                        resolve(true && data)
                    } else {
                        // response is OutgoingMessage object that server response http request
                        resolve(false)
                    }
                });
            }
            else {
                resolve()
            }

        } catch (e) {
            reject(e);
        }
    })
}

let CheckUserName = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let email_check = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if (email_check) {
                resolve(true)
            }
            else {
                resolve(false)

            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let GetAllArrayGenderAndRoleService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data_array_gender = await db.Allcode.findAll({
                where: {
                    type: 'GENDER'
                }
            })

            let data_array_role = await db.Allcode.findAll({
                where: {
                    type: 'ROLE'
                }
            })

            if (data_array_gender && data_array_role) {
                resolve({
                    errCode: 0,
                    message: 'Get Array Gender And Role Ok !',
                    data_array_gender: data_array_gender,

                    data_array_role: data_array_role

                })
            }

        }
        catch (e) {
            reject(e)
        }
    })
}

let SaveDataManagerUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.email || !data.password || !data.fullName || !data.address || !data.phonenumber) {
                resolve({
                    errCode: 1,
                    message: 'Missing data important !'
                })
            }

            else {
                let passwordafter = await PasswordHashByScrypt(data.password)
                let check = await db.User.create({
                    email: data.email,
                    password: passwordafter,
                    fullName: data.fullName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                    image: data.image,
                })
                resolve({
                    errCode: 0,
                    message: 'Save Succsess !'
                })
            }



        }
        catch (e) {
            reject(e)
        }
    })
}

let PasswordHashByScrypt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let GetActiveAllcodesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data_active = await db.Allcode.findAll({
                where: { type: 'ACTIVE' }
            })
            resolve({
                errCode: 0,
                message: 'OK',
                data: data_active
            })
        } catch (e) {
            reject(e);
        }
    })
}

let SaveDataCategoriesService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name_categories || !data.image) {
                resolve({
                    errCode: 1,
                    message: 'Missing'
                })
            }
            else {
                let data_categories = await db.Categories.create({
                    name_categories: data.name_categories,
                    image: data.image,
                    activeId: data.activeId
                })
                resolve({
                    errCode: 0,
                    message: 'Save OK',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let GetAllDataUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let data_user = await db.User.findAll({

                include: [
                    { model: db.Allcode, as: 'GenderData', attributes: ['valueVi'] },
                    { model: db.Allcode, as: 'RoleData', attributes: ['valueVi'] },
                ]
            })
            resolve({
                errCode: 0,
                message: 'Get data OK',
                data: data_user
            })


        } catch (e) {
            reject(e);
        }
    })
}

let GetDataUserByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data_user_by_id = await db.User.findOne({

                where: { id: id }
            })
            resolve({
                errCode: 0,
                message: 'Get data OK',
                data: data_user_by_id
            })


        } catch (e) {
            reject(e);
        }
    })
}

let UpdateDataUserByIdService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let update_user_by_id = await db.User.update({
                email: data.email,
                fullName: data.fullName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId



            },
                { where: { id: data.id } }
            )
            resolve({
                errCode: 0,
                message: 'Update data OK',
            })


        } catch (e) {
            reject(e);
        }
    })
}

let DeleteDataUserByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let delete_user_by_id = await db.User.destroy({
                where: { id: id }


            })
            resolve({
                errCode: 0,
                message: 'Delete data OK',
            })


        } catch (e) {
            reject(e);
        }
    })
}

let GetAllDataCategoriesService = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let all_data_categories = await db.Categories.findAll({
                where: { id: [4, 9, 15, 16] },
                include: [
                    { model: db.Allcode, as: 'ActiveData', attributes: ['valueVi'] },
                ]

            })
            resolve({
                errCode: 0,
                message: 'data categories OK',
                data: all_data_categories
            })


        } catch (e) {
            reject(e);
        }
    })
}
let GetDataCategoriesByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing id',
                })
            }
            let data_categories_by_id = await db.Categories.findOne({
                where: { id: id },


            })
            resolve({
                errCode: 0,
                message: 'data categories by id OK',
                data: data_categories_by_id
            })


        } catch (e) {
            reject(e);
        }
    })
}
let UpdateDataCategoriesByIdService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let update_data_categories_by_id = await db.Categories.update({
                name_categories: data.name_categories,
                image: data.image,
                activeId: data.activeId



            }, {
                where: { id: data.id }
            })
            // if (data.image) {
            //     await db.Categories.update({
            //         name_categories: data.name_categories,
            //         image: data.image,
            //         activeId: data.activeId



            //     }, {
            //         where: { id: data.id }
            //     })
            // }
            resolve({
                errCode: 0,
                message: 'update data categories by id OK',
            })


        } catch (e) {
            reject(e);
        }
    })
}
let DeleteDataCategoriesByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let delete_user_by_id = await db.Categories.destroy({
                where: { id: id }


            })
            resolve({
                errCode: 0,
                message: 'Delete data OK',
            })


        } catch (e) {
            reject(e);
        }
    })
}

let GetAllDataDiscountLastColorService = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let all_data_discount = await db.Allcode.findAll({
                where: { type: 'DISCOUNT' }


            })
            let all_data_color = await db.Allcode.findAll({
                where: { type: 'COLOR' },


            })
            let all_data_last = await db.Allcode.findAll({
                where: { type: 'LAST' }
            })
            resolve({
                errCode: 0,
                message: 'data OK',
                data_discount: all_data_discount,
                data_color: all_data_color,
                data_last: all_data_last
            })


        } catch (e) {
            reject(e);
        }
    })
}
let SaveDataProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            if (!data.id_categories || !data.price || !data.discount ||
                !data.quantity || !data.activeId || !data.lastId || !data.name_product
            ) {
                resolve({
                    errCode: 1,
                    message: 'You missing something',
                })
            } else {
                let price = data.price;
                let quantity = data.quantity;
                let discount = data.discount
                discount = +discount;
                quantity = +quantity;
                price = +price;

                if (price < 0 || quantity < 0) {
                    resolve({
                        errCode: 1,
                        message: 'price or quantity must be a positive integer',
                    })
                } else {

                    let save_data_product = await db.Product.create({
                        name_product: data.name_product,
                        id_categories: data.id_categories,
                        price: price,
                        image: data.image,
                        discount: discount,
                        quantity: quantity,
                        activeId: data.activeId,
                        code_product: data.code_product,

                        lastId: data.lastId

                    })
                    // Tạo 1 table color sau đó chia phần màu sản phẩm và quản lý sản phẩm chung thành 2 trang khác nha để dễ dàng quản lý hơn giống phần schelde đã làm !
                    resolve({
                        errCode: 0,
                        message: 'Save susscess product',
                    })
                }
            }



        } catch (e) {
            reject(e);
        }
    })
}
let GetAllDataProductService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data_product = await db.Product.findAll({
                include: [
                    // { model: db.Color_Product, as: 'ColorData', attributes: ['colorType'] },
                    // { model: db.Image_Product, as: 'ImageData', attributes: ['image'] },
                ],
                raw: true
            })
            resolve({
                errCode: 0,
                message: 'Get All Data Product Succsess',
                data: data_product
            })

        } catch (e) {
            reject(e);
        }
    })
}
let SaveDataColorProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data_new_1 = [];
            data_new_1 = data.ArrColor;
            console.log('data_new_1', data_new_1)
            if (!data_new_1) {
                resolve({
                    errCode: 1,
                    message: 'Missing somthing',

                })
            }
            else {
                let obj = [];
                let data = ''
                if (data_new_1 && data_new_1.length > 0) {
                    data_new_1.map((items, index) => {
                        let id_product = items.id_product;
                        let colorType = items.value;
                        data = { code: items.code, id_product: id_product, colorType: colorType }
                        obj.push(data)

                    })
                }

                let id_product = data_new_1[0].id_product;
                let code = data_new_1[0].code
                let data_new_2 = await db.Color_Product.findAll({
                    where: { id_product: id_product, code: code },
                    attributes: ['code', 'id_product', 'colorType'],
                    raw: false
                })
                console.log('compare', data_new_2, obj);
                let toCreate = _.differenceWith(obj, data_new_2, (a, b) => {
                    return a.id_product === b.id_product && a.colorType === b.colorType && a.code === b.code
                })
                if (toCreate && toCreate.length > 0) {
                    await db.Color_Product.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    message: 'Success color ',

                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let SaveDataImageroductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data_new_1 = [];
            data_new_1 = data.ArrImg;
            console.log('data_new_1', data.id_product)

            if (!data_new_1) {
                resolve({
                    errCode: 1,
                    message: 'Missing somthing',

                })
            }
            else {
                let obj = [];
                let data_test = '';
                let id_product_2 = '';
                if (data_new_1 && data_new_1.length > 0) {
                    data_new_1.map((items, index) => {
                        id_product_2 = data.id_product;
                        let image = items;
                        data_test = { id_product: id_product_2, image: image }
                        obj.push(data_test)

                    })
                }

                let id_product = data.id_product;
                let data_new_2 = await db.Image_Product.findAll({
                    where: { id_product: id_product },
                    attributes: ['id_product', 'image'],
                    raw: true
                })
                console.log('compare', data_new_2, obj);
                let toCreate = _.differenceWith(obj, data_new_2, (a, b) => {
                    return a.id_product === b.id_product && a.image === b.image
                })
                if (toCreate && toCreate.length > 0) {
                    await db.Image_Product.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    message: 'Success image ',

                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let GetDataControllerImageColorService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing Id',
                })
            }
            let data_image = await db.Image_Product.findAll({
                where: { id_product: id },
                attributes: ['id', 'id_product', 'image'],

                raw: true,
                nest: true
            })
            let data_color = await db.Color_Product.findAll({
                where: { id_product: id },
                attributes: ['id', 'id_product', 'colorType'],
                // include: [
                //     { model: db.Allcode, as: 'colorTypeData', attributes: ['valueVi'] },

                // ],

                raw: true,
                nest: true


            })

            resolve({
                errCode: 0,
                message: 'Ok',
                data_image: data_image,
                data_color: data_color
            })

        } catch (e) {
            reject(e);
        }
    })
}
let GetAllDataProductNewService = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let data_product_new = await db.Product.findAll({
                where: {
                    lastId: 'N2',
                    activeId: 'K2'
                },
                attributes: ['id', 'name_product', 'id_categories', 'price', 'discount', 'quantity', 'activeId', 'code_product', 'lastId'],


                raw: true

            })

            let data_full_img = '';
            let data_full_color = '';

            if (data_product_new && data_product_new.length > 0) {
                data_product_new = data_product_new.map(async (items) => {
                    await GetDataControllerImageColorService(items.id).then(data => {
                        data_full_color = data.data_color;
                        data_full_img = data.data_image;
                        // console.log(items.color)
                        // console.log(data_product_new)
                    }).catch(err => {
                        console.log(err);
                    });
                    items.image = data_full_img;
                    items.color = data_full_color
                    return items
                })
                Promise.all(data_product_new).then((values) => {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        data_product_new: values
                    })
                });
            }







        }
        catch (e) {
            reject(e);
        }
    })
}
let GetAllDataCategoriesProductService = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let all_data_categories_product = await db.Categories.findAll();
            resolve({
                errCode: 0,
                message: 'Ok',
                all_data_categories_product: all_data_categories_product
            })







        }
        catch (e) {
            reject(e);
        }
    })
}
let GetAllDataProductCategoriesByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }
            let data_product_by_categories = '';
            if (id === 'ALL') {
                data_product_by_categories = await db.Product.findAll({
                    where: {
                        activeId: 'K2'
                    },
                    attributes: ['id', 'name_product', 'id_categories', 'price', 'discount', 'quantity', 'activeId', 'code_product', 'lastId'],
                    include: [
                        { model: db.Categories, as: 'CategoriesData', attributes: ['name_categories'] },
                    ],


                    raw: true

                })
            } else {
                data_product_by_categories = await db.Product.findAll({
                    where: {
                        id_categories: id,
                        activeId: 'K2'
                    },
                    attributes: ['id', 'name_product', 'id_categories', 'price', 'discount', 'quantity', 'activeId', 'code_product', 'lastId'],
                    include: [
                        { model: db.Categories, as: 'CategoriesData', attributes: ['name_categories'] },
                    ],


                    raw: true

                })
            }
            if (data_product_by_categories) {
                let data_full_img = '';
                let data_full_color = '';

                if (data_product_by_categories && data_product_by_categories.length > 0) {
                    data_product_by_categories = data_product_by_categories.map(async (items) => {
                        await GetDataControllerImageColorService(items.id).then(data => {
                            data_full_color = data.data_color;
                            data_full_img = data.data_image;
                            // console.log(items.color)
                            // console.log(data_product_new)
                        }).catch(err => {
                            console.log(err);
                        });
                        items.image = data_full_img;
                        items.color = data_full_color
                        return items
                    })
                    Promise.all(data_product_by_categories).then((values) => {
                        resolve({
                            errCode: 0,
                            message: 'OK',
                            data_product_by_categories: values
                        })
                    });
                }



                else {
                    resolve({
                        errCode: 2,
                        message: 'Dont have any product',
                    })
                }
            }














        }
        catch (e) {
            reject(e);
        }
    })
}
let GetIdByHexcolorService = (hex) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!hex) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })

            }
            let new_hex = '#' + hex
            console.log('hex', new_hex)
            let get_id = await db.Color_Product.findAll(
                {
                    where: { colorType: new_hex }
                }
            );
            resolve({
                errCode: 0,
                message: 'Ok',
                get_id: get_id
            })







        }
        catch (e) {
            reject(e);
        }
    })
}
let GetAllDataProductColorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }
            let data_product_by_color = '';
            if (id === 'ALL') {
                data_product_by_color = await db.Product.findAll({

                    attributes: ['id', 'name_product', 'id_categories', 'price', 'discount', 'quantity', 'activeId', 'code_product', 'lastId'],
                    include: [
                        { model: db.Markdown, as: 'MarkData', attributes: ['contentHTML'] },
                        { model: db.Allcode, as: 'ActiveData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'LastData', attributes: ['valueVi'] },
                        { model: db.Categories, as: 'CategoriesData', attributes: ['name_categories'] },



                    ],


                    raw: true,
                    nest: true,

                })
            }
            else {
                data_product_by_color = await db.Product.findAll({
                    where: {
                        id: id,
                        activeId: 'K2'
                    },
                    attributes: ['id', 'name_product', 'id_categories', 'price', 'discount', 'quantity', 'activeId', 'code_product', 'lastId'],
                    include: [
                        { model: db.Markdown, as: 'MarkData', attributes: ['contentHTML'] },
                    ],


                    raw: true

                })
            }
            if (data_product_by_color) {
                let data_full_img = '';
                let data_full_color = '';

                if (data_product_by_color && data_product_by_color.length > 0) {
                    data_product_by_color = data_product_by_color.map(async (items) => {
                        await GetDataControllerImageColorService(items.id).then(data => {
                            data_full_color = data.data_color;
                            data_full_img = data.data_image;
                            // console.log(items.color)
                            // console.log(data_product_new)
                        }).catch(err => {
                            console.log(err);
                        });
                        items.image = data_full_img;
                        items.color = data_full_color
                        return items
                    })
                    Promise.all(data_product_by_color).then((values) => {
                        resolve({
                            errCode: 0,
                            message: 'OK',
                            data_product_by_color: values
                        })
                    });
                }



                else {
                    resolve({
                        errCode: 2,
                        message: 'Dont have any product',
                    })
                }
            }
            else {
                resolve({
                    errCode: 2,
                    message: 'Dont have product in this case',
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let GetNameColorByHexService = (hex) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!hex) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }


            let hex_new = '#' + hex;
            let name_color = await db.Allcode.findOne({
                where: { keyMap: hex_new }
            })
            resolve({
                errCode: 0,
                message: 'Ok',
                name_color: name_color
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let SaveDataMarkDownService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id_product || !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }


            else {
                await db.Markdown.create({
                    id_product: data.id_product,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,


                }
                )
                resolve({
                    errCode: 0,
                    message: 'Ok',
                })
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let AddToCartService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id_user || !data.id_product || !data.name_product || !data.image || !data.color || !data.quantity || !data.price || !data.total) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }


            else {
                let color = '#' + data.color
                let check = await CheckDataByIdUserAndProduct(data.id_user, data.id_product, color)
                if (check) {
                    let quantity_befor = check.quantity;
                    let new_quantity = quantity_befor + data.quantity
                    let new_total = (quantity_befor + data.quantity) * data.price;
                    console.log('new_quantity', new_quantity)
                    console.log('new_total', new_total)


                    let updateData = await db.Cart.update({

                        quantity: new_quantity,
                        total: new_total,

                    },
                        {
                            where: {
                                id_user: data.id_user,
                                id_product: data.id_product,
                                color: color
                            }
                            // {
                            //     id_product: data.id_product,
                            // },
                            // {
                            //     color: data.color
                            // }

                        },
                        // {
                        //     where: {
                        //         id_product: data.id_product,

                        //     }
                        // },

                    )
                    resolve({
                        errCode: 0,
                        message: 'Add ok',
                    })
                } else {
                    await db.Cart.create({
                        id_user: data.id_user,
                        id_product: data.id_product,
                        name_product: data.name_product,
                        image: data.image,
                        color: color,
                        quantity: data.quantity,
                        price: data.price,
                        total: data.total,

                    }
                    )
                    resolve({
                        errCode: 0,
                        message: 'Create Ok',
                    })
                }

            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let CheckDataByIdUserAndProduct = async (user_id, id_product, color) => {


    return new Promise(async (resolve, reject) => {
        try {






            let check = await db.Cart.findOne({
                where: {
                    id_user: user_id,
                    id_product: id_product,
                    color: color

                },
                attributes: ['quantity', 'price', 'total'],

                raw: true

            }
            )
            if (check) {
                resolve(true && check)
            }
            else {
                resolve(false)
            }



        }
        catch (e) {
            reject(e);
        }
    })





}


let ShowAllCartByUserIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }


            else {
                let data_cart_by_user_id = await db.Cart.findAll({
                    where: { id_user: id }
                }
                )
                resolve({
                    errCode: 0,
                    message: 'Ok',
                    data_cart_by_user_id: data_cart_by_user_id
                })
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let PlusProductCartService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.id_user || !data.id_product || !data.color) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }


            else {
                let color = '#' + data.color
                let check = await CheckDataByIdUserAndProduct(data.id_user, data.id_product, color);


                if (check) {
                    console.log('check', check)
                    let quantity_befor = check.quantity;
                    quantity_befor = quantity_befor + 1
                    let total = quantity_befor * check.price
                    let updateData = await db.Cart.update({

                        quantity: quantity_befor,
                        total: total,

                    },
                        {
                            where: {
                                id_user: data.id_user,
                                id_product: data.id_product,
                                color: color
                            }


                        },


                    )
                    resolve({
                        errCode: 0,
                        message: 'Ok',
                    })
                }

            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let MinusProductCartService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.id_user || !data.id_product || !data.color) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }


            else {
                let color = '#' + data.color
                let check = await CheckDataByIdUserAndProduct(data.id_user, data.id_product, color);


                if (check) {
                    console.log('check', check)
                    let quantity_befor = check.quantity;
                    quantity_befor = quantity_befor - 1;
                    if (quantity_befor >= 1) {
                        let total = quantity_befor * check.price
                        let updateData = await db.Cart.update({

                            quantity: quantity_befor,
                            total: total,

                        },
                            {
                                where: {
                                    id_user: data.id_user,
                                    id_product: data.id_product,
                                    color: color
                                }


                            },


                        )
                        resolve({
                            errCode: 0,
                            message: 'Ok',
                        })
                    }
                    else {
                        resolve({
                            errCode: 2,
                            message: 'Số lượng phải lớn hơn 1',
                        })
                    }

                }

            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let DeleteByIdProductCartService = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }


            else {
                let delete_user_by_id = await db.Cart.destroy({
                    where: { id: id }


                })
                resolve({
                    errCode: 0,
                    message: 'Delete data OK',
                })




            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let MakeUrlEmail = async (id_user, token) => {



    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&id_user=${id_user}`
    return result
}
let PatientBookingAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data_checkout = data.data_checkout;

            if (data_checkout && data_checkout.length > 0) {
                data_checkout.map((items, index) => {
                    if (!items.email || !items.id_user || !items.id_product || !items.full_address || !items.full_name || !items.phonenumber || !items.ship || !items.state
                    ) {
                        resolve({
                            errCode: 1,
                            message: 'Missing'
                        })
                    }
                })
            }

            let token = uuidv4();
            let url_mail = await MakeUrlEmail(data_checkout[0].id_user, token)
            await SimpleSendEmail({
                data_mail: data_checkout,
                url_verify: url_mail,
            })
            let mail = data_checkout[0].email
            let data_new = await db.User.findOrCreate({
                where: { email: mail },
                defaults: {
                    email: mail,
                    fullName: data_checkout[0].full_name,
                    address: data_checkout[0].full_address,
                    phonenumber: data_checkout[0].phonenumber,
                    roleId: 'R2'
                }
            })
            if (data_new) {
                // let data_new_2 = await db.Booking.findOrCreate({
                //     where: { id_user: data.id_user, id_product: data.id_product, token: token },
                //     defaults: {
                //         status: 'S1',
                //         id_user: data.id_user,
                //         id_product: data.id_product,
                //         token: token,
                //     }
                // })
                let array_input = [];
                if (data_checkout && data_checkout.length > 0) {
                    data_checkout.map((items, index) => {
                        let obj = {};
                        let id_product = items.id_product;
                        let id_user = items.id_user;
                        let status = 'S1';

                        obj.status = status;
                        obj.id_user = id_user;
                        obj.id_product = id_product;
                        obj.token = token
                        array_input.push(obj)

                    })
                }
                await db.Booking.bulkCreate(array_input)

                resolve({
                    errCode: 0,
                    message: 'INSERT OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let VerifyPatientBookingAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id_user || !data.token) {
                resolve({
                    errCode: 1,
                    message: 'Missing'
                })
            }

            else {
                await db.Booking.update({
                    status: 'S2'


                }
                    , { where: { id_user: data.id_user, token: data.token } }
                )
                await db.Cart.destroy({
                    where: {
                        id_user: data.id_user
                    }
                })


                resolve({
                    errCode: 0,
                    message: 'OK'
                })

            }

        }
        catch (e) {
            reject(e)
        }
    })
}
let GetAllDataPriceAllcodeService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allcode_price = await db.Allcode.findAll({
                where: { type: 'PRICE' }
            });
            resolve({
                errCode: 0,
                message: 'OK',
                allcode_price: allcode_price
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let GetDataYouMaybeLikeService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }
            let data_yml = await db.Product.findAll({
                where: { id_categories: id },
                attributes: ['id', 'name_product', 'id_categories', 'price', 'discount', 'quantity', 'activeId', 'code_product', 'lastId'],

                limit: 4,
                raw: true
            });
            if (data_yml) {
                let data_full_img = '';
                let data_full_color = '';

                if (data_yml && data_yml.length > 0) {
                    data_yml = data_yml.map(async (items) => {
                        await GetDataControllerImageColorService(items.id).then(data => {
                            data_full_color = data.data_color;
                            data_full_img = data.data_image;
                            // console.log(items.color)
                            // console.log(data_product_new)
                        }).catch(err => {
                            console.log(err);
                        });
                        items.image = data_full_img;
                        items.color = data_full_color
                        return items
                    })
                    Promise.all(data_yml).then((values) => {
                        resolve({
                            errCode: 0,
                            message: 'OK',
                            data_yml: values
                        })
                    });
                }



                else {
                    resolve({
                        errCode: 2,
                        message: 'Dont have any product',
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let DeleteDataProductIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }
            let delete_product_by_id = await db.Product.destroy({
                where: { id: id },

            });
            resolve({
                errCode: 0,
                message: 'Oki',
            })

        }
        catch (e) {
            reject(e);
        }
    })
}
let UpdateDataProductIdService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }
            let update_data_product_by_id = await db.Product.update({

                price: data.price,
                name_product: data.name_product,
                quality: data.quality,
                lastId: data.lastId,
                discount: data.discountId,
                id_categories: data.id_categories,
                code_product: data.code_product,
                activeId: data.activeId



            }, {
                where: { id: data.id }
            })
            // if (data.image) {
            //     await db.Categories.update({
            //         name_categories: data.name_categories,
            //         image: data.image,
            //         activeId: data.activeId



            //     }, {
            //         where: { id: data.id }
            //     })
            // }
            resolve({
                errCode: 0,
                message: 'update data categories by id OK',
            })
            resolve({
                errCode: 0,
                message: 'Oki',
            })

        }
        catch (e) {
            reject(e);
        }
    })
}
let UpdateDataImageIdService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }
            let update_data_image_by_id = await db.Image_Product.update({
                image: data.image




            }, {
                where: { id: data.id }
            })


            resolve({
                errCode: 0,
                message: 'Oki',
            })

        }
        catch (e) {
            reject(e);
        }
    })
}
let UpdateDataColorIdService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: 'Missing',
                })
            }
            let colorType = data.colorType;
            colorType = '#' + colorType
            let update_data_color_by_id = await db.Color_Product.update({
                colorType: colorType




            }, {
                where: { id: data.id }
            })


            resolve({
                errCode: 0,
                message: 'Oki',
            })

        }
        catch (e) {
            reject(e);
        }
    })
}
let DeleteDataColorIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let delete_color_by_id = await db.Color_Product.destroy({
                where: { id: id }


            })
            resolve({
                errCode: 0,
                message: 'Delete data OK',
            })


        } catch (e) {
            reject(e);
        }
    })
}
let DeleteDataImageIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let delete_image_by_id = await db.Image_Product.destroy({
                where: { id: id }


            })
            resolve({
                errCode: 0,
                message: 'Delete data OK',
            })


        } catch (e) {
            reject(e);
        }
    })
}
export default {
    GetAllArrayGenderAndRoleService, handleLoginService, SaveDataManagerUserService, GetActiveAllcodesService, SaveDataCategoriesService,
    GetAllDataUserService, GetDataUserByIdService, UpdateDataUserByIdService, DeleteDataUserByIdService, GetAllDataCategoriesService,
    GetDataCategoriesByIdService, UpdateDataCategoriesByIdService, DeleteDataCategoriesByIdService, GetAllDataDiscountLastColorService,
    SaveDataProductService, GetAllDataProductService, SaveDataColorProductService, SaveDataImageroductService, GetDataControllerImageColorService,
    GetAllDataProductNewService, GetAllDataCategoriesProductService, GetAllDataProductCategoriesByIdService, GetIdByHexcolorService, GetAllDataProductColorByIdService,
    GetNameColorByHexService, SaveDataMarkDownService, AddToCartService, ShowAllCartByUserIdService, PlusProductCartService, MinusProductCartService, DeleteByIdProductCartService, PatientBookingAppointmentService,
    VerifyPatientBookingAppointmentService, GetAllDataPriceAllcodeService, GetDataYouMaybeLikeService, DeleteDataProductIdService, UpdateDataProductIdService, UpdateDataImageIdService, UpdateDataColorIdService, DeleteDataColorIdService,
    DeleteDataImageIdService
}