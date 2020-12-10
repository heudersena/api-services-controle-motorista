const calc = (data) => {
  if (new Date().getTime() > data.getTime()) {
    return 0;
  } else {
    return Math.ceil(
      Math.abs(new Date().getTime() - data.getTime()) / 86400000
    );
  }
};

module.exports = calc;
