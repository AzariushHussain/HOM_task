# **Inventory Management System**

## **Overview**
This is a **basic Inventory Management System** with full **CRUD functionality**, **user authentication**, and a **frontend (React/Next.js) + backend (Node.js/Express)**.  

## **Features**
✅ **User Authentication** (Register/Login)  
✅ **CRUD Operations** for inventory items (Create, Read, Update, Delete)  
✅ **Frontend**: React or Next.js  
✅ **Backend**: Node.js & Express.js  
✅ **Database**: MongoDB (via Mongoose)  
✅ **API Security**: JWT Authentication  
✅ **Styling**: Bootstrap / TailwindCSS  

## **Live Demo**
🚀 [https://hom-task-bfwb.vercel.app/](#) (Replace with actual link)  

## **Tech Stack**
- **Frontend**: React.js 
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: JWT (JSON Web Token)  
- **Styling**: Bootstrap   
- **Deployment**: Vercel (Frontend & Backend)  

---

## **📡 API Endpoints**

### **Auth Routes**
| Method | Endpoint      | Description |
|--------|--------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get a token |

### **Inventory Routes**
| Method | Endpoint      | Description |
|--------|--------------|-------------|
| GET    | `/api/product`       | Get all inventory items |
| GET    | `/api/product/:id`   | Get single inventory item |
| POST   | `/api/product`       | Create a new inventory item |
| PUT    | `/api/product/:id`   | Update an inventory item |
| DELETE | `/api/product/:id`   | Delete an inventory item |


