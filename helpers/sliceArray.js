const sliceArray = (array, size) =>
  array.reduce(
    (p, c) => {
      if (p[p.length - 1].length == size) {
        p.push([]);
      }

      p[p.length - 1].push(c);
      return p;
    },
    [[]]
  );

module.exports = {
  sliceArray,
};
