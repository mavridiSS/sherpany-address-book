import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NATIONALITIES } from "../../constants";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

export default function Settings(props) {
  const onNationalityChange = e => {
    e.preventDefault();
    props.updateSettings(e.target.value);
  };

  return (
    <>
      <div className="margin-bottom" style={{ width: "25%" }}>
        <InputLabel id="nationalities-select-label">Nationalities</InputLabel>
        <Select
          labelId="nationalities-select-label"
          id="nationalities-select"
          multiple
          value={props.settings}
          onChange={onNationalityChange}
          input={
            <Input inputProps={{ "data-testid": "nationalities-select" }} />
          }
          fullWidth
        >
          {Object.keys(NATIONALITIES).map(nationality => {
            return (
              <MenuItem key={nationality} value={NATIONALITIES[nationality]}>
                {nationality}
              </MenuItem>
            );
          })}
        </Select>
      </div>

      <div>
        <Button variant="contained" color="primary" component={Link} to={"/"}>
          Home
        </Button>
      </div>
    </>
  );
}

Settings.propTypes = {
  updateSettings: PropTypes.func,
  settings: PropTypes.arrayOf(PropTypes.string)
};
