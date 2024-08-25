const express = require("express");
const app = express();
const cors = require("cors"); 

app.use(cors());
app.use(express.json());

const userInfo = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123",
};

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid data format" });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercase = "";

    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (typeof item === "string") {
        alphabets.push(item);
        if (
          item === item.toLowerCase() &&
          (!highestLowercase || item > highestLowercase)
        ) {
          highestLowercase = item;
        }
      }
    });

    res.json({
      is_success: true,
      user_id: userInfo.user_id,
      email: userInfo.email,
      roll_number: userInfo.roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
