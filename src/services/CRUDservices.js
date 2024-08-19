import bcrypt from 'bcryptjs';
import db from "../models/index.js"

const salt = bcrypt.genSaltSync(10);

let CreateNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let passwordAfter = await PasswordHashByScrypt(data.password);
            await db.User.create({

                email: data.email,
                password: passwordAfter,
                fullName: data.fullName,
                address: data.address,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,


            })

            resolve('All Right !')
        } catch (e) {
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

let DisplayUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll();
            resolve(data)
        }
        catch (e) {
            reject(e)
        }
    })
}

let EditDisplay = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: {
                    id: id
                }
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}


let EditUser = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                { where: { id: data.id_ed } }
            )
            if (user) {

                user.email = data.emailed,

                    user.firstName = data.firstNameed,
                    user.lastName = data.lastNameed,
                    user.address = data.addressed,
                    user.gender = data.gendered === "1" ? true : false,
                    user.roleId = data.roleIded,
                    user.phonenumber = data.phonenumbered,

                    await user.save();

                resolve();

            } else {
                resolve();
            }
        }
        catch (e) {
            reject(e)
        }
    })
}


let DeleteUserCRUD = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user_dl = await db.User.findOne({
                where: { id: id }
            })
            if (user_dl) {
                await user_dl.destroy();
                resolve();
            } else {
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
}

export default {
    CreateNewUser, DisplayUser, EditDisplay, EditUser, DeleteUserCRUD
}