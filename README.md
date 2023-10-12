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
  
  ![fs](https://github.com/db079/pizza/assets/138355007/338de454-b5c6-4b95-b81f-d5c676a019ce)
    ![fs](https://github.com/db079/pizza/assets/138355007/338de454-b5c6-4b95-b81f-d5c676a019ce)



- Home Page
  
  ![home](https://github.com/db079/pizza/assets/138355007/eee3b48e-cb68-4216-97a5-d3876d2e55fa)

  
- Register
  
  ![register](https://github.com/db079/pizza/assets/138355007/af6428a9-276d-46d6-ae8e-03e3658a420d)

- Email sent
  
 ![email sent](https://github.com/db079/pizza/assets/138355007/5f6ae03d-f5a7-4756-be1f-e42c2f2f4367)

- verify
  
  ![verify](https://github.com/db079/pizza/assets/138355007/a3adf803-8d5b-4b57-ba87-81a82fa716cd)

- Login
  
  ![login](https://github.com/db079/pizza/assets/138355007/4dce4cdc-2304-4e0e-b848-cb5ebfde1bf9)

- Home page and product filter
  
  ![homeandfilter](https://github.com/db079/pizza/assets/138355007/aa9efa5d-679d-4cd7-adc7-e086e5dca7e4)

- Category wise products
  
   ![categories](https://github.com/db079/pizza/assets/138355007/42033dcd-0002-450e-ab2b-181746f7726d)

- Add to cart
  
  ![Screenshot 2023-10-10 165146](https://github.com/db079/pizza/assets/138355007/49684965-e7ba-4cc5-9798-3784662c3bf9)

- Cart
  
  ![emptycart](https://github.com/db079/pizza/assets/138355007/68292378-0c57-443d-a4e6-2dd24b59cad5)

  ![cart](https://github.com/db079/pizza/assets/138355007/0546869e-7906-47ec-8fc1-cbadbc7a7255)

  
-custom pizza

  ![custom](https://github.com/db079/pizza/assets/138355007/d9348890-145a-4ac1-a931-ea942c6d11b7)


- Checkout and Payment successfull

  
  ![prepay](https://github.com/db079/pizza/assets/138355007/2be5d3fc-9249-40ce-a214-bfe240b28445)
   ![Screenshot 2023-10-10 165317](https://github.com/db079/pizza/assets/138355007/e8dec38e-e097-4cae-8faf-a3a5f109fcf7)
  ![paymentsuccess](https://github.com/db079/pizza/assets/138355007/4d34c574-4e00-4adb-80b9-2831c08c75ea)

- User Dashboard
  
  ![image](https://github.com/db079/pizza/assets/138355007/01f6cccd-2cf1-4eff-b023-adb2de0e70bd)

- Orders
  ![order](https://github.com/db079/pizza/assets/138355007/2a556015-c72b-4318-8868-66cd8220fbf5)

  


- Admin Dashboard
  
  ![admindash](https://github.com/db079/pizza/assets/138355007/7383bb19-06ea-46c4-8d85-f6b7fee1b544)

- Product
  
  ![update product](https://github.com/db079/pizza/assets/138355007/c9809749-8fff-45a0-aeae-28de4759c83e)


- Category
  
  ![adminCat](https://github.com/db079/pizza/assets/138355007/c97ff70d-fef8-47ac-836a-2fb503f1a1db)

- Stock
  
  ![base](https://github.com/db079/pizza/assets/138355007/2e27ad6a-f563-467d-98d0-1f07d2245318)

- Stock Alert
  
  ![Screenshot 2023-10-10 171308](https://github.com/db079/pizza/assets/138355007/d4a20ac2-5d51-4fba-b4ac-c69e08634806)

- Orders
  
 ![orders](https://github.com/db079/pizza/assets/138355007/e5c26f26-8ef2-4c66-82d9-36aa52d5b134)

- Status change
  
  ![image](https://github.com/db079/pizza/assets/138355007/365f6b69-e467-4152-ac0c-9e152fcbbfd2)

  



   
