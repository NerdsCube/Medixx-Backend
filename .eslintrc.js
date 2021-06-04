/* eslint-disable comma-dangle */
module.exports = {
  extends: "airbnb-base",
  rules: {
    "comma-dangle": ["error", "never"],
    "no-param-reassign": ["error", { props: false }],
    // eslint-disable-next-line comma-dangle
    quotes: ["error", "double"],
  },
};
