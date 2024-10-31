import { useState } from 'react'

//send notification from front-end

// window.Notification.requestPermission().then((permission) => {
//   if(permission === 'granted') {
//     new Notification('Hello World')
//   }
// })

// register service worker
navigator.serviceWorker.register('service-worker.js')
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      const response = await fetch('http://localhost:3000/push/public_key')
      const { publicKey } = await response.json()
      subscription = await serviceWorker.pushManager.subscribe({
        applicationServerKey: publicKey,
        userVisibleOnly: true,
      })

      console.log(subscription)
    }

    await fetch('http://localhost:3000/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })

    //save subscription on local storage
    localStorage.setItem('subscription', JSON.stringify(subscription))
  })

function App() {
  const [message, setMessage] = useState<string | null>(null)

  async function sendNotification() {
    const subscription = JSON.parse(localStorage.getItem('subscription') || '{}')

    if (!message || !subscription.endpoint || !subscription.keys) {
      console.log('Message or subscription not found')
      return
    }

    await fetch('http://localhost:3000/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })
  }

  return (
    <div>
      <h1>Push Notification</h1>
      <input type="text" onChange={(event) => setMessage(event.target.value)} />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  )
}

export default App
