import db from "../models/index.js"
import CRUDservices from '../services/CRUDservices.js'

const Homepage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        console.log(data)
        return res.render('index.ejs')

    } catch (e) {
        console.log(e)
    }


}

const Test = (req, res) => {
    return res.send('Test')
}

let GetCRUD = (req, res) => {
    return res.render('CRUD.ejs')
}

let CreateUserCRUD = async (req, res) => {
    let data = await CRUDservices.CreateNewUser(req.body);

    return res.redirect('/display-crud')

}

let DisplayUserCRUD = async (req, res) => {
    let data = await CRUDservices.DisplayUser();

    res.render('displayCRUD.ejs', { data: data })
}

let EditDisplayCRUD = async (req, res) => {
    let id = req.body.id

    let data = await CRUDservices.EditDisplay(id)
    console.log('>>>Check', data)

    res.render('EditCRUD.ejs', { data: data[0] })
}

let EditUser = async (req, res) => {
    console.log('>>>check body', req.body.id_ed)
    let data = await CRUDservices.EditUser(req.body)


    console.log(data)

    return res.redirect('/display-crud')
}

let DeleteUser = async (req, res) => {
    await CRUDservices.DeleteUserCRUD(req.body.id)
    return res.redirect('/display-crud')
}

export default {
    Homepage, Test, GetCRUD, CreateUserCRUD, DisplayUserCRUD, EditDisplayCRUD, EditUser, DeleteUser
}