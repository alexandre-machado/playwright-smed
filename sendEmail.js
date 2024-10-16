import { createTransport } from "nodemailer";
import { readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from 'url';

// Definir __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export async function sendEmail() {
    let transporter = createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
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
        subject: "Agenda da SMED disponível",
        text: "Olhe os arquivos anexados",
        attachments: attachments
    });

    console.log("Message sent: %s", info.messageId);
}

sendEmail().catch(console.error);
