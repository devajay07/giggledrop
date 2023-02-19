const File = require('../models/file');
const path = require('path');

exports.fileDownload = async (req, res, next) =>{
    const file = await File.findOne({uuid:req.params.uuid});
    let error = null;
    if (!file) {
         error = 'Download link has been modified or expired 🥹';
         return res.render('download', {file, error });
    } 
    const filePath = path.join(__dirname, '..', file.path);
    res.download(filePath);
    file.downloads++;
    file.save();

}