import { Col, Form, Input, message, Modal, Row, Tabs } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCar } from '../../../apiCalls/cars'
import { SetLoader } from '../../../redux/loadersSlice'
import { editCar } from '../../../apiCalls/cars'
import Images from './images'



const CustomStuff = [
    {
        label: 'Bill Available',
        name: 'billAvailable'
    },
    {
        label: 'warranty Available',
        name: 'warrantyAvailable'
    }
]

const rules = [{
    required: true,
    message: 'required'
}]


const ProductForm = ({ showProductForm, setShowProductForm, selectedProduct, Data }) => {
    const dispatch = useDispatch()
    const [showTable, setShowTable] = useState('1')
    const { user } = useSelector((state) => state.users)

    const onfinish = async (values) => {
        try {

            dispatch(SetLoader(true))
            let response = null
            if (selectedProduct) {
                response = await editCar(selectedProduct._id, values)
            }
            else {
                values.seller = user._id
                values.status = 'pending'
                response = await addCar(values)
            }
            dispatch(SetLoader(false))
            if (response.success) {
                message.success(response.message)
                Data()
                setShowProductForm(false)

            }
            else {

                message.error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }
    const formRef = useRef(null)

    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct)

        }
    }, [selectedProduct])

    return (
        <div>
            <Modal title='' width={1000} open={showProductForm} onCancel={() => { setShowProductForm(false) }}
                centered okText='save' onOk={() => { formRef.current.submit() }} {...(showTable === "2" && { footer: false })} >


                <div>
                    <h1 className='text-center color-blue font-semibold ' >{selectedProduct ? "Edit Car Form " : "Add Car"}</h1>
                    <Tabs defaultActiveKey='1' activeKey={showTable} onChange={(key) => setShowTable(key)} >

                        <Tabs.TabPane tab='Car Details' key='1' >
                            <Form onFinish={onfinish} ref={formRef} layout='vertical'>
                                <Form.Item rules={rules} label='Car Name' name='carName' >
                                    <Input type='text' />
                                </Form.Item>
                                <Form.Item rules={rules} label='Description' name='description' >
                                    <TextArea />
                                </Form.Item>
                                <Row gutter={[16]} >
                                    <Col span={8} >
                                        <Form.Item rules={rules} label='Price' name='price' >
                                            <Input type='number' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} >
                                        <Form.Item rules={rules} label='Model' name='model' >
                                            <select>
                                                <option value="" >  select </option>
                                                <option value="FORD" >  FORD </option>
                                                <option value="TOYOTA" >  TOYOTA </option>
                                                <option value="VOLKSWAGEN " >  VOLKSWAGEN </option>
                                                <option value="BMW" >  BMW </option>
                                                <option value="MERCEDES" > MERCEDES </option>
                                                <option value="CLIO" > CLIO </option>
                                                <option value="RENAULT" > RENAULT </option>
                                            </select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}  >
                                        <Form.Item rules={rules} label='Age' name='age' >
                                            <Input type='number' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div className="flex gap-10">
                                    {CustomStuff.map((item) => {
                                        return (
                                            <Form.Item
                                                label={item.label}
                                                name={item.name}
                                                valuePropName='checked'
                                            >
                                                <Input
                                                    type="checkbox"
                                                    value={item.name}
                                                    onChange={(e) => {
                                                        formRef.current.setFieldsValue({
                                                            [item.name]: e.target.checked,
                                                        });
                                                    }}
                                                    checked={formRef.current?.getFieldValue(item.name)}
                                                />
                                            </Form.Item>
                                        );
                                    })}
                                </div>
                                <Form.Item
                                    label='Show Bid in product Page'
                                    name='ShowBidInProductPage'
                                    valuePropName='checked'
                                >
                                    <Input
                                        type="checkbox"
                                        onChange={(e) => {
                                            formRef.current.setFieldsValue({
                                                ShowBidInProductPage: e.target.checked,
                                            });
                                        }}
                                        checked={formRef.current?.getFieldValue('ShowBidInProductPage')}
                                        style={{ width:'50px',marginLeft:'25px' }}
                                    />
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>

                        <Tabs.TabPane tab='Images' key='2' disabled={!selectedProduct}  >
                            <Images selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} data={Data} />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Modal>

        </div >
    )
}

export default ProductForm