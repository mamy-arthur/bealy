const nodemailer = require('nodemailer');

export class MessagingService {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    async sendEmail(email: string, message: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset password',
            html: message
        });
    }
}