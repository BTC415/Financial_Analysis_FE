const FormatValue = ({ value }: { value: number }) => {
  const FormatedValue = value > 0 ? `+R$ ${value},00` : `-R$ ${Math.abs(value)},00`
  return FormatedValue
}

export default FormatValue