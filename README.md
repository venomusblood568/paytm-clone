# Paytm Clone

### ⚙️ Tech Stack Backend

|  Tech     | Description                                     |
|------------|----------------------------------------------------|
| **Express** | Fast, minimalist web framework for Node.js         |
| **Mongoose** | MongoDB ODM for schema-based data modeling        |
| **Zod**     | Type-safe schema validation for request payloads   |
| **JSONWEBTOKEN** |JWT securely verifies user identity between client and server. |
---

###  Error Status Codes Backend

|  Code |  Meaning                 |  When to Use |
|--------:|---------------------------|----------------|
| `200`     |         **OK**          |  General success (e.g., fetched user, wallet balance, etc.)               |
|`201`    | **Created**              | Resource created successfully (e.g., user signup, new transaction)|
|`204`    | **No Content**           |Successfully processed but no data to return (e.g., delete request)|
| `400`   |  **Bad Request**         | Missing or invalid fields (e.g., amount, phone number) |
| `401`   |  **Unauthorized**        | User not logged in or token missing/invalid |
| `403`   |  **Forbidden**           | Authenticated but not allowed (e.g., admin-only route) |
| `402`   |  **Payment Required**    | Payment failed (e.g., insufficient balance, card declined) |
| `409`   |  **Conflict**            | Duplicate action (e.g., UPI already linked) |
| `422`   |  **Unprocessable Entity**| Data format is valid, but can't be processed (e.g., expired card) |
| `500`   |  **Internal Server Error** | Server error or unexpected exception |
| `503`   |  **Service Unavailable** | Payment gateway or third-party service down |