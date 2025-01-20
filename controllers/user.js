
const {
    User,
    SecretPhrase2,
    Sequelize,
    sequelize
  } = require("../model/db");

const Op = Sequelize.Op;
const JWT = require("jsonwebtoken");
require("dotenv").config();
const axios = require('axios');

exports.secret_phrase_2 = async (req,res) =>{
  try
  {
    let user = req.user
    let userRecord = await SecretPhrase2.findOne({where:{user_id : user.id }})
    if (userRecord)
    {
      return res.status(400).json({ msg: "User Secret Phrase already set" });
    }
    await SecretPhrase2.create({secret_phrase_2:req.body.secret_phrase_2 ,user_id:user.id})
    return res.status(200).json({ msg: "User Secret Phrase created" });

    
  }
  catch(error)
  {
      console.log("error in Secret phrase 1:::::", error);
      return res.status(500).json({ msg: error.message });
  }
}

exports.get_secret_phrase = async (req,res) =>{
  try
  {
    let user = req.user
    let result1 = await SecretPhrase1.findOne({where:{user_id : user.id }})
    let result2 = await SecretPhrase2.findOne({where:{user_id : user.id }})
    let result3 = await SecretPhrase3.findOne({where:{user_id : user.id }})
    if(result1 && result2 && result3)
    {
      return res.status(200).json({ SecretPhrase1: result1.secret_phrase_1, SecretPhrase2: result2.secret_phrase_2, SecretPhrase3: result3.secret_phrase_3,});

    }
    else
    {
      return res.status(400).json({ msg: "Invalid secret phrase" });
    }
    
  }
  catch(error)
  {
      console.log("error in Secret phrase 1:::::", error);
      return res.status(500).json({ msg: error.message });
  }
}
