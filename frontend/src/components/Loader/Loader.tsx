import { MutatingDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#FA8D39"
      secondaryColor="#77431b"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}

export default Loader
