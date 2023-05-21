import { Toast } from 'react-hot-toast'

export const ToastFailureOptions: Partial<
  Pick<
    Toast,
    | 'style'
    | 'id'
    | 'icon'
    | 'duration'
    | 'ariaProps'
    | 'className'
    | 'position'
    | 'iconTheme'
  >
> = {
  duration: 2000,
  position: 'top-center',
  style: {},
  className: '',
  icon: '❌',
  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
}
