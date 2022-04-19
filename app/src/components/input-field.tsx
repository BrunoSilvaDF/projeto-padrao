import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  textarea?: boolean
}

export const InputField: Component<InputFieldProps> = ({ label, textarea, size: _, ...props }) => {
  const [field, { error }] = useField(props)

  let InputOrTextArea = textarea ? Textarea : Input

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {/* @ts-ignore */}
      <InputOrTextArea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        bg='whtie'
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
