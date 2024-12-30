const departmentModel = require('../models/department-model');

module.exports.AddDepartment = async function (req, res) {
    try {
      let { name } = req.body;
  
      const existingDepartment = await departmentModel.findOne({ name });
      if (existingDepartment) {
        return res.status(401).send("Department already exists");
      }
  
      const newDepartment = await departmentModel.create({ name });
      res.send({status: "ok", newDepartment});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  

module.exports.ViewDepartment = async function(req, res){

    const department = await departmentModel.find()

    if(!department){
        return res.status(500).send("No department exist")
    }

    res.send({status: "ok", department})
}

module.exports.UpdateDepartment = async function(req, res){
    let {name} = req.body;

    const updateddepartment = await departmentModel.findOneAndUpdate(
        {name}
    )

    if(!updateddepartment){
       return res.status(500).send("No Such Department Exist");
    }

    res.send({status: "ok", updateddepartment})
}

module.exports.DeleteDepartment = async function(req, res){
    let {name} = req.body;

    const deleteDepartment = await departmentModel.findOneAndDelete(
        {name}
    )

    if(!deleteDepartment){
        return res.status(500).send("No Such department exist");
    }
    res.send({status: "ok", deleteDepartment});
    
}
