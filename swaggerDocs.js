const swaggerSpecs = {
    "openapi": "3.0.0",
    "info": {
        "title": "eCommerce-Flipzon",
        "description": "These are API Docs for eCommerce Platform Flipzon.",
        "version": "0.1.9"
    },
    "servers": [
        {
            "url": "http://localhost:3000",
        },
        {
            "url": "https://ecommerce-flipzon.onrender.com",
        },
    ],
    "components": {
        "schemas": {
            "saleModel": {
                "type": 'object',
                "properties": {
                    "saleId": {
                        "type": "string",
                    },
                    "itemId": {
                        "type": "string",
                    },
                    "quantity": {
                        "type": "number"
                    },
                    "startTime": {
                        "type": "string"
                    },
                    "endTime": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    },
                }
            },
            "salesRequest": {
                "type": "object",
                "properties": {
                    "itemId": {
                        "type": "string"
                    },
                    "quantity": {
                        "type": "number"
                    },
                    "startTime": {
                        "type": "string"
                    },
                    "endTime": {
                        "type": "string"
                    },
                }
            },
            "saleModelResponse": {
                "type": 'object',
                "properties": {
                    "success": {
                        "type": "string",
                    },
                    "message": {
                        "type": "string",
                    },
                    "data": {
                        "type": 'object',
                        "properties": {
                            "saleId": {
                                "type": "string",
                            },
                            "itemId": {
                                "type": "string",
                            },
                            "quantity": {
                                "type": "number"
                            },
                            "startTime": {
                                "type": "string"
                            },
                            "endTime": {
                                "type": "string"
                            },
                            "status": {
                                "type": "string"
                            },
                        }
                    }
                }
            },
            "saleModelGetResponse": {
                "type": 'object',
                "properties": {
                    "success": {
                        "type": "string",
                    },
                    "sale": {
                        "type": 'object',
                        "properties": {
                            "saleId": {
                                "type": "string",
                            },
                            "itemId": {
                                "type": "string",
                            },
                            "quantity": {
                                "type": "number"
                            },
                            "startTime": {
                                "type": "string"
                            },
                            "endTime": {
                                "type": "string"
                            },
                            "status": {
                                "type": "string"
                            },
                        }
                    }
                }
            },
            "saleModelError": {
                "type": "object",
                "properties": {
                    "success": {
                        "type": "boolean"
                    },
                    "message": {
                        "type": "string"
                    }
                }
            },
            "purchaseSchema": {
                "type": 'object',
                "properties": {
                    "purchaseId": {
                        "type": "string",
                    },
                    "saleId": {
                        "type": "string",
                    },
                    "userId": {
                        "type": "string",
                    },
                    "quantity": {
                        "type": "number"
                    },
                    "status": {
                        "type": "string"
                    },
                    "timestamp": {
                        "type": "string"
                    },
                }
            },
            "purchaseRequest": {
                "type": 'object',
                "properties": {
                    "saleId": {
                        "type": "string",
                    },
                    "userId": {
                        "type": "string",
                    },
                    "quantity": {
                        "type": "number"
                    }
                }
            },
            "purchaseError": {
                "type": "object",
                "properties": {
                    "success": {
                        "type": "boolean"
                    },
                    "message": {
                        "type": "string"
                    }
                }
            },
        },
    },
    "paths": {
        "/api/flashsales": {
            "post": {
                "tags": ["Sales"],
                "summary": "Create a new sale",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/salesRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Product is added for sale",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/saleModelResponse"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Product is not added for sale",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/saleModelError"
                                }
                            }
                        }
                    },
                }
            }
        },
        "/api/flash-sales/{saleId}": {
            "get": {
                "tags": ["Sales"],
                "summary": "Get a sale detail",
                "parameters": [
                    {
                        "in": "path",
                        "name": "saleId",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Get the sale details by entering sale id",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/saleModelGet"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Sale Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/saleModelError"
                                }
                            }
                        }
                    },
                }
            }
        },
        "/api/purchases": {
            "post": {
                "tags": ["Purchases"],
                "summary": "Create a new purchase",
                "requestBody": {
                    "description": "Purchase Item in Sale",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/purchaseRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Purchase Details",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "boolean"
                                        },
                                        "message": {
                                            "type": "string"
                                        },
                                        "purchase": {
                                            "$ref": "#/components/schemas/purchaseSchema"
                                        }
                                    },
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Sale Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    },
                                    "required": ["message"]
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    },
                                    "required": ["message"]
                                }
                            }
                        }
                    },
                }
            }
        },
        "/api/purchases/{purchaseId}": {
            "get": {
                "tags": ["Purchases"],
                "summary": "Get a purchase detail",
                "parameters": [
                    {
                        "in": "path",
                        "name": "purchaseId",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Get Purchase details by purchase Id",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/purchaseSchema"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Purchase Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/purchaseError"
                                }
                            }
                        }
                    },
                }
            }
        },
    }
}

module.exports = swaggerSpecs