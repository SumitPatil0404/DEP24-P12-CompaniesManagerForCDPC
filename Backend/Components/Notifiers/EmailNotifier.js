const nodemailer = require('nodemailer');


let auth = {
    user: 'dep24.p12@gmail.com',
    pass: 'qZkFPcsf9gSBbYOV'
}


function sendEmailWithDomain(emailId, subject, emailBody, domainName) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            auth: auth
        });

        const mailConfigurations = {
            from: domainName,
            to: emailId,
            subject: subject,
            text: emailBody
        };

        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) {
                // If there's an error, reject the Promise with the error
                reject(error);
            } else {
                // If email sent successfully, resolve the Promise
                resolve(true);
            }
        });
    });
}


module.exports = { sendEmailWithDomain};
