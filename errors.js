class LoadDataError extends Error {
  constructor(err) {
    super(err.message);
    this.name = "LoadDataError";
  }
}

module.export = {
  LoadDataError,
};
