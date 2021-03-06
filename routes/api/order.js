var express = require('express');
var router = express.Router();

var orders = {};

//This will be my mock database for 'searching', will be repleaced with the actual database
var database = [
	{
		"id" : 1,
		"customerId": 1,
		"repId": 99,
		"cost": 200,
		"orderDate": "2017-03-01T20:51:26.905Z",
		"isPaid": false,
		"taxPercentage": 8,
		"shippingInfo": {
			"firstName": "john",
			"lastName": "doe",
			"address": "1111 street",
			"city": "Rochester",
			"zip": "14586",
			"state": "NY"
		},
		"billingInfo": {
			"firstName": "john",
			"lastName": "doe",
			"address": "1111 street",
			"city": "Rochester",
			"zip": "14586",
			"state": "NY",
			"ccLastFourDigets": "1234"
		},
		"customerInfo": {
			"customerId": 1,
			"firstName": "John",
			"lastName": "Johnson",
			"email": "nottheotherjohn@email.com",
			"phone": "5451112222"
		},
		"items": [
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
	},
	{
		"id" : 2,
		"customerId": 1,
		"repId": 60,
		"cost": 700.50,
		"orderDate": "2017-03-20T20:51:26.905Z",
		"isPaid": true,
		"taxPercentage": 8,
		"shippingInfo": {
			"firstName": "john",
			"lastName": "doe",
			"address": "1111 street",
			"city": "Rochester",
			"zip": "14586",
			"state": "NY"
		},
		"billingInfo": {
			"firstName": "john",
			"lastName": "doe",
			"address": "1111 street",
			"city": "Rochester",
			"zip": "14586",
			"state": "NY",
			"ccLastFourDigets": "1234"
		},
		"customerInfo": {
			"customerId": 1,
			"firstName": "John",
			"lastName": "Johnson",
			"email": "nottheotherjohn@email.com",
			"phone": "5451112222"
		},
		"items": [
			{
				"serialId": 12,
				"price": 200.25,
				"status": "original",
				"replaceDeadline": "2017-04-20T20:51:26.908Z",
				"refundDeadline": "2017-05-20T20:51:26.908Z"
			},
			{
				"serialId": 22,
				"price": 500.25,
				"status": "original",
				"replaceDeadline": "2017-04-20T20:51:26.909Z",
				"refundDeadline": "2017-05-20T20:51:26.909Z"
			}
		]
	},
	{
		"id" : 3,
		"customerId": 2,
		"repId": 12,
		"cost": 100,
		"orderDate": "2017-03-23T20:51:26.905Z",
		"isPaid": true,
		"taxPercentage": 8,
		"shippingInfo": {
			"firstName": "joe",
			"lastName": "jefferson",
			"address": "222 road",
			"city": "Rochester",
			"zip": "12345",
			"state": "NY"
		},
		"billingInfo": {
			"firstName": "joe",
			"lastName": "jefferson",
			"address": "222 road",
			"city": "Rochester",
			"zip": "12345",
			"state": "NY",
			"ccLastFourDigets": "1234"
		},
		"customerInfo": {
			"customerId": 2,
			"firstName": "Joe",
			"lastName": "Jefferson",
			"email": "therealjoe@joemail.com",
			"phone": "1231231234"
		},
		"items": [
			{
				"serialId": 10,
				"price": 100,
				"status": "original",
				"replaceDeadline": "2017-04-22T20:51:26.908Z",
				"refundDeadline": "2017-05-22T20:51:26.908Z"
			}	
		]
	}
];

var inflateResponseObject = function(data,billingInfo,shippingInfo,customerInfo,items){
	//Deep clone the object because we will be removing elements
	var order = JSON.parse(JSON.stringify(data));
	if(!billingInfo || billingInfo == false){
		delete order['billingInfo'];
	}
	if(!shippingInfo || shippingInfo == false){
		delete order['shippingInfo'];
	}
	if(!customerInfo || customerInfo == false){
		delete order['customerInfo'];
	}
	if(!items || items == false){
		delete order['items']; 
	}
	return order;
};

router.get('/', function(req,res,next){
	var orders = [];
	
	//int : Id of the order
	var orderId = req.param('orderId');
	//bool : if the billing info should be returned
	var billingInfo = req.param('billingInfo');
	billingInfo = billingInfo == 'true';
	//bool : if the shipping info should be returned
	var shippingInfo = req.param('shippingInfo');
	shippingInfo = shippingInfo == 'true';
	//bool : if the customer info should be returned
	var customerInfo = req.param('customerInfo');
	customerInfo = customerInfo == 'true';
	//bool : if the list of items should be returned
	var items = req.param('items');	
	items = items == 'true';
	
	if (!orderId) {
		res.status(400).send('400 Bad request: orderId is needed');
	}
	
	database.forEach(function(data){
		if(data['id'] == orderId){
			var order = inflateResponseObject(data,billingInfo,shippingInfo,customerInfo,items);
			orders.push(order);					
		}
	});
	var responseObj = {
		"orders": orders
	};
	res.json(responseObj);
});

router.get('/search', function(req,res,next){
	var orders = [];
		//String : Shipping address
	var address = req.param('address');
	//bool : False by default, True will search by billing
	var billingAddress = req.param('billingAddress');
	billingAddress = billingAddress == 'true';
	//int : Customer Id to help refine search. Optional
	var customerId = req.param('customerId');
	//bool : if the billing info should be returned
        var billingInfo = req.param('billingInfo');
	billingInfo = billingInfo == 'true';
        //bool : if the shipping info should be returned
        var shippingInfo = req.param('shippingInfo');
	shippingInfo = shippingInfo == 'true'; 
        //bool : if the customer info should be returned
        var customerInfo = req.param('customerInfo');
	customerInfo = customerInfo == 'true';
        //bool : if the list of items should be returned
        var items = req.param('items');
	items = items == 'true';
	
	database.forEach(function(data){
		var found = false;
		if(billingAddress == true && (address && address.length > 0)){
			var biObj = data['billingInfo'];
			var addressString = biObj['firstName']+' '+biObj['lastName']+' '+biObj['address']+' '+biObj['city']+' '+biObj['zip']+' '+biObj['state'];
			if(addressString.includes(address)){
				found = true;	
			}
		} else if(address && address.length > 0){
			var siObj = data['shippingInfo'];
			var addressString = siObj['firstName']+' '+siObj['lastName']+' '+siObj['address']+' '+siObj['city']+' '+siObj['zip']+' '+siObj['state'];
			if(addressString.includes(address)){
				found = true;
			}
		}

		if(found || (customerId && customerId.length > 0)){
			if(customerId && customerId.length > 0){
				if(data['customerId'] == customerId){
					var order = inflateResponseObject(data,billingInfo,shippingInfo,customerInfo,items);
					orders.push(order);
				}
			}else{
				var order = inflateResponseObject(data,billingInfo,shippingInfo,customerInfo,items);
				orders.push(order);
			}
		}
	});
	var responseObj = {
		"orders": orders
	};
	res.json(responseObj);
});

module.exports = router;
