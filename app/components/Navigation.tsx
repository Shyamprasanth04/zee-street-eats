'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <div style={{
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'black',
      borderBottom: '1px solid #333',
      zIndex: 9999,
      padding: '8px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px'
      }}>
        <div>
          <a href="/" style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#FFD700', 
            textDecoration: 'none' 
          }}>
            Zee's Street Eats
          </a>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: '5px 10px'
          }}>
            Home
          </a>
          <a href="/menu" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: '5px 10px'
          }}>
            Menu
          </a>
          <a href="/events" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: '5px 10px'
          }}>
            Events
          </a>
          <a href="/about" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: '5px 10px'
          }}>
            About
          </a>
          <a href="/contact" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: '5px 10px'
          }}>
            Contact
          </a>
          <a href="/pre-order" style={{ 
            backgroundColor: '#FFD700', 
            color: 'black', 
            textDecoration: 'none', 
            padding: '5px 15px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            Pre-Order
          </a>
        </div>
      </div>
    </div>
  )
}