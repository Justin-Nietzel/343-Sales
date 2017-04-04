const Address = require("./address.js");

module.exports = class Payment
{
  constructor(jsonResponse)
  {
    //We have not defined the id's name in our api documentation.
    this.id = jsonResponse.id;
    this.billingAdress = new Address(jsonResponse.address);
    this.cardNumber = jsonResponse.cardNumber;
    this.cvc = jsonResponse.cvc;
    this.expirationDate = new Date(jsonResponse.expirationDate)
  }

  isDateValid()
  {
    if (Object.prototype.toString.call(this.expirationDate) === "[object Date]"
        && !isNaN(this.expirationDate.getTime()))
      return true;
    else
      return false;
  }

  isExpired()
  {
    if (this.isDateValid())
      return new Date().getTime() >= this.expirationDate.getTime();
    else
      return true;
  }
}
