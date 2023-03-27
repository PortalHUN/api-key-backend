const db = require('../../utils/db');

const getPerson = async (req,res)=>{
    const Name = req.params.name
    if(!Name) return res.status(400).json({err:"Invalid data"});
    await db.query(`SELECT * FROM person WHERE Name = ${db.escape(Name)};`,async (error,result)=>{
        if(error) return res.status(500).json({err:"Database error: "+ error.sqlMessage});
        else if(!result || result.length == 0) return res.status(400).json({err:"No person found in the database"});
        else req.person = result[0];
        await db.query(`SELECT Mark FROM marks WHERE PersonID = ${db.escape(req.person.ID)};`,(error, marks)=>{
            if(error) return res.status(500).json({err:"Database error: "+ error.sqlMessage});
            let mark = [];
            marks.forEach(element => {
                mark.push(element.Mark);
            });
            req.person.marks = mark;
            return res.status(200).json({person: req.person});
        })
    })
}

module.exports = getPerson;