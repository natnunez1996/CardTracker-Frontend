import { isPasswordCorrect } from "@/actions/auth"
import AccountSettingsTextField from "@/common/AccountSettingsForm/AccountSettingsTextField"
import { useAppDispatch, useAppSelector } from "@/hook"
import { IUser } from "@/model/UserModel"
import { IAccountSettings } from "@/model/auth/IAccountSettings"
import { Box, Button, Modal, Theme, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { SubmitHandler, UseFormHandleSubmit, useForm } from "react-hook-form"

type Props = {
    disabled?: boolean,
    formRef: React.RefObject<HTMLFormElement>,
    handleSubmit: UseFormHandleSubmit<IAccountSettings>,
    style: any,
    theme: Theme,
    user: IUser,
}



const PasswordVerification = ({ disabled = false, formRef, style, theme, user }: Props) => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.auth.message);
    const verifiedPassword = useAppSelector(state => state.auth.isPasswordCorrect);

    const [open, setOpen] = useState(false);
    const modalOpen = () => setOpen(true);
    const modalClose = () => setOpen(false);

    const { control, handleSubmit } = useForm<IAccountSettings>();

    const onSubmit: SubmitHandler<IAccountSettings> = (data: IAccountSettings) => {
        dispatch(isPasswordCorrect({ email: user.email, password: data.password }))
    }

    useEffect(() => {
        if (verifiedPassword === true) {
            formRef.current!.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            )
        }

    }, [verifiedPassword])

    return (
        <Box>
            <Button disabled={disabled} fullWidth onClick={modalOpen} >Update Changes</Button>
            <Modal
                open={open}
                onClose={modalClose}
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>Input Password to save changes.</Typography>
                        <AccountSettingsTextField
                            control={control}
                            label="Password"
                            name='password'
                            autoFocus
                            error={verifiedPassword === true ? '' : error}
                            showPassword
                        />
                        <Button fullWidth type='submit'>Update</Button>
                        <Button fullWidth color="error" onClick={modalClose}>Cancel</Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}

export default PasswordVerification