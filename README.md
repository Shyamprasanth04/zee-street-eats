# Zee's Street Eats

A modern food truck collective website featuring event information, vendor showcase, and pre-order system.

## Features

- Responsive design optimized for mobile devices
- Event countdown timer
- Vendor showcase with grid layout
- Pre-order system with form validation
- Social media integration
- Google reCAPTCHA integration for form security

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Google reCAPTCHA

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zees-street-eats.git
cd zees-street-eats
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   ```
   - Get your reCAPTCHA keys from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using the ReCaptcha Component

The project includes a reusable ReCaptcha component that can be added to any form:

```tsx
import ReCaptcha from '../components/ReCaptcha';

export default function MyForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      // Handle missing reCAPTCHA
      return;
    }
    
    // Verify the token
    const isVerified = await verifyRecaptcha(recaptchaToken);
    if (isVerified) {
      // Process form submission
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      
      <ReCaptcha
        siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        onChange={setRecaptchaToken}
      />
      
      <button type="submit" disabled={!recaptchaToken}>
        Submit
      </button>
    </form>
  );
}
```

See `app/components/ContactForm.tsx` for a complete implementation example.

## Project Structure

```
zees-street-eats/
├── app/
│   ├── api/
│   │   └── verify-recaptcha/
│   ├── events/
│   ├── pre-order/
│   ├── vendors/
│   ├── contact/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Countdown.tsx
│   ├── Navigation.tsx
│   └── ReCaptcha.tsx
├── utils/
│   └── recaptcha.ts
├── public/
│   ├── images/
│   └── videos/
├── styles/
└── package.json
```

## Required Assets

Place the following assets in the `public` directory:

- `videos/food-truck.mp4` - 15-second video of food trucks
- `images/taco-titan.jpg` - Taco Titan vendor image
- `images/bao-boss.jpg` - Bao Boss vendor image
- `images/jerk-junkie.jpg` - Jerk Junkie vendor image
- `images/fry-fiend.jpg` - Fry Fiend vendor image

## Deployment

The site can be deployed to Vercel:

```bash
npm run build
vercel deploy
```

## License

MIT 