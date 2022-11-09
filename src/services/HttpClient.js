const fs = require("fs")
const FormData = require("form-data")
const axios = require("axios")

class HttpClient {
    static async sendPostMessage(username, pushname, body, media) {
        const form = new FormData()
        form.append("username", username)
        form.append("pushname", pushname)
        form.append("body", body)

        if (media) {
            const buff = await Buffer.from(media.data, "base64")
            fs.writeFileSync("storage/" + media.filename, buff)
            form.append("file", fs.createReadStream("storage/" + media.filename))
            form.append("fileType", media.mimetype)
        }
        
        form.getLength((err, length) => {
            if (err) return reject(err)
            axios.post((process.env.API_URL), form, {
                headers: {
                    ...form.getHeaders(),
                    "Content-Length": length,
                },
            }
            )
        })
    }
}


module.exports = HttpClient