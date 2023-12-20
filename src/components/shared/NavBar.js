import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavItem,
} from "reactstrap";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveAccount, logout } from "../../state/slices/authSlice";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function NavBar() {
  const dispatch = useDispatch();
  const { isDarkMode, enableDarkMode, disableDarkMode } = useTheme();
  const { t, i18n } = useTranslation();

  const accounts = useSelector((state) => state.auth.user.accounts);
  const activeAccount = useSelector((state) => state.auth.activeAccount);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const handleActiveAccountChange = (account) => {
    dispatch(
      changeActiveAccount({
        account,
      }),
    );
  };

  return (
    <Navbar color="primary">
      <Nav className="w-100 justify-content-between">
        <NavItem className="d-flex gap-2">
          <ButtonGroup>
            <Button
              className="button"
              active={i18n.language === "pl"}
              onClick={() => handleLanguageChange("pl")}
            >
              PL
            </Button>
            <Button
              className="button"
              active={i18n.language === "en"}
              onClick={() => handleLanguageChange("en")}
            >
              ENG
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              className="button"
              active={!isDarkMode}
              onClick={disableDarkMode}
            >
              <SunFill width={24} height={24} />
            </Button>
            <Button
              className="button"
              active={isDarkMode}
              onClick={enableDarkMode}
            >
              <MoonFill width={24} height={24} />
            </Button>
          </ButtonGroup>
        </NavItem>
        <NavItem className="d-flex gap-2">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen((prevState) => !prevState)}
            direction="down"
          >
            <DropdownToggle color="primary" caret>
              {t("account")}
            </DropdownToggle>
            <DropdownMenu>
              {accounts.map((account) => (
                <DropdownItem
                  key={account.id}
                  active={activeAccount.id === account.id}
                  onClick={() => handleActiveAccountChange(account)}
                >
                  {account.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button className="button" onClick={handleLogout}>
            {t("logout")}
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
