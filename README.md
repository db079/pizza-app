# pizza
Oasis Infobyte Online Pizza App
Project Description
This is a full-stack web application for an online pizza ordering system. The project is built using React, MongoDB, and Node.js. It includes both user and admin functionality with features such as registration, authorization, email verification, and a password system.

Features
User Registration and Login:

Users can create an account and log in with complete registration and authorization.
Email verification is implemented for user accounts.
Dashboard:

After logging in, users are directed to the dashboard.
The dashboard displays available pizza varieties.
Pizza Customization:

Users can create custom pizzas by following these steps:
Choose from five pizza base options.
Select one of five available sauces.
Pick their preferred cheese type.
Add vegetables from a list of options.
Payment Integration:

Razorpay checkout is integrated for payment.
A test mode is available for payment processing.
On successful payment, the order is placed and confirmed.
Admin Features:

Admin login with access to an inventory management system.
Admin can track the available stock of pizza base, sauce, cheese, veggies, and meat.
After an order, stock levels are automatically updated and presented in the admin dashboard.
Stock Notification:

A notification is scheduled to be sent to the admin's email when the available stock goes below a threshold value.
This helps in maintaining stock levels, and an email is triggered when, for example, the total pizza base is below 20 after consecutive orders.
Order Management:

Admins receive orders and can change the status of each order, such as "Order Received," "In the Kitchen," and "Out for Delivery."
Technologies Used
Client (Frontend)
React
Ant Design (antd)
Axios
React Router
React Icons
Moment.js
React Helmet
React Hot Toast
React Toastify
Web Vitals
Server (Backend)
Node.js
Express.js
MongoDB
JWT (JSON Web Tokens)
Mongoose
Multer
Nodemailer
Razorpay
Slugify
Bcrypt
Body-parser
Cors
Dotenv
Morgan
Nodemon
How to Run the Project
To run the project, you need to follow these steps:

Clone the repository to your local machine.

bash
Copy code
git clone <repository-url>
Install the necessary dependencies for both the client and server:

For the client:

bash
Copy code
cd client
npm install
For the server:

bash
Copy code
cd server
npm install
Start the development server. You can use the concurrently package to run both the client and server simultaneously.

bash
Copy code
npm run dev
Visit the application in your web browser at http://localhost:3000 for the client and http://localhost:5000 for the server.

Output
You can upload images and their corresponding headings for the project's output in the "output" folder. These images and headings should illustrate the application's functionality, features, and user interface.

