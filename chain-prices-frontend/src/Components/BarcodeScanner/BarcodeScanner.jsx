import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { StyledBarcodeScanner } from './Style/BarcodeScanner.style';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Button, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import Scanner from './Scanner';

const BarcodeScanner = ({ onDetected }) => {
  const [open, setOpen] = useState(false);
  const [barcode, setBarcode] = useState(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setBarcode(null)
    setOpen(false)
  };

  const completeProcess = () => {
    onDetected(barcode);
    handleClose();
  }

  return (
    <div>
      <Tooltip title="Barcode Scanner">
        <IconButton onClick={handleOpen}>
          <CropFreeIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBarcodeScanner>
          <div className="header">
            <h3> Barcode Scanner </h3>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <Stack 
            textAlign={"center"} 
            flexDirection={"row"} 
            alignItems={"center"}
            justifyContent={"center"}
            margin={"15px 0"}
            gap={"10px"}
          > 
            <Typography fontWeight={"bold"}> Barcode: </Typography> 
            {barcode}
            {barcode && <Button variant='contained' onClick={completeProcess}> OK </Button>}
          </Stack>
          <Scanner onDetected={(barcode) => setBarcode(barcode)} />
        </StyledBarcodeScanner>
      </Modal>
    </div>
  );
};

export default BarcodeScanner;

BarcodeScanner.propTypes = {
  onDetected: PropTypes.func.isRequired
}
