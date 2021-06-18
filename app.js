// requirements

const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const path = require('path');

// set Storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    // gives the files a unique name based on time uploaded
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// initialize the Upload
const upload = multer({
    storage: storage,
    // limit the file size to one million bytes
    limits: { fileSize: 1000000 },
    // filter files
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb)
    // }
}).single('image')

// check files for type
function checkFileType(file, cb) {
    // file types allowed
    const filetypes = /jpeg|jpg|png|gif/;
    // check the ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase);
    // check MIME type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('error');
    }
}
// Initialize the app

const app = express();

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Public
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => res.render('home'))

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.render('home', {
                msg: err
            })
        } else {
            if (req.file == undefined) {
                res.render('home', {
                    msg: 'Error'
                });
            } else {
                res.render('home', {
                    msg: 'Uploaded',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
})

const port = 3001;

app.listen(port, () => console.log(`server on port ${port}`))

