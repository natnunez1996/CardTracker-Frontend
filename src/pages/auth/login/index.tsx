import { useForm, SubmitHandler } from 'react-hook-form';
import './login.css'
import { ISignInFormData } from '@/model/auth';
import { useAppDispatch } from '@/hook';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/actions/auth';

type Props = {}

const Login = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<ISignInFormData>();
    const onSubmit: SubmitHandler<ISignInFormData> = data => {
        dispatch(signIn(data, navigate));
    }

    return (
        <div className='login'>
            <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
                Email:
                <input {...register("email", { required: true })} />
                Password:
                <input {...register("password", { required: true })} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Login