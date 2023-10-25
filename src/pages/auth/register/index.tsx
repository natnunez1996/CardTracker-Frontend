import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import './register.css'
import ISignUpFormData from '@/model/auth/ISignUpFormData';
import { signUp } from '@/actions/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hook';



type Props = {}

const Register = (props: Props) => {
    const { register, handleSubmit } = useForm<ISignUpFormData>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<ISignUpFormData> = data => {
        // console.log(data);
        dispatch(signUp(data, navigate))
    }

    return (
        <div className='register'>
            <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
                Email:
                <input {...register("email", { required: true })} />
                Password:
                <input {...register("password", { required: true })} />
                Confirm Password:
                <input {...register("confirmPassword", { required: true })} />
                First Name:
                <input {...register("firstName", { required: true })} />
                Last Name:
                <input {...register("lastName", { required: true })} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Register