import PropTypes from "prop-types";

const Image = (props) => {
   return (
      <img width={60} height={60} src={props.data.image_url} />
   )
}

export default Image

Image.propTypes = {
   data: PropTypes.object.isRequired
}