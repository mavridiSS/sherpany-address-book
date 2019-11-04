import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function SearchInput(props) {
  const [value, setValue] = React.useState("");

  const onSearchClick = e => {
    e.preventDefault();

    props.onSearch(value);
  };

  return (
    <div className="flex-center flex1">
      <TextField
        value={value}
        onChange={e => setValue(e.target.value)}
        id="standard-basic"
        margin="normal"
        inputProps={{ "data-testid": "search-input" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearchClick}
        data-testid="search-button"
      >
        Search
      </Button>
    </div>
  );
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
};
