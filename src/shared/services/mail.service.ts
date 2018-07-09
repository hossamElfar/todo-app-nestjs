import * as nodemailer from 'nodemailer';
import * as mg from 'nodemailer-mailgun-transport';
import { MailRequest } from './mail.request';
import * as dotenv from 'dotenv';

dotenv.config();
const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export function sendMail(mailRequest: MailRequest ){
    nodemailerMailgun.sendMail({
        from: process.env.MAILGUN_ADDRESS,
        to: mailRequest.to,
        subject: mailRequest.subject,
        text: mailRequest.body,
      },  (err, info) => {
        if (err) {
          // tslint:disable-next-line:no-console
          console.log('Error: ' + err);
        }
        else {
          // tslint:disable-next-line:no-console
          console.log('Response: ' + info);
        }
      });
}