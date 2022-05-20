const { Router } = require('express');
const { Op, Character, Ability, Role } = require('../db');
const router = Router();

router.post("/",async (req,res)=>{
    const {code,name,age,race,hp,mana,date_added}=req.body
    if(!code || !hp || !mana ) res.status(404).send("Falta enviar datos obligatorios")
    else {
        try {
            let char=await Character.create({code,name,age,race,hp,mana,date_added})
            res.status(201).json(char)
        } catch (error) {
            res.status(404).send("Error en alguno de los datos provistos")
        }
    }
})

router.get("/",async (req,res)=>{
    const {race,age}=req.query
    if(!race && !age){
        const chars=await Character.findAll()
        res.status(200).json(chars)
    }else{
        try {
            let chars=await Character.findAll({
                where:{race}
                })
            if(age){
                chars=await Character.findAll({
                    where:{
                        [Op.and]:[
                            {race},{age}
                        ]
                    }
                })
            }
            res.status(200).json(chars)
        } catch (error) {
            res.status(404).send("Error en alguno de los datos provistos")
        }
    }
})

router.get("/young",async (req,res)=>{
    const char=await Character.findAll({where:{
        age:{[Op.lt]:25}
    }})
    if(char)res.status(200).send(char)
    else res.status(404)
})

router.put("/addAbilities",async (req,res)=>{
    const {codeCharacter,abilities}=req.body
    let personaje=await Character.findByPk(codeCharacter)
    abilities.forEach(async a => { 
        await personaje.createAbility(a) 
    });
    res.send(personaje)
})

/*
promises=abilities.map(a=>personaje.createAbility(a))
await promises.all(promises)

es mas rapido que el foreach
*/


router.get("/:code",async (req,res)=>{
    const code=req.params.code
    const char=await Character.findOne({where:{code}})
    if(char)res.status(200).send(char)
    else res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
})

router.put("/:attribute",async (req,res)=>{
    const {attribute}=req.params
    const {value}=req.query

    let char=await Character.update(
        {[attribute]:value},
        {where:{
            [attribute]:{[Op.is]: null}
        }}
    )
    if(char)res.status(200).send("Personajes actualizados")
    else res.status(404)
})

router.get("/roles/:code",async(req,res)=>{
    const {code}=req.params
    let personaje=await Character.findOne({
            where: {
              code: code
            },
            include: Role
    });
    res.send(personaje)
})

module.exports = router;