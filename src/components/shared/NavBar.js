import { Button, ButtonGroup, Nav, Navbar, NavItem } from "reactstrap";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../state/slices/authSlice";

function NavBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar color="primary">
      <Nav className="w-100 justify-content-between">
        <NavItem className="d-flex gap-4">
          <ButtonGroup>
            <Button className="button" active={true}>
              PL
            </Button>
            <Button className="button">ENG</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button className="button" active={true}>
              <SunFill width={24} height={24} />
            </Button>
            <Button className="button">
              <MoonFill width={24} height={24} />
            </Button>
          </ButtonGroup>
        </NavItem>
        <NavItem>
          <Button className="button" onClick={handleLogout}>
            Wyloguj
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
