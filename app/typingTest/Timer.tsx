import Countdown from 'react-countdown';

function Timer() {
  return (
    <div>
       <Countdown date={Date.now() + 10000} precision={3} />

    </div>
  )
}

export default Timer