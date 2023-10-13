import Countdown from 'react-countdown';

function Timer() {
  return (
    <div>
       <Countdown date={Date.now() + 10000} />

    </div>
  )
}

export default Timer