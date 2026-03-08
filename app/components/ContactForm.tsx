'use client';

import { useState, useEffect } from 'react';
import ReCaptcha from './ReCaptcha';
import { verifyRecaptcha } from '../utils/recaptcha';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  useEffect(() => {
    console.log('ReCaptcha site key in ContactForm:', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      setFormStatus({
        message: 'Please complete the reCAPTCHA verification',
        isError: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const isVerified = await verifyRecaptcha(recaptchaToken);
      
      if (!isVerified) {
        setFormStatus({
          message: 'reCAPTCHA verification failed. Please try again.',
          isError: true,
        });
        setIsSubmitting(false);
        return;
      }

      // Process form submission here
      // For demonstration, just showing success message
      setFormStatus({
        message: 'Form submitted successfully!',
        isError: false,
      });
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setRecaptchaToken(null);
    } catch (error) {
      setFormStatus({
        message: 'An error occurred. Please try again later.',
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
      
      {formStatus && (
        <div
          className={`p-4 mb-4 rounded ${
            formStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {formStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
            placeholder="Your name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
            placeholder="Your message here..."
          />
        </div>
        
        <ReCaptcha
          siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={setRecaptchaToken}
        />
        
        <button
          type="submit"
          disabled={isSubmitting || !recaptchaToken}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
} 