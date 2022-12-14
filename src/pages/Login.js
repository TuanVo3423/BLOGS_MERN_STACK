import { Alert, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AccountReducer } from '../redux/reducers/account';
import { AccountState$ } from '../redux/selectors';
export default function LoginForm() {
  const history = useNavigate();
    const {loginSuccess} = useSelector(AccountState$);
    useEffect(() => {
      if(loginSuccess){
        history('/');
      }
    },[history, loginSuccess]);
    // console.log('loginSuccess : ',loginSuccess);
    const [dataInput, setDataInput] = useState({
        username : '',
        password : '',
      });
      const handleOnchangeNameInput = (e) => {
        setDataInput({
          ...dataInput,
          username : e.target.value,
        });
      }
      const handleOnchangePassWordInput = (e) => {
        setDataInput({
          ...dataInput,
          password : e.target.value,
        });
      }
      
      const dispatch = useDispatch();
      const handleLogin = React.useCallback(() => {
        dispatch(AccountReducer.actions.loginRequest(dataInput));
      },[dataInput, dispatch])
  return (
    <div style={{width : '50%' , margin : 'auto' , textAlign : 'center'}}>
        <h1>LOGIN FORM</h1>
        <div>
        <TextField fullWidth label="Name" placeholder="Type in here…" variant="outlined" onChange={handleOnchangeNameInput} />
        <TextField fullWidth label="Password" placeholder="Type in here…" variant="outlined" onChange={handleOnchangePassWordInput}/>
        <Button fullWidth onClick = {handleLogin} sx={{marginTop : '10px'}} variant="contained">LOGIN</Button>
        <Link to={'/auth/register'}>
        <Button fullWidth sx={{marginTop : '10px'}} variant="contained">REGISTER</Button>
        </Link>
        </div>
        
    </div>
  )
}
