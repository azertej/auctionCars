import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../apiCalls/users'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'


const rules = [
    {
        required: true,
        message: 'required'
    },
]

const Login = () => {
    const dispatch = useDispatch()
    const naviagte = useNavigate()
    const finish = async (values) => {
        try {
            dispatch(SetLoader(true))
            const response = await LoginUser(values)
            dispatch(SetLoader(false))
            if (response.success) {

                message.success(response.message)
                localStorage.setItem("token", response.data)
                window.location.href = '/'
            }
            else {
                throw new Error(response.message)
            }

        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    useEffect(() => {
        naviagte("/")
    }, [])
    return (
        <div className='fullscreen-background' >
            <div className=' bg-[#9BBEC8] w-[350px] p-3 flex flex-col items-center rounded-[30px] ' >
                <Form onFinish={finish} >
                    <h2 className='mb-4 flex justify-center text-[30px] text-gray-500 '>Login</h2>
                    <FormItem rules={rules} name='email'>
                        <Input type='email' placeholder='Email' />
                    </FormItem>
                    <FormItem rules={rules} name='password'>
                        <Input type='password' placeholder='Password' />
                    </FormItem>
                    <div className='flex justify-center my-3' >
                        <Button type="primary" htmlType='submit'>Login Now</Button>
                    </div>
                    <div className='text-center mt-2'>
                        <span>Don't have an account? <Link to='/register'>Register</Link></span>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login