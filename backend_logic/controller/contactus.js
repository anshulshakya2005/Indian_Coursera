const mailsender = require("../utils/mailsender");

exports.contactus = async (req, res) => {
  console.log("above try of contact use");
  try {
    console.log("entering the contact us controller");
    const { firstname, lastname, email, contactnumber, message } = req.body;

    const body = `
      <h2>New Contact Form</h2>
      <p><b>Name:</b> ${firstname} ${lastname}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${contactnumber}</p>
      <p><b>Message:</b> ${message}</p>
    `;

    await mailsender("naitikshakya01@gmail.com", "New Contact Message", body);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending email",
    });
  }
};