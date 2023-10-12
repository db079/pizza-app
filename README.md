# Oasis Infobyte Online Pizza App

## Project Description

This is a full-stack web application for an online pizza ordering system. The project is built using React, MongoDB, and Node.js. It includes both user and admin functionality with features such as registration, authorization, email verification, and a password system.

## Features

1. **User Registration and Login:**
   - Users can create an account and log in with complete registration and authorization.
   - Email verification is implemented for user accounts.

2. **Dashboard:**
   - After logging in, users are directed to the dashboard.
   - The dashboard displays available pizza varieties.

3. **Pizza Customization:**
   - Users can create custom pizzas by following these steps:
     - Choose from five pizza base options.
     - Select one of five available sauces.
     - Pick their preferred cheese type.
     - Add vegetables from a list of options.

4. **Payment Integration:**
   - Razorpay checkout is integrated for payment.
   - A test mode is available for payment processing.
   - On successful payment, the order is placed and confirmed.

5. **Admin Features:**
   - Admin login with access to an inventory management system.
   - Admin can track the available stock of pizza base, sauce, cheese, veggies, and meat.
   ]- Admin get notiffied when stock need 
6. **Stock Notification:**
   - A notification is scheduled to be sent to the admin's email when the available stock goes below a threshold value.
   - This helps in maintaining stock levels, and an email is triggered when, for example, the total pizza base is below 5 after consecutive orders.

7. **Order Management:**
   - Admins receive orders and can change the status of each order, such as "Order Received," "In the Kitchen," and "Out for Delivery."

## Technologies Used

### Client (Frontend)

- React
- Ant Design (antd)
- Axios
- React Router
- React Icons
- Moment.js
- React Helmet
- React Hot Toast
- React Toastify
- Web Vitals

### Server (Backend)

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Mongoose
- Multer
- Nodemailer
- Razorpay
- Slugify
- Bcrypt
- Body-parser
- Cors
- Dotenv
- Morgan
- Nodemon

## How to Run the Project

To run the project, you need to follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/db079/pizza-app.git
2. Install the necessary dependencies for both the client and server:

   
   for server use command in root :
   ```bash
   npm install
   ```
   for client
   ```bash
   cd client
   npm install
   ```
4. Set all the environment variable in client and root also.
5. Start the development server. You can use the concurrently package to run both the client and server simultaneously.
   ```bash
   npm run dev
   ```
## Output

- file structure
  
    ![fs](/screenshot/file.jpg)

- Home Page , Regist, Login and Cart before Login
  
  ![home](/screenshot/home.jpg)
  
  ![register](/screenshot/register.jpg)

  ![Login](/screenshot/login.jpg)

  ![cart](/screenshot/cart.jpg)

  
- Register
  
  ![register](/screenshot/register1.jpg)

- Email sent
  
 ![email sent](/screenshot/emailsent.jpg)

- verify
  
  ![verify](/screenshot/emailverify.jpg)

- Login
  
  ![login](/screenshot/login1.jpg)

- Home page and product filter
  
  ![homeandfilter](/screenshot/homefilter.jpg)


- Category wise products

  ![category product](/screenshot/cp1.jpg)

  ![category product](/screenshot/cp1.jpg)


- Add to cart
  
  ![Add to cart](/screenshot/addtocart.jpg)

- Cart

  ![cart](/screenshot/cart1.jpg)

  
-custom pizza

  ![custom](/screenshot/customaddtocart.jpg)


- Checkout and Payment successfull

  
  ![prepay](/screenshot/pay1.jpg)
  ![paying](/screenshot/pay2.jpg)
  ![paying](/screenshot/pay3.jpg)

- User Dashboard
  
  ![image](/screenshot/userdash.jpg)

- Orders
  
  ![order](/screenshot/userorder.jpg)

  


- Admin Dashboard
  
   ![admindash](/screenshot/admindash.jpg)

- Product
   ![update product](/screenshot/admincreateproduct.jpg)
  
   ![update product](/screenshot/adminprodut.jpg)


- Category
  
  ![adminCat](/screenshot/admincate.jpg)

- Stock
  
  ![base](/screenshot/stockbase.jpg)

  ![base](/screenshot/stocksauce.jpg)


- Stock Alert
  
  ![alert](/screenshot/stockalert.jpg)

- Orders
  
 ![orders](/screenshot/adminorder.jpg)


  



   
