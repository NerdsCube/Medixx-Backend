const Appointment = require("../models/Appointment");

const appoint = async (req, res) => {
  const today = moment().startOf("day");

  const { fullName, email, phoneNumber, purpose, appointDate } = req.body;

  await Appointment.findOne({ fullName, email, phoneNumber, purpose, appointDate }).then(
    (appointment) => {
      if (appointment) {
        return res.status(400).json({ error: "Appointment Already Exists" });
      } else {
        const newAppointment = new Appointment({
            fullName,
            email,
            phoneNumber,
            purpose,
            appointDate 
        });

        newAppointment
          .save()
          .then((newAppointment) => {
            res.json(newAppointment);
          })
          .catch((err) => console.log(err));
      }
    }
  );
};


module.exports = { appoint };