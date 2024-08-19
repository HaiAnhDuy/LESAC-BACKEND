import express from "express"
import UserController from '../controllers/UserController.js'
import HomeController from '../controllers/HomeController.js'

let router = express.Router();

let initWebRouter = (app) => {

    router.get('/getCRUD', HomeController.GetCRUD)
    router.post('/create-user-crud', HomeController.CreateUserCRUD)
    router.get('/display-crud', HomeController.DisplayUserCRUD)
    router.post('/edit-user', HomeController.EditDisplayCRUD)
    router.post('/edit-user-2', HomeController.EditUser)
    router.post('/delete-user', HomeController.DeleteUser)

    router.post('/api/login', UserController.handleLogin)

    router.get('/api/get-all-array-gender-and-role', UserController.GetAllArrayGenderAndRole)
    router.post('/api/save-data-manager-user', UserController.SaveDataManagerUser)
    router.get('/api/get-data-active-allcodes', UserController.GetActiveAllcodes)
    router.post('/api/save-data-categories', UserController.SaveDataCategories)
    router.get('/api/get-all-data-user', UserController.GetAllDataUser)
    router.get('/api/get-data-user-by-id', UserController.GetDataUserById)
    router.post('/api/update-data-user-by-id', UserController.UpdateDataUserById)
    router.post('/api/delete-data-user-by-id', UserController.DeleteDataUserById)
    router.get('/api/get-all-data-categories', UserController.GetAllDataCategories)
    router.get('/api/get-data-categories-by-id', UserController.GetDataCategoriesById)

    router.post('/api/update-data-categories-by-id', UserController.UpdateDataCategoriesById)
    router.post('/api/delete-data-categories-by-id', UserController.DeleteDataCategoriesById)

    router.post('/api/get-data-categories-by-id', UserController.DeleteDataCategoriesById)

    router.get('/api/get-data-discount-last-color', UserController.GetAllDataDiscountLastColor)
    router.post('/api/save-data-product', UserController.SaveDataProduct)
    router.get('/api/get-all-data-product', UserController.GetAllDataProduct)

    router.post('/api/save-data-color-product', UserController.SaveDataColorProduct);
    // update color
    router.post('/api/update-data-color-id', UserController.UpdateDataColorId)
    router.post('/api/delete-data-color-id', UserController.DeleteDataColorId)


    router.post('/api/save-data-image-product', UserController.SaveDataImageroduct)
    router.get('/api/get-data-by-image-product-and-color', UserController.GetDataControllerImageColor)
    router.post('/api/update-data-image-id', UserController.UpdateDataImageId)
    router.post('/api/delete-data-image-id', UserController.DeleteDataImageId)




    router.get('/api/get-all-data-product-new', UserController.GetAllDataProductNew)
    router.get('/api/get-all-data-categories-product', UserController.GetAllDataCategoriesProduct)
    router.get('/api/get-all-data-categories-product-by-id', UserController.GetAllDataProductCategoriesById)
    router.get('/api/get-id-by-hexcolor', UserController.GetIdByHexcolor)
    router.get('/api/get-all-data-product-color-by-id', UserController.GetAllDataProductColorById)
    router.get('/api/get-name-color-by-hex', UserController.GetNameColorByHex)
    router.get('/api/get-data-you-maybe-like', UserController.GetDataYouMaybeLike)
    router.post('/api/delete-data-product-id', UserController.DeleteDataProductId)
    router.post('/api/update-data-product-id', UserController.UpdateDataProductId)




    //MARKDOWN
    router.post('/api/save-data-markdown', UserController.SaveDataMarkDown)
    //CART
    router.post('/api/add-to-cart', UserController.AddToCart)
    router.get('/api/show-all-cart-by-user-id', UserController.ShowAllCartByUserId)
    router.post('/api/plus-product-cart', UserController.PlusProductCart)
    router.post('/api/minus-product-cart', UserController.MinusProductCart)
    router.post('/api/delete-by-id-product-cart', UserController.DeleteByIdProductCart)

    //EMAIL
    router.post(`/api/patient-book-appointment`, UserController.PatientBookingAppointment)
    router.post(`/api/vetify-email-appointment`, UserController.VerifyPatientBookingAppointment)

    //BY PRICE
    router.get(`/api/get-data-price-allcode`, UserController.GetAllDataPriceAllcode)







































    return app.use("/", router)
}


export default
    initWebRouter
