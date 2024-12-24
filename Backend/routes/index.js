const express= require("express");
const db =require("../db.json"); 

const router = express.Router(); 


router.route("/candidates").get((req, res) => {
  return res.status(200).json(db);
});


router.route("/*").get((req, res) => {
  return res.status(404).json({
    msg: "URL not found"
  });
});

module.exports = router;
