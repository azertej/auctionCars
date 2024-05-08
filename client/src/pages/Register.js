import React, { useState } from 'react'
import { Checkbox, Form, Input, Button, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../apiCalls/users'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'

const rules = [
  {
    required: true,
    message: 'required'
  },
]

const Register = () => {
  const [checkBox, setCheckBox] = useState(false)
  const handleCheckboxChange = (e) => {
    setCheckBox(e.target.checked)
  };
  const navigate = useNavigate()
  const dispatche = useDispatch()
  const finish = async (values) => {
    try {
      console.log(values)
      dispatche(SetLoader(true))
      const response = await RegisterUser(values)
      dispatche(SetLoader(false))
      if (response.success) {
        message.success(response.message)
        navigate("/login")
      }
      else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatche(SetLoader(false))
      message.error(error.message)
    }
  }
  return (
    <div className='bg-[#bfdbfe] w-screen h-screen  flex justify-center items-center'  >
      <div className=' bg-[#e0f2fe] w-[350px] p-3 flex flex-col items-center rounded-[30px] ' >
        <Form onFinish={finish} >
          <h2 className='mb-4 flex justify-center text-[30px] text-gray-500 '>REGISTER</h2>
          <div className='flex justify-evenly gap-2'>
            <FormItem rules={rules} className='w-[150px] ' name='name' >
              <Input className='text-center' placeholder='First Name' />
            </FormItem>
            <FormItem rules={rules} className='w-[150px] ' name='secondName'>
              <Input className='text-center ' placeholder='Last Name' />
            </FormItem>
          </div>
          <FormItem rules={rules} name='email'>
            <Input type='email' placeholder='Email' />
          </FormItem>
          <FormItem rules={rules} name='password'>
            <Input type='password' placeholder='Password' />
          </FormItem>
          <FormItem rules={rules} name='passwordConfiramtion'>
            <Input type='password' placeholder='Confirm Password' />
          </FormItem>
          <div className='flex gap-4 justify-center items-center'>
            <FormItem className='m-0' name='termsOfUse' valuePropName="checked" initialValue={checkBox}>
              <Checkbox onChange={handleCheckboxChange} ></Checkbox>
            </FormItem>
            <p className='font-bold text-[15px]'>I accept <span className='text-blue-500'>Terms of use</span> </p>
          </div>
          <div className='flex justify-center my-3' >
            <Button type="primary" htmlType='submit'>Register Now</Button>
          </div>
          <div className='text-center mt-2'>
            <span>Already have an account? <Link to='/login'>Login</Link></span>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register