import React, { Component } from "react";
import PropTypes from "prop-types";
import IdleWatcher, { getAPIurl } from "../../utils";
import { IDLE_TIME, MAX_PAGE_COUNT } from "../../constants";
import UsersTable from "./UsersTable";
import { connect } from "react-redux";

/**
 * Act as a container for UsersTable, hold the data and the logic for prefetching data when user is idle
 * Why data is not in Redux - data is relevant only for this component so no point to keep it in Redux
 * @export
 * @class UsersTableWrapper
 * @extends {Component}
 */
export class UsersTableWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      shouldUpdateTable: true
    };

    this.usersTableRef = React.createRef();
    this.pageCounter = 0;
    this.idleWatcher = new IdleWatcher(IDLE_TIME, this.onIdle);
  }

  /**
   * Attach scroll event listener
   * Fetch the first page
   * Starts tracking if user is idle
   * @memberof UsersTableWrapper
   */
  componentDidMount() {
    this.idleWatcher.watch();
    this.usersTableRef.current.addEventListener("scroll", this.onScroll);
    this.fetchData(++this.pageCounter);
  }

  /**
   * Check whether user has scrolled to the bottom of the element
   * Display prefetched data if the user has scrolled to the bottom and a prefetch has been made
   * Otherwise if it is not the last page we fetch data for the next page
   * @memberof UsersTableWrapper
   */
  onScroll = () => {
    if (
      this.usersTableRef.current.scrollTop +
        this.usersTableRef.current.clientHeight >=
      this.usersTableRef.current.scrollHeight
    ) {
      if (!this.state.shouldUpdateTable) {
        this.setState({
          shouldUpdateTable: true
        });
      } else if (this.pageCounter <= MAX_PAGE_COUNT) {
        this.setState({ loading: true });
        this.fetchData(++this.pageCounter);
      }
    }
  };

  /**
   * Filter data by first and last name
   * Case insensitive
   * @returns {Object[]} The users who match the filter
   * @memberof UsersTableWrapper
   */
  getFilteredData() {
    if (this.props.filter) {
      return this.state.data.filter(
        item =>
          `${item.name.first} ${item.name.last}`.toLowerCase() ===
          this.props.filter.toLowerCase()
      );
    }

    return this.state.data;
  }

  /**
   * Fetch data for page and set shouldUpdateTable
   *
   * @param {number} page
   * @param {boolean} [shouldUpdateTable=true]
   * @memberof UsersTableWrapper
   */
  fetchData(page, shouldUpdateTable = true) {
    const url = getAPIurl(page, this.props.settings);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState(prevState => ({
          data: [...prevState.data, ...res.results],
          loading: false,
          shouldUpdateTable
        }));
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.shouldUpdateTable;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.idleWatcher.remove();
  }

  /**
   * Invoked if user is idle
   * Fetch data without updating UsersTable if it is not the last page
   * @memberof UsersTableWrapper
   */
  onIdle = () => {
    if (this.pageCounter <= MAX_PAGE_COUNT)
      this.fetchData(++this.pageCounter, false);
  };

  render() {
    return (
      <div className="users-table" ref={this.usersTableRef}>
        <UsersTable
          data={this.getFilteredData()}
          loading={this.state.loading}
          page={this.pageCounter}
        />
      </div>
    );
  }
}

UsersTableWrapper.propTypes = {
  filter: PropTypes.string,
  settings: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({ settings: state.settings });

export default connect(mapStateToProps)(UsersTableWrapper);
