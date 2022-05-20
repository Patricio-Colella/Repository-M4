const { Router } = require('express');
const { Ability,Character} = require('../db');
const router = Router();

router.post("/",async(req,res)=>{
    const  {name,description,mana_cost}=req.body
    try {
        const habilidad=await Ability.create({name,description,mana_cost})
        res.status(201).send(habilidad)
    } catch (error) {
        res.status(404).send("Falta enviar datos obligatorios")
    }
})

router.put("/setCharacter",async(req,res)=>{
    const  {idAbility,codeCharacter}=req.body
    let habilidad=await Ability.findByPk(parseInt(idAbility))
    let personaje=await Character.findOne({where:{code:codeCharacter}})//<----innecesario
    habilidad.setCharacter(personaje)//<----puedo pasarle el code sin buscar el personaje
    res.send(habilidad)
})


module.exports = router;