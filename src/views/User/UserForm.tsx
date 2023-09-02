import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Row, Col, Space, Input, Button, Card, Spin, Typography } from 'antd'
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useFormik } from 'formik'
import { AxiosError } from 'axios'

import apiV1 from '@helpers/apiV1'
import StickArea from '@components/StickArea/StickArea'
import { ActivityStore } from '@stores/ActivityStore'
import { TProps, initialValues, validationSchema } from './UserSchema'

const { Text } = Typography

export default function UserForm(props: TProps) {
  const isNew = props.isNew
  const id = props.id
  const title = (isNew)?'New':'Edit'

  const router = useRouter()
  const { setServerSaid, clearServerSaid } = useContext(ActivityStore)

  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema,
    
    onSubmit: async (values: TUserForm, { setSubmitting }) => {
      try {
        const data = {
          ...values,
          RoleId: '4bae9535-df47-46fe-b395-7be379d01f31',
        }

        if (isNew) {
          await apiV1.post('/users', data)
        }
        else {
          await apiV1.put(`/users/${id}`, data)
        }
      
        clearServerSaid()
        router.push('/user')
      }
      catch (error: AxiosError | any) {
        if (error.response) {
          const result = error.response.data
          setServerSaid(result)
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    (async function() {
      if (!isNew) {
        try {
          setIsLoading(true)
    
          const response = await apiV1.get(`/user/${id}`)
          const result = response.data
          
          formik.setFieldValue('firstName', result.data.firstName)
          formik.setFieldValue('lastName', result.data.lastName)
          formik.setFieldValue('userName', result.data.userName)
          formik.setFieldValue('email', result.data.email)
          // formik.setFieldValue('newPassword', result.data.newPassword)
          // formik.setFieldValue('confirmNewPassword', result.data.confirmNewPassword)
          formik.setFieldValue('phoneNumber', result.data.phoneNumber)
        }
        catch (error: AxiosError | any) {
          if (error.response) {
            const result = error.response.data
            setServerSaid(result)
          }
        }
        finally {
          setIsLoading(false)
        }
      }  
    })()
  }, [id])

  return (
    <React.Fragment>
      <Head>
        <title>User Management</title>
      </Head>

      <form onSubmit={formik.handleSubmit}>
        <Spin spinning={isLoading}>
          <Card title={title}>
            <Row gutter={[8, 8]}>

              <Col xs={24} lg={3}>
                First Name
              </Col>
              <Col xs={24} lg={21}>
                <Input 
                  name={'firstName'}
                  value={formik.values.firstName} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  status={(formik.errors.firstName)?'error':null}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <Text type={'danger'}>{formik.errors.firstName}</Text>
                )}
              </Col>

              <Col xs={24} lg={3}>
                Last Name
              </Col>
              <Col xs={24} lg={21}>
                <Input 
                  name={'lastName'}
                  value={formik.values.lastName} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  status={(formik.errors.lastName)?'error':null}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <Text type={'danger'}>{formik.errors.lastName}</Text>
                )}
              </Col>

              <Col xs={24} lg={3}>
                Username
              </Col>
              <Col xs={24} lg={21}>
                <Input 
                  name={'userName'}
                  value={formik.values.userName} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  status={(formik.errors.userName)?'error':null}
                />
                {formik.errors.userName && formik.touched.userName && (
                  <Text type={'danger'}>{formik.errors.userName}</Text>
                )}
              </Col>

              <Col xs={24} lg={3}>
                Email
              </Col>
              <Col xs={24} lg={21}>
                <Input 
                  name={'email'}
                  value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  status={(formik.errors.email)?'error':null}
                />
                {formik.errors.email && formik.touched.email && (
                  <Text type={'danger'}>{formik.errors.email}</Text>
                )}
              </Col>

              <Col xs={24} lg={3}>
                Phone Number
              </Col>
              <Col xs={24} lg={21}>
                <Input 
                  name={'phoneNumber'}
                  value={formik.values.phoneNumber} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  status={(formik.errors.phoneNumber)?'error':null}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <Text type={'danger'}>{formik.errors.phoneNumber}</Text>
                )}
              </Col>

              <Col xs={24} lg={3}>
                New Password
              </Col>
              <Col xs={24} lg={21}>
                <Input 
                  name={'newPassword'}
                  type={'password'}
                  value={formik.values.newPassword} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  status={(formik.errors.newPassword)?'error':null}
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <Text type={'danger'}>{formik.errors.newPassword}</Text>
                )}
              </Col>

              <Col xs={24} lg={3}>
                Retype Password
              </Col>
              <Col xs={24} lg={21}>
                <Input 
                  name={'confirmNewPassword'}
                  type={'password'}
                  value={formik.values.confirmNewPassword} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  status={(formik.errors.confirmNewPassword)?'error':null}
                />
                {formik.errors.confirmNewPassword && formik.touched.confirmNewPassword && (
                  <Text type={'danger'}>{formik.errors.confirmNewPassword}</Text>
                )}
              </Col>

            </Row>
          </Card>
        </Spin>
        
        <StickArea>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />}
              shape={'circle'} 
              size={'large'}
              onClick={() => router.push('/user')}
            />

            <Button 
              icon={<SaveOutlined />}
              type={'primary'} 
              htmlType={'submit'}
              shape={'circle'} 
              size={'large'}
              loading={formik.isSubmitting}
            />
          </Space>
        </StickArea>
      </form>
    </React.Fragment>
  )
}