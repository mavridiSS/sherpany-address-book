import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getObjPath } from "../../utils";
import { USER_DETAILS_MAPPING } from "../../constants";

export default function UserInfoDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        data-testid={"open-dialog"}
        onClick={handleOpen}
        variant="contained"
        color="primary"
      >
        Info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">User details</DialogTitle>
        <DialogContent>
          {Object.keys(USER_DETAILS_MAPPING).map(item => {
            return (
              <TextField
                key={item}
                margin="dense"
                id="name"
                label={item}
                fullWidth
                value={getObjPath(USER_DETAILS_MAPPING[item], props.data)}
                disabled
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UserInfoDialog.propTypes = {
  data: PropTypes.object
};
