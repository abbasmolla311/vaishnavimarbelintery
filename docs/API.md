# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Products

#### Get All Products
```
GET /products
GET /products?category=floor_tiles
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Marble Floor Tile",
      "category": "floor_tiles",
      "price": 500,
      "image_url": "url",
      "description": "Premium marble tile",
      "stock": 100
    }
  ]
}
```

#### Get Product Details
```
GET /products/:id
```

### Inquiries

#### Create Inquiry
```
POST /inquiries
Content-Type: application/json

{
  "customer_name": "John Doe",
  "phone": "+919876543210",
  "whatsapp": "+919876543210",
  "product_id": "uuid",
  "quantity": 100,
  "custom_specs": {
    "color": "White",
    "finish": "Glossy",
    "size": "24x24 inches"
  }
}
```

Response:
```json
{
  "success": true,
  "inquiry_id": "uuid",
  "message": "Inquiry created. We'll contact you on WhatsApp soon!"
}
```

#### Get All Inquiries
```
GET /inquiries
GET /inquiries?status=pending
```

### Orders

#### Get Orders
```
GET /orders
GET /orders/:id
```

#### Update Order Status
```
PATCH /orders/:id
Content-Type: application/json

{
  "status": "processing",
  "payment_status": "completed"
}
```

### WhatsApp Webhook

#### Receive WhatsApp Messages
```
POST /whatsapp/webhook
```

This endpoint receives WhatsApp messages and automatically creates/updates inquiries.

### AI Customization

#### Generate Customized Image
```
POST /ai/customize
Content-Type: application/json

{
  "product_id": "uuid",
  "color": "#FF5733",
  "finish": "matte",
  "size": "600x600"
}
```

Response:
```json
{
  "success": true,
  "original_image": "url",
  "customized_image": "url",
  "customization_id": "uuid"
}
```

## Error Responses

```json
{
  "success": false,
  "error": "Error message here",
  "status": 400
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error
