'use client';

import { useEffect, useRef } from 'react';

interface ReCaptchaProps {
  siteKey: string;
  onChange: (token: string | null) => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

export default function ReCaptcha({ siteKey, onChange }: ReCaptchaProps) {
  // Use the prop but fallback to the correct key if empty
  const actualSiteKey = siteKey || '6Ld6YiYrAAAAAA9yefve5A8UZqgImTCJmA4ZSUnc';
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Display site key for debugging
    console.log('Using reCAPTCHA site key:', actualSiteKey);
    
    // Store callback in window object so it can be called from global context
    window.onRecaptchaLoad = () => {
      console.log('reCAPTCHA script loaded');
      if (containerRef.current && window.grecaptcha && !widgetIdRef.current) {
        try {
          console.log('Attempting to render reCAPTCHA with site key:', actualSiteKey);
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: actualSiteKey,
            callback: (token: string) => {
              console.log('reCAPTCHA verified:', !!token);
              onChange(token);
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
              onChange(null);
            },
            // Use the current hostname for better compatibility across environments
            'hl': 'en',  // Language
            'theme': 'light' // Theme
          });
          console.log('reCAPTCHA widget rendered with ID:', widgetIdRef.current);
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
        }
      }
    };

    // Check origin-appropriate script loading
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    console.log('Current origin:', currentOrigin);

    // Add the script if it doesn't exist
    if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      console.log('reCAPTCHA script added to document head');
    } else if (window.grecaptcha && window.grecaptcha.render) {
      // If script already exists and is loaded, call the function directly
      window.onRecaptchaLoad();
    }

    return () => {
      // Cleanup
      if (widgetIdRef.current !== null && window.grecaptcha && window.grecaptcha.reset) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [actualSiteKey, onChange]);

  return (
    <div className="my-4">
      <div ref={containerRef} className="g-recaptcha"></div>
      {!actualSiteKey && (
        <div className="mt-2 p-3 bg-yellow-100 text-yellow-700 rounded">
          reCAPTCHA site key is missing. Please check your environment variables.
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500">
        This site is protected by reCAPTCHA
      </div>
    </div>
  );
} 