import PropTypes from "prop-types";

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}).isRequired;

export { ingredientPropTypes };