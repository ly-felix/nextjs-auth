const nodemailer = require('nodemailer');
/**
 * 发送邮件
 * @param {type:Email, Default:none} fromEmail 发出邮件的邮箱
 * @param {type:Email, Default:none} toEmail  给谁发送邮件的邮箱
 * @param {type:Email, Default:none} user 发送邮件的邮箱
 * @param {type:String, Default:none} pass 邮箱授权码
 * @param {type:String|NUmber,, Default:none} sendText 发送的信息
 * @param {type:String , Default:'smtp.qq.com'} host   
 * @return {Boolean} true  发送成功 | false 出错,邮箱不合法,或把发件人设为黑名单,或不接受陌生人邮件、或其他原因
 */
async function sendEmail(
    // fromEmail : string, 
    toEmail : string , 
    // user : string, 
    // pass : string, 
    sendText : string , 
    ) {
    let transporter = nodemailer.createTransport({

        host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        secureConnection: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD, 
        },
        tls: {
            rejectUnauthorized: false, 
        },
    });

    let res = true
    await transporter.sendMail({
        from: '"From" <' + process.env.SMTP_FROM + '>', 
        to: toEmail, 
        subject: "LY'log in webpage Email verification", 
        html: sendText,
    }).catch((err: any) => {
        res = false
        console.log(err)
    })
    // console.log(res)

    return res
}

export default sendEmail