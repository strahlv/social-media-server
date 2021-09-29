const { DateTime, Interval } = require("luxon");

module.exports = (schema) => {
  const calcIntervalFromJSDate = (from) => {
    const start = DateTime.fromJSDate(from);
    const end = DateTime.now();
    const interval = Interval.fromDateTimes(start, end);

    let age = interval.length("minutes");
    if (age < 60) {
      return `${Math.floor(age)} minute(s) ago`;
    }

    age = interval.length("hours");
    if (age < 24) {
      return `${Math.floor(age)} hour(s) ago`;
    }

    age = interval.length("days");
    if (age < 7) {
      return `${Math.floor(age)} day(s) ago`;
    }

    age = interval.length("weeks");
    if (age < 4) {
      return `${Math.floor(age)} week(s) ago`;
    }

    age = interval.length("months");
    if (age < 12) {
      return `${Math.floor(age)} month(s) ago`;
    }

    age = interval.length("years");
    return `${Math.floor(age)} year(s) ago`;
  };

  schema.virtual("createdAge").get(function () {
    return calcIntervalFromJSDate(this.createdAt);
  });

  schema.virtual("updatedAge").get(function () {
    return calcIntervalFromJSDate(this.updatedAt);
  });
};
