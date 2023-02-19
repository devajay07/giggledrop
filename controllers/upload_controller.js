const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4: uuid4} = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
       const uniqueName = `${Date.now() + '-' + Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName);
    }
})

const upload = multer({storage, limit:{
    fileSize: 1000000 * 100
}}).single('myFile');

exports.uploadfile = (req,res,next)=>{

    upload(req,res, async (err)=>{
        // validate request

         if(!req.file){
        return res.json({error:'No File Found'})
        }

        if(err){
            return res.status(500).send({error: err.message});
        }

        // save into database 
            const file = await File.create({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size 
            });
        
        return res.status(200).send({file:`${process.env.APP_BASE_URL}/files/${file.uuid}`});
    })
}