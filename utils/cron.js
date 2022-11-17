const cron = require("node-cron");
const db = require("../models/index");
const User = db.Users;
const { Op } = require("sequelize");

// scheduling a task of logging hello on console at 10:56 am everyday of every month at thursday :
exports.task = cron.schedule(
  "* * * * * *",
  async () => {
    const user = await User.findAll({
      where: { otp_generation_timestamp: { [Op.not]: null } },
    });
    if (user) {
      user.forEach(async (element) => {
        if (new Date() - element.otp_generation_timestamp > 600000) {
          await User.update(
            {
              firstName: element.firstName,
              lastName: element.lastName,
              username: element.username,
              age: element.age,
              email: element.email,
              phone: element.phone,
              password: element.password,
              roleId: element.roleId,
              otp: null,
              otp_generation_timestamp: null,
            },
            { where: { email: element.email } }
          );
        }
      });
    }
  },
  {
    scheduled: false,
  }
);
