import React from 'react';

interface ErrorBannerProps {
  message: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <div className="error-banner" role="alert">
      <div>
        <strong>Aviso de Conexión:</strong> {message}
      </div>
    </div>
  );
};
