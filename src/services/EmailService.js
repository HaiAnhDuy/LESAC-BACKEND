require('dotenv').config()

const nodemailer = require("nodemailer");
let SimpleSendEmail = async (data) => {
    let data_mail = data.data_mail;
    console.log('mail', data_mail)
    let link = data.url_verify
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: '"TÚI XÁCH LESAC 👻" <phongle69691@gmail.com>', // sender address
        to: data_mail[0].email, // list of receivers
        subject: "Thông tin thanh toán và sản phẩm của bạn tại LESAC ✔", // Subject line
        html: Email(data_mail, link)
    });
}
let GetNameProduct = (data) => {
    let arr = []
    if (data && data.length > 0) {
        data.map((items, index) => {
            let obj = {};
            obj.name = items.name_product;
            obj.color = items.color
            obj.price = items.price
            obj.number = items.number


            arr.push(obj)

        })
    }
    return arr
}
let Email = (data, link) => {
    let result = '';
    let data_pr = GetNameProduct(data)
    result =
        `<h3>CẢM ƠN QUÝ KHÁCH <span style='color:red'>${data[0].full_name}</span> ĐÃ MUA ĐỒ TẠI LESAC</h3>
        <div>
        <h4>
        XIN MỜI QUÝ KHÁCH KIỂM TRA LẠI THÔNG TIN CỦA MÌNH
        </h4>
        <div>
        
        
        <div>
         <div style='color:black'>
          SẢN PHẨM
         </div>
         <div>
         ${data_pr && data_pr.length > 0
        && data_pr.map((items) => {
            return (
                `<div style='color:red'>${items.name} - ${items.color} - ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(items.price)} - ${items.number}</div>`
            )
        })

        }
         </div>
        
        </div>
        
        <li>TỔNG : <span style='color:red'>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
            data[0].total,
        )}</span></li>
        <li>ĐỊA CHỈ : <span style='color:red'>${data[0].full_address}, QUẬN/HUYỆN: ${data[0].state}, THÀNH PHỐ: ${data[0].city}</span></li>
        <li>ĐIỆN THOẠI : <span style='color:red'>${data[0].phonenumber}</li>
        <li>SHIP : <span style='color:red'>${data[0].ship}</li>

        </div>
        <div>
        <h3>NẾU CÁC THÔNG TIN TRÊN LÀ CHÍNH XÁC VUI LÒNG BẤM VÀO NÚT 'CLICK HERE' ĐỂ XÁC NHẬN</h3>
       <a href=${link} target="_blank">CLICK HERE</a>
        </div>
        </div>
        `



    return result;
}

export default
    SimpleSendEmail
