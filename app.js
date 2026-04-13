const twilio = require("twilio");

const clientTwilio = twilio("ACe470d5c461d74f3374677daf01e708cb", "91d1d84cdedd72252ac29045d543cc9e");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MESSAGE
const message = `Hello KENT customer,

ALERT MESSAGE!

This message is from SKYLINE SERVICES - KENT RO Authorised Service Center. Your KENT purifier was installed from our service centre.

This is just an Awareness message:

Local fraud vendors (Aqua Pure Gal / Agamya Enterprises etc.) in our area calling Kent customers and informs they are calling from KENT for water purifier free service and fix the visit appointment for service. They replacing the original filters with first copy filters or duplicate filters in KENT Machine.

So please beware of such FRAUD.

Please service or replace filters from Kent Authorised Service Centre (SKYLINE SERVICES) only. Please call on below numbers.

8433858428 / 7304613203  
Or you can register your call on 92789 12345 - Kent service helpline number / download Kent customer service app for service.

Thanks`;

// CLIENTS
const clients = [
  { phone: "918591096280" },

];

// GET CLIENTS
app.get("/clients", (req, res) => {
  res.json(clients);
});

// SEND MESSAGE
app.post("/send", async (req, res) => {
  const client = req.body;

  try {
    await clientTwilio.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+${client.phone}`,
      body: message
    });

    console.log(`Sent to ${client.phone}`);

    res.json({ success: true, message });

  } catch (error) {
    console.log("Error:", error.message);

    res.json({ success: false });
  }
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});