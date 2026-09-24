import React from 'react';
import footerImage from '../assets/images/odisha_footer_original.png';
import journeyFooterImage from '../../Footer2.png';

interface FooterBannerProps {
  variant?: 'default' | 'journey';
  onAboutUs?: () => void;
}

export const FooterBanner: React.FC<FooterBannerProps> = ({
  variant = 'default',
  onAboutUs,
}) => {
  const backgroundImage =
    variant === 'journey' ? journeyFooterImage : footerImage;
  const footerHeight = variant === 'journey' ? '400px' : '260px';

  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        minHeight: footerHeight,
        overflow: 'hidden',
        backgroundColor: '#faf3e7',
      }}
    >
      <img
        src={backgroundImage}
        alt="Odisha cultural artwork"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition:
            variant === 'journey' ? 'center bottom' : 'center',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: footerHeight,
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

          {onAboutUs && (
            <button
              type="button"
              onClick={onAboutUs}
              style={{
                marginTop: '12px',
                border: '1px solid rgba(184, 106, 50, 0.45)',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.52)',
                color: '#102342',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 700,
                padding: '9px 18px',
                boxShadow: '0 4px 14px rgba(75, 48, 24, 0.1)',
              }}
            >
              About us
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
