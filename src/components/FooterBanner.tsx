import React from 'react';
import footerImage from '../assets/images/odisha_footer_original.png';

export const FooterBanner: React.FC = () => {
  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '260px',
        overflow: 'hidden',
        backgroundColor: '#faf3e7',
      }}
    >
      <img
        src={footerImage}
        alt="Odisha cultural artwork"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div style={{ marginTop: '-10px' }}>
          <h2
            style={{
              margin: 0,
              color: '#102342',
              fontFamily: 'Georgia, serif',
              fontSize: '30px',
              fontWeight: 600,
            }}
          >
            Made by travelers. For travelers.
          </h2>

          <p
            style={{
              marginTop: '10px',
              marginBottom: 0,
              color: '#303030',
              fontSize: '16px',
            }}
          >
            Together, let's make every journey in Odisha better.
          </p>

          <div
            style={{
              marginTop: '14px',
              color: '#b86a32',
              fontSize: '20px',
            }}
          >
            ❈
          </div>
        </div>
      </div>
    </footer>
  );
};