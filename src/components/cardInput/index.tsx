import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { TextInput, Button, NumberInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import InputMask from "react-input-mask"
import { CONSTANTS } from "../../utils/constants"
import { cardPost } from '../../api/card';


interface Props {
  className?: string
}


export const CardInput = (props: Props) => {
  const { className } = props
  const [ valid, setValid ] = useState(false)
  const form = useForm({
    initialValues: {
      cardNumber: '',
      expirationDate: '',
      CVV: '',
      amount: ''
    },
  })
  useEffect(() => {
    console.log(valid)
    console.log(form.values.cardNumber.replaceAll('_', '').length)
    console.log(form.values.expirationDate.replaceAll('_', '').length)
    console.log(form.values.CVV.length)
    console.log(form.values.amount.length)
    if (
      form.values.cardNumber.replaceAll('_', '').length === 19
      && form.values.expirationDate.replaceAll('_', '').length === 7
      && form.values.CVV.length === 3
      && form.values.amount.length > 0
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [ form.values ])

  return (
    <div className={ cn(styles.cardInput, className) }>
      <form onSubmit={ (e) => { e.preventDefault() } }>
        <div className={ styles.cardNumExp }>
          <InputMask
            onChange={ (e) => { form.setFieldValue('cardNumber', e.target.value) } }
            mask={ CONSTANTS.CARD_MASK }
          >
            <TextInput
              name='cardNumber'
              id='cardNumber'
              required
              placeholder='Card number'
            />
          </InputMask>

          <InputMask
            onChange={ (e) => { form.setFieldValue('expirationDate', e.target.value) } }
            mask={ CONSTANTS.DATE_MASK }
          >
            <TextInput
              required
              placeholder='MM/YYYY'
            />
          </InputMask>
        </div>

        <InputMask
          onChange={ (e) => { form.setFieldValue('CVV', e.target.value) } }
          mask={ CONSTANTS.CVV_MASK }
          maskPlaceholder=''
        >
          <TextInput
            required
            placeholder='CVV'
          />
        </InputMask>
        <InputMask
          onChange={ (e) => { form.setFieldValue('amount', e.target.value) } }
          mask={ CONSTANTS.AMOUNT_MASK }
          maskPlaceholder={ '' }
        >
          <TextInput
            required
            placeholder='amount'
          />
        </InputMask>


        <Button
          className={ valid ? styles.active : undefined }
          disabled={ !valid } type="submit"
          onClick={ () => {
            cardPost({
              cardNumber: form.values.cardNumber,
              expDate: form.values.expirationDate,
              CVV: form.values.CVV,
              amount: form.values.amount
            })
          }
          }>
          Submit
        </Button>
      </form>
    </div>
  )
}