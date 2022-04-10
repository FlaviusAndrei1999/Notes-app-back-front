const express = require("express");
const sequelize = require('./sequelize');
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
    origin: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Methods",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Headers"
    ],
    credentials: true,
    enablePreflight: true,
};


const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,DELETE,PUT,POST");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Content-Range','posts 0-20/20');
    next();
});



const Article = require("./Article")(sequelize, Sequelize);
const Reference = require("./Reference")(sequelize, Sequelize);

Article.hasMany(Reference, {foreignKey: "id_articol"});

const router = express.Router();
app.use("/app", router);



router.route('/Articole')
    .get(async(req,res,next) =>{
        try{
            const articole = await Article.findAll();
            res.status(200).json(articole);
        }catch(err){
            next(err);
        }
        
    })

    .post(async(req,res,next) => {
        try{
            const artBody = req.body;
            const articol = await Article.create(artBody);
            return res.status(200).json(articol);
        }catch(err){
            next(err)
        }
    })


router.route("/Articole/:id_articol")
.put(async(req,res,next)=>{
    try{
        const articol = await Article.findByPk(req.params.id_articol);
        if(articol){
            const updateArticol = await articol.update(req.body);
            res.status(200).json(updateArticol);
        }else{
            return res.status(404).json({message:`Articolul ${req.params.id_articol} nu a fost gasit !`});
        }
    }catch(err){
        next(err);
    }
})

.delete(async(req, res, next) => {
    try{
        const Delete = await Article.destroy({
            where: {
                id_articol: req.params.id_articol,
            }
        })
        res.status(200).json({message:`Articlocul ${req.params.id_articol} a fost sters`});
    }catch(err){
        next(err);
    }
})


router.route("/Referinta")
    .get(async (req,res, next) => {
        try{
            const referinta = await Reference.findAll();
            res.status(200).json(referinta);
        }catch(err){
            next(err);
        }
    })

    .post(async (req,res,next) => {
    try{
        const referintaBody = req.body;
        const referinta = await Reference.create(referintaBody);
        res.status(200).json(referinta);
    }catch(err){
        next(err);
    }
})


router.route("/Referinta/Articole/:id_articol")
.get(async (req,res,next) => {
    try{
        const articole = await Article.findByPk(req.params.id_articol);
        if(articole){
            const referinta = await Reference.findAll({
                where: {
                    id_articol: req.params.id_articol
                }
            })
        res.status(200).json(referinta);
        }
    }catch(err){
        next(err)
    }
})


router.route('/Referinta/:id_referinta')
        .put(async (req, res, next) => {
            try{
                const referinta = await Reference.findByPk(req.params.id_referinta);
                if(referinta){
                    const updateReferinta = await referinta.update(req.body);
                    res.status(200).json("Referinta s-a updatat!");
                }else{
                    res.status(404).json({messaje:`Referinta ${req.params.id_referinta} nu esxista`});
                }
            }catch(err){
                next(err)
            }
        })

        .delete(async (req,res, next) => {
            try{
                const Delete = await Reference.destroy({
                    where: {
                        id_referinta: req.params.id_referinta,
                    }
                })
                res.status(200).json({messaje: `A fost stearsa referinta ${req.params.id_referinta}`});
            }catch(err){
                next(err);
            }
            
        })















app.listen(8080, async () =>{
    console.log(`Serverul merge pe portul 8080`);
    try{
        await sequelize.authenticate();
        console.log("BD conectata")
    }catch{
        console.error("Conexiune esuata");
    }
});