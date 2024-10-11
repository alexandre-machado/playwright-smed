import { createTransport } from "nodemailer";
import { readdirSync } from "fs";
import { join } from "path";

async function sendEmail() {
    let transporter = createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const screenshotDir = join(__dirname, 'screenshots');
    const files = readdirSync(screenshotDir);

    const attachments = files.map(file => {
        return {
            filename: file,
            path: join(screenshotDir, file)
        };
    });

    let info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: "Teste da agenda da SMED falhou",
        text: "Teste da agenda da SMED falhou!",
        attachments: attachments
    });

    console.log("Message sent: %s", info.messageId);
}

sendEmail().catch(console.error);
