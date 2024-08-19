import UserService from '../services/UserService.js'


const handleLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        console.log('check body', email, password)
        let data = await UserService.handleLoginService(email, password);
        return res.status(200).json({
            data
        })


    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}


const GetAllArrayGenderAndRole = async (req, res) => {
    try {

        let data = await UserService.GetAllArrayGenderAndRoleService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}

let SaveDataManagerUser = async (req, res) => {
    try {

        let data = await UserService.SaveDataManagerUserService(req.body)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}

let GetActiveAllcodes = async (req, res) => {
    try {

        let data = await UserService.GetActiveAllcodesService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}

let SaveDataCategories = async (req, res) => {
    try {

        let data = await UserService.SaveDataCategoriesService(req.body)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}


let GetAllDataUser = async (req, res) => {
    try {

        let data = await UserService.GetAllDataUserService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}

let GetDataUserById = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.GetDataUserByIdService(id)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let UpdateDataUserById = async (req, res) => {
    try {
        let data = await UserService.UpdateDataUserByIdService(req.body)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let DeleteDataUserById = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.DeleteDataUserByIdService(id)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetAllDataCategories = async (req, res) => {
    try {
        let data = await UserService.GetAllDataCategoriesService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetDataCategoriesById = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.GetDataCategoriesByIdService(id)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let UpdateDataCategoriesById = async (req, res) => {
    try {
        let data = await UserService.UpdateDataCategoriesByIdService(req.body)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let DeleteDataCategoriesById = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.DeleteDataCategoriesByIdService(id)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}

let GetAllDataDiscountLastColor = async (req, res) => {
    try {
        let data = await UserService.GetAllDataDiscountLastColorService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}

let SaveDataProduct = async (req, res) => {
    try {
        let data = await UserService.SaveDataProductService(req.body)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetAllDataProduct = async (req, res) => {
    try {
        let data = await UserService.GetAllDataProductService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let SaveDataColorProduct = async (req, res) => {
    try {
        let data = await UserService.SaveDataColorProductService(req.body)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let SaveDataImageroduct = async (req, res) => {
    try {
        let data = await UserService.SaveDataImageroductService(req.body)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetDataControllerImageColor = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.GetDataControllerImageColorService(id)
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetAllDataProductNew = async (req, res) => {
    try {
        let data = await UserService.GetAllDataProductNewService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetAllDataCategoriesProduct = async (req, res) => {
    try {
        let data = await UserService.GetAllDataCategoriesProductService()
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetAllDataProductCategoriesById = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.GetAllDataProductCategoriesByIdService(id);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetIdByHexcolor = async (req, res) => {
    try {
        let hex = req.query.hex
        let data = await UserService.GetIdByHexcolorService(hex);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetAllDataProductColorById = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.GetAllDataProductColorByIdService(id);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let GetNameColorByHex = async (req, res) => {
    try {
        let hex = req.query.hex
        let data = await UserService.GetNameColorByHexService(hex);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let SaveDataMarkDown = async (req, res) => {
    try {
        let data = await UserService.SaveDataMarkDownService(req.body);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let AddToCart = async (req, res) => {
    try {
        let data = await UserService.AddToCartService(req.body);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let ShowAllCartByUserId = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.ShowAllCartByUserIdService(id);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let PlusProductCart = async (req, res) => {
    try {

        let data = await UserService.PlusProductCartService(req.body);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let MinusProductCart = async (req, res) => {
    try {

        let data = await UserService.MinusProductCartService(req.body);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let DeleteByIdProductCart = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.DeleteByIdProductCartService(id);
        return res.status(200).json({
            data
        })
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error From Service',

        })
    }
}
let PatientBookingAppointment = async (req, res) => {
    try {

        // console.log('body', req.body)
        let data = await UserService.PatientBookingAppointmentService(req.body)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let VerifyPatientBookingAppointment = async (req, res) => {
    try {
        let data = await UserService.VerifyPatientBookingAppointmentService(req.body)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let GetAllDataPriceAllcode = async (req, res) => {
    try {
        let data = await UserService.GetAllDataPriceAllcodeService()
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}

let GetDataYouMaybeLike = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await UserService.GetDataYouMaybeLikeService(id)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let DeleteDataProductId = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await UserService.DeleteDataProductIdService(id)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let UpdateDataProductId = async (req, res) => {
    try {
        let data = await UserService.UpdateDataProductIdService(req.body)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let UpdateDataImageId = async (req, res) => {
    try {
        let data = await UserService.UpdateDataImageIdService(req.body)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let UpdateDataColorId = async (req, res) => {
    try {
        let data = await UserService.UpdateDataColorIdService(req.body)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let DeleteDataColorId = async (req, res) => {
    try {
        let id = req.query.id
        let data = await UserService.DeleteDataColorIdService(id)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
let DeleteDataImageId = async (req, res) => {
    try {
        let id = req.query.id

        let data = await UserService.DeleteDataImageIdService(id)
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service'
        })
    }
}
export default {
    GetAllArrayGenderAndRole, handleLogin, SaveDataManagerUser, GetActiveAllcodes, SaveDataCategories, GetAllDataUser, GetDataUserById, UpdateDataUserById,
    DeleteDataUserById, GetAllDataCategories, GetDataCategoriesById, UpdateDataCategoriesById, DeleteDataCategoriesById, GetAllDataDiscountLastColor,
    SaveDataProduct, GetAllDataProduct, SaveDataColorProduct, SaveDataImageroduct, GetDataControllerImageColor, GetAllDataProductNew, GetAllDataCategoriesProduct,
    GetAllDataProductCategoriesById, GetIdByHexcolor, GetAllDataProductColorById, GetNameColorByHex, SaveDataMarkDown, AddToCart, ShowAllCartByUserId,
    PlusProductCart, MinusProductCart, DeleteByIdProductCart, PatientBookingAppointment, VerifyPatientBookingAppointment, GetAllDataPriceAllcode, GetDataYouMaybeLike, DeleteDataProductId,
    UpdateDataProductId, UpdateDataImageId, UpdateDataColorId, DeleteDataColorId, DeleteDataImageId
}