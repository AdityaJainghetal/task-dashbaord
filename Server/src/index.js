const express = require("express");
require("dotenv").config(); // ✅ Make sure this is on top

const dbConnect = require("./config/dbConnect");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoute");
const checkoutPageRoutes= require("./routes/checkRoute");
const adminRoutes = require("./routes/adminRoute")
dbConnect(); // ✅ Connect to DB

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const cors = require('cors');
app.use(cors());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/checkout-pages", checkoutPageRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
