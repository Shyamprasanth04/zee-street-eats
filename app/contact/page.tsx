import ContactForm from '../components/ContactForm';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team',
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 