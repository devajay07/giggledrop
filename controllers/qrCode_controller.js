const qrcode = require('qrcode');

exports.generateQr = async (req, res, next) =>{
    const downloadLink = `${process.env.APP_BASE_URL}/files/download/${req.query.fileuuid}`;
    const qrCode = await qrcode.toDataURL(downloadLink);
    res.send(`<img src="${qrCode}">`);

}