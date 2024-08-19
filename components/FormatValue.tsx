const FormatValue = ({ value }: { value: number }) => {
  return value > 0 ? `+R$ ${value},00` : `-R$ ${Math.abs(value)},00`
}

export default FormatValue