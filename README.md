# Introduction 
VonGo is a proof-of-concept project that demonstrates a working cashierless, ambient payment vending machine system that uses Ethereum (ETH) as currency (on the Ropsten testnet). In this system, the user simply flashes their item in front of a camera (no barcode needed) to add an item to their cart. When the users finishes his shopping session, s/he can simply walk away and his/her Ethereum wallet will be charged the total of their transaction. This is the API that powers our VonGo vending machine. This API was built by Erik Zettersten and Jake Lundkovsky in Spring 2020. 

# Installation
1. Clone the repository
```
git clone [repository name]
```

2. Navigate into the repository
```
cd VonGo-Api
```

3. Install the necessary dependencies
```
npm i
```

4. Build the project
```
tsc
```

5. Start the server
```
npm start
```

6. Access your application @ http://localhost:3000

7. ???

8. Profit!

# Understanding the Basic API
- This API offers four main routes: products, orders, image, and payments.
- Whenever you see :[someVariable] in a URL, replace that 

1. Products (see /VonGo-Api/routes/image.ts)
- [GET] GetProducts (localhost:3000/api/products)
	- Returns a JSON of all products in inventory
- [GET] Get Product (localhost:3000/api/products/:id)
	- Returns a JSON of a specific product in inventory
	
2. Orders  (see VonGo-Api/routes/orders.ts)
- [GET] GetOrders (localhost:3000/api/orders)
	- Returns a JSON of all current orders
- [GET] CreateEmptyOrder (localhost:3000/api/orders/create-empty)
	- Returns a JSON of all products in inventory
- [GET] GetOrder (localhost:3000/api/orders/:id)
	- Returns a JSON of a specific order
- [GET] AddProduct (localhost:3000/api/orders/:id/add-product/:productId)
	- Returns a JSON of the updated order
- [GET] RemoveProduct (localhost:3000/api/orders/:id/remove-product/:productId)
	- Returns a JSON of the updated order
	
3. Image  (see VonGo-Api/routes/image.ts)
- [GET] GetImageUrl (localhost:3000/api/image)
	- Returns a JSON of potential image matches
	- Must manually edit URL of image within the function in image.ts
- [POST] GetImageLocal (localhost:3000/api/image)
	- Returns a JSON of potential product matches
	
4. Payments  (see VonGo-Api/routes/payment.ts)
- [GET] PayOrder (localhost:3000/api/payment/:orderId/:walletAddress/:privateKey)
	- Pays for an order and returns updated order
	
# Advanced API
- Want further customizability? Check out /Vongo-Api/shared/src/
- There are a few primary files worth checking out:

1. api-config-model.ts
- Customize all of your "environment variables"

2. image-service.ts
- Access functions related to Azure's computer vision services

3. order-service.ts
- Access functions related to processing and updating orders 

4. payment-service.ts
- Access function to pay for orders using the Ethereum Ropsten network

5. product-service.ts
- Access functions related to querying products(s) in inventory


#Usage
- There are two ways someone developing their own application could use this API

1. You can download and run the server and get/post to the routes found in "Understanding the Basic API" section
2. You can directly access the functions in /Vongo-Api/shared/src