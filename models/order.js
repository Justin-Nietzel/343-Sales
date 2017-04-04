var test =
{
	"id": 1000,
    "customerId": 1,
    "repId": 99,
    "cost": 200,
    "orderDate": "2017-03-01T20:51:26.905Z",
    "isPaid": false,
    "taxPercentage": 8,
    "shippingInfo":
    {
    	"firstName": "john",
        "lastName": "doe",
        "address": "1111 street",
        "city": "Rochester",
        "zip": "14586",
        "state": "NY"
    },
    "billingInfo":
    {
        "firstName": "john",
        "lastName": "doe",
        "address": "1111 street",
        "city": "Rochester",
        "zip": "14586",
        "state": "NY"
    },
    "customerInfo":
    {
        "customerId": 42,
        "firstName": "John",
        "lastName": "Johnson",
        "email": "nottheotherjohn@email.com",
        "phone": "5451112222"
    },
    "items":
    [
    	{
        	"serialId": 20,
            "price": 100,
            "status": "original|return|replace",
            "replaceDeadline": "2017-03-01T20:51:26.908Z",
            "refundDeadline": "2017-03-01T20:51:26.908Z"
        },
        {
          	"serialId": 21,
        	"price": 200,
        	"status": "original|return|replace",
       	    "replaceDeadline": "2017-03-01T20:51:26.909Z",
       	    "refundDeadline": "2017-03-01T20:51:26.909Z"
        }
    ]
};

console.log(JSON.stringify(test));
