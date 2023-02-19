const File = require('../models/file');

exports.downloadFile = async (req, res, next) =>{
    const file = await File.findOne({uuid:req.params.uuid});
    let error = null;
    if (!file) {
         error = 'Download link has been modified or expired 🥹';
         return res.render('download', {file, error });
    }
    res.render('download', { file,error });

}