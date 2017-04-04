module.exports = class Customer
{
  constructor(jsonResponse)
  {
    this.customerId = jsonResponse.customerId;
    this.firstName = jsonResponse.firstName;
    this.lastName = jsonResponse.lastName;
    this.email = jsonResponse.email;
    this.phone = jsonResponse.phone;
    this.companyName = jsonResponse.companyName;
  }

  getFullName()
  {
    return this.firstName + " " + this.lastName;
  }

  save()
  {
    //How are we going to connect this to the data mapper?
    return false;
  }
}
