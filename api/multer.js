var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

var uploadImg = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        console.log(file.mimetype);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        		req.fileValidateError = "Only images are allowed";
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: { fileSize: 10*1024*1024 } //10 MiB
}).single('profilepic');