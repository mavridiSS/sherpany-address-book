import { connect } from "react-redux";
import Settings from "./Settings";
import { updateSettings } from "../../actions";

const mapStateToProps = ({ settings }) => ({
  settings
});

export default connect(
  mapStateToProps,
  { updateSettings }
)(Settings);
