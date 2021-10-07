const { DateTime, Interval } = require("luxon");

module.exports = (schema) => {
  const calcIntervalFromJSDate = (from) => {
    const start = DateTime.fromJSDate(from);
    const end = DateTime.now();
    const interval = Interval.fromDateTimes(start, end);

    let age = interval.length("minutes");
    if (age < 60) {
      const timeUnit = age < 2 ? "minuto" : "minutos";
      return `${Math.floor(age)} ${timeUnit} atrás`;
    }

    age = interval.length("hours");
    if (age < 24) {
      const timeUnit = age < 2 ? "hora" : "horas";
      return `${Math.floor(age)} ${timeUnit} atrás`;
    }

    age = interval.length("days");
    if (age < 7) {
      const timeUnit = age < 2 ? "dia" : "dias";
      return `${Math.floor(age)} ${timeUnit} atrás`;
    }

    age = interval.length("weeks");
    if (age < 4) {
      const timeUnit = age < 2 ? "semana" : "semanas";
      return `${Math.floor(age)} ${timeUnit} atrás`;
    }

    age = interval.length("months");
    if (age < 12) {
      const timeUnit = age < 2 ? "mês" : "meses";
      return `${Math.floor(age)} ${timeUnit} atrás`;
    }

    age = interval.length("years");
    const timeUnit = age < 2 ? "ano" : "anos";
    return `${Math.floor(age)} ${timeUnit} atrás`;
  };

  schema.virtual("createdAge").get(function () {
    return calcIntervalFromJSDate(this.createdAt);
  });

  schema.virtual("updatedAge").get(function () {
    return calcIntervalFromJSDate(this.updatedAt);
  });
};
