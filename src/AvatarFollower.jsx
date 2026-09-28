import { useEffect, useRef, useState } from 'react'

const FACES = {
  happy: 'https://aka.doubaocdn.com/s/SaUFaBsMio',
  curious: 'https://aka.doubaocdn.com/s/SKB1QV9GJE',
  cute: 'https://aka.doubaocdn.com/s/a3hwFJtBNk',
  excited: 'https://aka.doubaocdn.com/s/VHn7EvSqZl',
  surprise: 'https://aka.doubaocdn.com/s/fGJY2xNgS5',
}

export default function AvatarFollower() {
  const [face, setFace] = useState('happy')
  const [bounce, setBounce] = useState(false)
  const idleTimer = useRef(null)

  useEffect(() => {
    const resetIdle = () => {
      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setFace('happy'), 3000)
    }

    const onMove = (e) => {
      const target = e.target
      if (target.closest('button') || target.closest('a')) return
      setFace((f) => (f === 'happy' ? 'curious' : f))
      resetIdle()
    }

    const onClick = (e) => {
      if (e.target.closest('.avatar-egg')) {
        setFace('surprise')
      } else if (e.target.closest('button') || e.target.closest('a')) {
        setFace('excited')
      } else {
        return
      }
      setBounce(true)
      setTimeout(() => setBounce(false), 500)
      setTimeout(() => setFace('happy'), 1200)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      clearTimeout(idleTimer.current)
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          width: 130,
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)',
          transform: bounce ? 'translateY(-15px)' : 'translateY(0)',
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,.15))',
        }}
      >
        <img src={FACES[face]} alt="avatar" style={{ width: '100%', display: 'block' }} />
      </div>
      <div
        className="avatar-egg"
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          fontSize: 12,
          color: '#aaa',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        点我有惊喜
      </div>
    </>
  )
}
