const cron = require("node-cron");
const db = require("../models/index");
const User = db.Users;
const { Op } = require("sequelize");
const moment = require("moment");

// scheduling a task of logging hello on console at 10:56 am everyday of every month at thursday :
exports.task = cron.schedule(
  "0 * * * * *",
  async () => {
    const user = await User.findAll({
      where: { otp_generation_timestamp: { [Op.not]: null } },
    });
    const currentDate = moment(new Date());
    if (user.length > 0) {
      user.forEach(async (element) => {
        const timestamp = moment(element.otp_generation_timestamp);
        if (currentDate.diff(timestamp) > 600000) {
          await User.update(
            {
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
