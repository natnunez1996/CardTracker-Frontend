import { useForm, SubmitHandler } from 'react-hook-form';
import { ISignInFormData } from '@/model/auth';
import { useAppDispatch, useAppSelector } from '@/hook';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/actions/auth';
import AuthTextField from '@/common/AuthFormItems/AuthTextField';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';

type Props = {}

const Login = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(state => state.auth.message)

    const { control, handleSubmit } = useForm<ISignInFormData>();

    const onSubmit: SubmitHandler<ISignInFormData> = (data: ISignInFormData) => {
        dispatch(signIn(data, navigate));
    }



    return (
        <Box
            alignItems={'center'}
            display={'flex'}
            flexDirection={'column'}
            height={'100vh'}
            width={'100%'}
        >
            <Container maxWidth="sm" sx={{ margin: '1rem' }} >
                <Paper variant="outlined" sx={{ padding: "1rem", borderRadius: '1rem', textAlign: 'center' }} >
                    <Typography variant="h5">Log In</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AuthTextField autoFocus control={control} label='Email' name='email' value='test@test.com' />
                        <AuthTextField control={control} error={error} label='Password' name='password' showPassword type='password' value='123123' />
                        <Button type='submit'>Log In</Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}

export default Login