export default{
    "type":"object",
    "properties":{
        "products":{
            "type":"array",
            "minItems": 30,
            "items":{
                "type": "object",
                "properties":{
                    "id":{
                        "type":"integer",
                        "minimum":1,
                        "unique":true
                    },
                    "name":{
                        "type":"string",
                        "faker":"commerce.product"
                    },
                    "category":{
                        "type":"string",
                        "enum":[
                            "Watersports",
                            "Soccer",
                            "Chess"    
                        ]
                    },
                    "description":{
                        "type":"string",
                        "faker":"lorem.sentence"
                    },
                    "price":{
                        "type":"float",
                        "faker": "finance.amount"
                    }
                },
                "required":["id", "name", "category", "price"]
            }
        }
    },
    "required":["products", "orders"]
}