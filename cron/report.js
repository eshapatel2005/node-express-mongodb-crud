const cron = require("node-cron");

const User = require("../models/user.model");
const Product = require("../models/product.model");

const { sendEmail } = require("../utils/mail.helper");

cron.schedule("*/30 * * * *", async () => {
  try {
    // Count Users
    const userCount = await User.find({ createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) }  }).countDocuments();

    // Count Products
    const productCount = await Product.find({ createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) }  }).countDocuments();
    const date = new Date();


    // Email message
    const message = `
            <h2>CRUD API Report</h2>

            <p>Total Users Created: <b>${userCount}</b></p>

            <p>Total Products Created: <b>${productCount}</b></p>
        `;

    // Email details
    const mailObj = {
      from: `CRUD API ${process.env.FROM_MAIL}`,

      to: process.env.FROM_MAIL,

      subject: "User & Product Report",

      html: message,
    };

    // Send Email
    await sendEmail(mailObj);

    console.log("Report email sent successfully");
  } catch (error) {
    console.log("Report email failed", error);
  }
});
