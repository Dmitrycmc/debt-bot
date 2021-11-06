import fs from 'fs';
import path from 'path';

export const renderTemplate = (templateName: string, params = {}): Promise<string> => new Promise((res, rej) => {
    const templateFileName = path.join(__dirname, '..', '..', 'templates', `${templateName}.html`);

    fs.readFile(templateFileName, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            rej(err.code === 'ENOENT' ? new Error(`Файл ${templateName}.html не найден`) : err);
        } else {
            const result = data.split(/({{.+?}})/).map(part => {
                const match = part.match(/{{(.+)}}/);
                return match && params[match[1]] || part;
            }).join('');
            res(result);
        }
    });
});
