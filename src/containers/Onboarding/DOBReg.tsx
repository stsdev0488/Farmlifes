import React, { useState } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import { setOnboardingData } from '_actions/onBoarding';
import DOBReg from '_components/Onboarding/DOBReg';

interface DOBRegProps {
  next: () => void;
  goToLogin: () => void;
}

// tslint:disable-next-line:no-unused-expression
export default ({ next,goToLogin }): React.FC<DOBRegProps> => {
  const dispatch = useDispatch();
  const data = useSelector(({ onboarding }) => onboarding);
  const fullDOB = (data.data && data.data.birth_date) === undefined ? '2006-01-01' : data.data.birth_date;

  const [dob, onDOBChanged] = useState(fullDOB)

  goTo = () => {

    // Arranged DOB in the right format needed by API
    const val = dob.split('-');
    let newDob;
    if(val[2].length === 4){
      newDob = `${val[2]}-${val[1]}-${val[0]}`
    }
    else{
      newDob = dob
    }
    dispatch(setOnboardingData({ birth_date: newDob }))
    return next();
  }
  

  return (
    <DOBReg
      next={goTo}
      goToLogin={goToLogin}
      dob={dob}
      onDOBChanged={onDOBChanged}
    />
  );

};
