import { ImSpinner8 } from 'react-icons/im'

const SpinnerMini = ({variant, ...rest}) => {
  return (
    <ImSpinner8 {...rest} className={`animate-spin m-auto text-xl ${variant === 'secondary' ? 'text-primary-1' : ''}`} color={variant === 'secondary' ? 'primary-1' : ''} />
  )
}

export default SpinnerMini