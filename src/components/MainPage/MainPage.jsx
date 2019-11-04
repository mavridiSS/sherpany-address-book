import React from "react";
import SearchInput from "../SearchInput/";
import UsersTableWrapper from "../UsersTable/";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function MainPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <div className={"flex-center margin-bottom"}>
        <SearchInput onSearch={setSearchTerm} />

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/settings"
        >
          Settings
        </Button>
      </div>
      <UsersTableWrapper filter={searchTerm} />
    </>
  );
}
