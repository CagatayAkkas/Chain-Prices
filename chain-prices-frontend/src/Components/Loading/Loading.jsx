import { Box, CircularProgress, circularProgressClasses } from '@mui/material';
import PropTypes from "prop-types";
import { StyledLoading } from './Loading.style';

const Loading = (props) => {
   return (
      <StyledLoading blur={props.blur}>
        <Box position={"relative"}>
          <CircularProgress
            variant="determinate"
            sx={{
              color: (theme) =>
                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            }}
            size={props.size}
            thickness={props.thickness}
            value={100}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
              color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
              animationDuration: '550ms',
              position: 'absolute',
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
              },
            }}
            size={props.size}
            thickness={props.thickness}
          />
        </Box>
      </StyledLoading>
    );
}

export default Loading

Loading.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  blur: PropTypes.bool
}

Loading.defaultTypes = {
  size: 40,
  thickness: 4,
  blur: false
}