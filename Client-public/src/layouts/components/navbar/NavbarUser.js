import React from "react"
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge
} from "reactstrap"
import axios from "axios"
import * as Icon from "react-feather"
import classnames from "classnames"
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent"
import { history } from "../../../history"
import ConstantList from "../../../configs/appConfig";
import UserService from "./UserService";
import jwtAuthService from "../../../views/pages/authentication/login/jwtAuthService";

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
    currentUser: {}
  }
  logOut = () => {
    if(ConstantList.AUTH_MODE=="Keycloak"){
      UserService.doLogout();
      jwtAuthService.setSession(null);
      jwtAuthService.removeUser();
      history.push(ConstantList.HOME_PAGE)
    }else{
      let url = ConstantList.API_ENPOINT + "/oauth/logout";
      let res = axios.delete(url);
      jwtAuthService.setSession(null);
      jwtAuthService.removeUser();
      history.push(ConstantList.HOME_PAGE)
      window.location.reload(true);
    }
  }
  
  logIn = () => {
    history.push(ConstantList.ROOT_PATH + "/authentication/login")
  }
  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult })
    })
    this.getCurrentUser().then(({ data }) => {
      if (data != null && data.id != null) {
        this.setState({ currentUser: data });
      }
    })
  }
  async getCurrentUser() {
    let url = ConstantList.API_ENPOINT + "/api/users/getCurrentUser";
    return await axios.get(url);
  };
  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
  }
  render() {
    let {currentUser} = this.state;
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <NavItem className="nav-search" onClick={this.handleNavbarSearch}>
          {/* <NavLink className="nav-link-search">
            <Icon.Search size={21} data-tour="search" />
          </NavLink> */}
          <div
            className={classnames("search-input", {
              open: this.state.navbarSearch,
              "d-none": this.state.navbarSearch === false
            })}
          >
            <div className="search-input-icon">
              <Icon.Search size={17} className="primary" />
            </div>
            <Autocomplete
              className="form-control"
              suggestions={this.state.suggestions}
              filterKey="title"
              filterHeaderKey="groupTitle"
              grouped={true}
              placeholder="Explore Vuexy..."
              autoFocus={true}
              clearInput={this.state.navbarSearch}
              externalClick={e => {
                this.setState({ navbarSearch: false })
              }}
              onKeyDown={e => {
                if (e.keyCode === 27 || e.keyCode === 13) {
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay("")
                }
              }}
              customRender={(
                item,
                i,
                filteredData,
                activeSuggestion,
                onSuggestionItemClick,
                onSuggestionItemHover
              ) => {
                const IconTag = Icon[item.icon ? item.icon : "X"]
                return (
                  <li
                    className={classnames("suggestion-item", {
                      active: filteredData.indexOf(item) === activeSuggestion
                    })}
                    key={i}
                    onClick={e => onSuggestionItemClick(item.link, e)}
                    onMouseEnter={() =>
                      onSuggestionItemHover(filteredData.indexOf(item))
                    }
                  >
                    <div
                      className={classnames({
                        "d-flex justify-content-between align-items-center":
                          item.file || item.img
                      })}
                    >
                      <div className="item-container d-flex">
                        {item.icon ? (
                          <IconTag size={17} />
                        ) : item.file ? (
                          <img
                            src={item.file}
                            height="36"
                            width="28"
                            alt={item.title}
                          />
                        ) : item.img ? (
                          <img
                            className="rounded-circle mt-25"
                            src={item.img}
                            height="28"
                            width="28"
                            alt={item.title}
                          />
                        ) : null}
                        <div className="item-info ml-1">
                          <p className="align-middle mb-0">{item.title}</p>
                          {item.by || item.email ? (
                            <small className="text-muted">
                              {item.by
                                ? item.by
                                : item.email
                                  ? item.email
                                  : null}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      {item.size || item.date ? (
                        <div className="meta-container">
                          <small className="text-muted">
                            {item.size
                              ? item.size
                              : item.date
                                ? item.date
                                : null}
                          </small>
                        </div>
                      ) : null}
                    </div>
                  </li>
                )
              }}
              onSuggestionsShown={userInput => {
                if (this.state.navbarSearch) {
                  this.props.handleAppOverlay(userInput)
                }
              }}
            />
            <div className="search-input-close">
              <Icon.X
                size={24}
                onClick={(e) => {
                  e.stopPropagation()
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay("")
                }}
              />
            </div>
          </div>
        </NavItem>
        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          {currentUser != null && currentUser.id != null ? (
            <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
              <DropdownToggle tag="a" className="nav-link dropdown-user-link">
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name text-bold-600">
                  {currentUser.displayName}
                  </span>
                  <span className="user-status"></span>
                </div>
                <span data-tour="user">
                  <img
                    src={this.props.userImg}
                    className="round"
                    height="40"
                    width="40"
                    alt="avatar"
                  />
                </span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a" href="#">
                  <Icon.User size={14} className="mr-50" />
                  <span className="align-middle">Tài khoản</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  onClick={() => this.logOut()}
                >
                  <Icon.Power size={14} className="mr-50" />
                  <span className="align-middle">Đăng xuất</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
              <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
                <DropdownToggle tag="a" className="nav-link dropdown-user-link">
                  <div className="user-nav d-sm-flex d-none">
                    <DropdownItem tag="a" href="#" onClick={() => this.logIn()}>
                      <Icon.User size={14} className="mr-50" />
                      <span className="align-middle">Đăng nhập</span>
                    </DropdownItem>
                  </div>
                </DropdownToggle>
              </UncontrolledDropdown>
            )}
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
