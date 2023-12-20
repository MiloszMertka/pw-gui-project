import { Button, ButtonGroup, Nav, Navbar, NavItem } from "reactstrap";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../state/slices/authSlice";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

function NavBar() {
  const dispatch = useDispatch();
  const { isDarkMode, enableDarkMode, disableDarkMode } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <Navbar color="primary">
      <Nav className="w-100 justify-content-between">
        <NavItem className="d-flex gap-4">
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
        <NavItem>
          <Button className="button" onClick={handleLogout}>
            {t("logout")}
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
