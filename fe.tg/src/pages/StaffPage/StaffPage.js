import React from 'react';
import './StaffPage.scss';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import MuiButton from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles, ThemeProvider } from '@material-ui/styles';
import Swal from 'sweetalert2';
import TableTemplate from './Components/Table/Table';
import NavBar from '../../components/NavigationBar/NavigationBar';
import config from '../../config/index';

const url = `${config.baseUrl.dev}`;

const Button = withStyles((theme) => ({
  root: (props) =>
    props.color === 'default' && props.variant === 'contained'
      ? {
          color: theme.palette.default.contrastText,
          backgroundColor: theme.palette.default.main,
          '&:hover': {
            backgroundColor: theme.palette.default.dark,
            '@media (hover: none)': {
              backgroundColor: theme.palette.default.main,
            },
          },
        }
      : {},
}))(MuiButton);

const theme = createMuiTheme();

theme.palette.default = theme.palette.augmentColor({
  main: '#73d5ca',
  contrastText: '#fff',
});

class StaffPage extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
    };
    this.openAddFormHandler = this.openAddFormHandler.bind(this);
    this.deleteEmployee.bind(this);
    this.openEditFormHandler.bind(this);
  }

  componentDidMount = () => {
    axios
      .get(`${url}/getStaff`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ employees: response.data });
        } else {
          Swal.fire(
            'Fail To Get Staff List',
            'There was an error while getting the staff list. Please try again later!',
            'error',
          );
        }
      })
      .catch((error) => {
        throw new Error(`Staff page - fail to get staff list ${error}`);
      });
  };

  openEditFormHandler = (id) => {
    const { history } = this.props;
    history.replace(`/edit/${id}`);
  };

  openAddFormHandler = () => {
    window.location.href = '/add';
  };

  changeHandler = (prop) => this.setState({ [prop.name]: prop.value });

  deleteEmployee(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Staff Deleted!', 'The staff has been successfully deleted.', 'success');
        axios.delete(`${url}/therapist/${id}`).then((res) => {
          if (res.status === 200) {
            const { employees } = this.state;
            this.setState({
              employees: employees.filter((el) => el.id !== id),
            });
          } else {
            Swal.fire(
              'Staff Not Deleted!',
              'There were error when deleting this staff. Please try again.',
              'error',
            );
          }
        });
      }
    });
  }

  render() {
    const { employees } = this.state;
    return (
      <div>
        <NavBar />
        <div className="staff">
          <Row>
            <Col className="staff_addButton">
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="default" onClick={this.openAddFormHandler}>
                  Add New Staff
                </Button>
              </ThemeProvider>
            </Col>
          </Row>
          <Row>
            <Col className="staff_staffList-content">
              <TableTemplate
                employees={employees}
                deleteEmployee={this.deleteEmployee}
                openEditForm={this.openEditFormHandler}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StaffPage;
