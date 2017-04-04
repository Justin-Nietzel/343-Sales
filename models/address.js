const util = require('util');


module.exports = class Address
{
  constructor(jsonResponse)
  {
    //We have not defined the id's name in our api documentation.
    this.id = jsonResponse.id;
    this.firstName = jsonResponse.firstName;
    this.lastName = jsonResponse.lastName;
    this.address = jsonResponse.address;
    this.city = jsonResponse.city;
    this.zip = jsonResponse.zip;
    this.state = jsonResponse.state;
  }

  getPrettyAddress()
  {
    return util.format("%s, %s, %s", this.address, this.city, this.zip);
  }
}
