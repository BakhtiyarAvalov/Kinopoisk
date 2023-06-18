const Country = require('./Country');

const getAllCountries = async(req, res) =>{
    const data = await Country.find();
    console.log(data);
    res.ststus(200).send({data})
}

module.exports = {getAllCountries};