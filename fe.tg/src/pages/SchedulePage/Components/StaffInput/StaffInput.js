import React, { useState, useEffect } from 'react';
import './StaffInput.scss';
import { ThemeProvider , makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { RiCloseCircleFill } from 'react-icons/ri';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/SaveRounded';
import { connect } from 'react-redux';
import { theme } from '../../../../colour';
import { putTodayStaffList } from '../../../../api/schedule';
import { fetchWeekSchedule } from '../../../../store/actions/scheduleAction';

const StaffInput = (props) => {
  const useStyles = makeStyles((themeStyle) => ({
    chip: {
      margin: themeStyle.spacing(0.5),
      padding: themeStyle.spacing(1),
      height: '50%',
      fontFamily: 'Quicksand',
      fontSize: '1rem',
      color: 'white',
      fontWeight: 600,
      deleteIconColorPrimary: 'red',
    },
  }));
  const classes = useStyles();
  const [todayStaffList, setTodayStaffList] = useState([]);
  const [isClear, setIsClear] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { weekSchedule } = props;
  const weekList = weekSchedule;
  const {allStaffList} = props;
  const { date } = props;
  const todayList = weekList.find((list) => list.date === date);

  useEffect(() => {
    props.fetchWeekSchedule({ date });
  }, [isUpdate, date]);

  useEffect(() => {
    if (todayList != null) {
      setTodayStaffList(todayList.staffList);
    }
  }, [todayList]);

  const handleOnChange = (event, value) => {
    setIsClear(!isClear);
    if (value === null) return;
    const staffName = value.firstName;
    let i;
    for (i = 0; i < todayStaffList.length; i += 1) {
      if (todayStaffList[i] === staffName) {
        return;
      }
    }
    setTodayStaffList([...todayStaffList, value.firstName]);
  };

  const handleDelete = (chipToDelete) => () =>
    setTodayStaffList((todayStaff) => todayStaff.filter((item) => item !== chipToDelete));

  const updateStaffList = () => {
    putTodayStaffList(date, todayStaffList).then(() => setIsUpdate(!isUpdate));
  };

  return (
    <div className="staff-input">
      <ThemeProvider theme={theme}>
        <div className="staff-input__upper">
          <div className="staff-input__upper__guide">
            <h2>
              Choose working staff for
              {date}
              :
              {' '}
            </h2>
          </div>
          <div className="staff-input__upper__selection">
            <Autocomplete
              id="tags-outlined"
              options={allStaffList}
              getOptionLabel={(option) => option.firstName}
              filterSelectedOptions
              onChange={handleOnChange}
              key={isClear}
              size="small"
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="All Staff List" />
              )}
            />
          </div>
        </div>

        <div className="staff-input__lower">
          <div className="staff-input__lower__list">
            {todayStaffList.map((staff, index) => (
              <Chip
                key={index}
                label={staff}
                onDelete={handleDelete(staff)}
                color="primary"
                deleteIcon={<RiCloseCircleFill />}
                className={classes.chip}
              />
              ))}
          </div>
          <div>
            <IconButton
              color="primary"
              aria-label="save staff list"
              className="staff-list__lower__save-button"
              onClick={updateStaffList}
            >
              <SaveIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { schedule } = state;
  const { weekSchedule, allStaffList } = schedule;
  return {
    weekSchedule,
    allStaffList,
  };
};

const mapActionsToProps = {
  fetchWeekSchedule,
};

export default connect(mapStateToProps, mapActionsToProps)(StaffInput);
