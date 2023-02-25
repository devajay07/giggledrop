const qrcode = require('qrcode');

exports.generateQr = async (req, res, next) =>{
    const qrCode = await qrcode.toDataURL(req.query.link);
    res.send(`<img src="${qrCode}">`);

}