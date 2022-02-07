const { buildSchema } = require("graphql");

module.exports = buildSchema(`

        type tokenType{
          userId:ID
          token:String
          ExpirationIn:Int
        },
        input userInput{
            fullname:String
            email:String!
            password:String!
        }
        type userType{
            _id:ID!
            email:String
            password:String
            fullname:String
        },
        input productInput{
            name:String!        
            image:String!
            description:String!
            price:Int!
            category:String!
            count:Int
        }
        type productType{
            _id:ID!
            name:String
            image:String
            description:String
            price:Int
            category:String
            count:Int
        },
        input shippingInput{
            houseNo:String
            phone:String
            address:String
        }
        type shippingType{  
            houseNo:String
            phone:String
            address:String
        }
        type orderType{
            _id:ID!
            user:userType
            orderItems:[productType]
            shippingDetails:shippingType
            totalPrice:Int
            isDelivered:Boolean
        }
        type rootQuery{
            products:[productType!]!
            Orders:[orderType!]
        },
        type rootMutation{
            login(email:String!,password:String!):tokenType!
            signUp(UserInput:userInput):tokenType!
            createProduct(ProductInput:productInput):productType!
            addToCart(productId:ID):orderType
            shipping(ShippingInput:shippingInput):orderType
            deleteCart(productId:ID):orderType
            
        },
        schema{
            query:rootQuery 
            mutation:rootMutation
        }
      `);
