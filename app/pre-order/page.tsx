'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface Vendor {
  id: string;
  name: string;
  description: string;
  menu: MenuItem[];
}

function PreOrderForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventId: searchParams.get('eventId') || '',
    vendorId: searchParams.get('vendorId') || '',
    items: [] as Array<{ id: string; quantity: number; name: string; price: number }>,
    specialInstructions: '',
    pickupTime: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  // Sample data - in a real app, this would come from an API
  const vendors: Vendor[] = [
    {
      id: 'curry-king',
      name: 'Curry King',
      description: 'Authentic Indian cuisine with a modern twist',
      menu: [
        {
          id: 'butter-chicken',
          name: 'Butter Chicken',
          price: 12.99,
          description: 'Tender chicken in a rich, creamy tomato sauce',
          image: '/images/vendors/butter-chicken.jpg'
        },
        {
          id: 'tikka-masala',
          name: 'Chicken Tikka Masala',
          price: 13.99,
          description: 'Grilled chicken in a spiced curry sauce',
          image: '/images/vendors/tikka-masala.jpg'
        }
      ]
    },
    {
      id: 'noodle-ninja',
      name: 'Noodle Ninja',
      description: 'Fresh Asian noodles and stir-fries',
      menu: [
        {
          id: 'pad-thai',
          name: 'Pad Thai',
          price: 11.99,
          description: 'Rice noodles with tofu, shrimp, and peanuts',
          image: '/images/vendors/pad-thai.jpg'
        },
        {
          id: 'ramen',
          name: 'Tonkotss Ramen',
          price: 14.99,
          description: 'Rich pork broth with fresh noodles',
          image: '/images/vendors/ramen.jpg'
        }
      ]
    },
    {
      id: 'burger-beast',
      name: 'Burger Beast',
      description: 'Gourmet burgers and plant-based options',
      menu: [
        {
          id: 'beast-burger',
          name: 'Beast Burger',
          price: 14.99,
          description: 'Double beef patty with cheese, bacon, and special sauce',
          image: '/images/vendors/beast-burger.jpg'
        },
        {
          id: 'veggie-beast',
          name: 'Veggie Beast',
          price: 12.99,
          description: 'Plant-based patty with halloumi and roasted vegetables',
          image: '/images/vendors/veggie-beast.jpg'
        }
      ]
    },
    {
      id: 'jerk-junkie',
      name: 'Jerk Junkie',
      description: 'Authentic Caribbean flavors',
      menu: [
        {
          id: 'jerk-chicken',
          name: 'Jerk Chicken',
          price: 11.99,
          description: 'Spicy marinated chicken with rice and peas',
          image: '/images/vendors/jerk-chicken.jpg'
        },
        {
          id: 'curry-goat',
          name: 'Curry Goat',
          price: 13.99,
          description: 'Tender goat in rich Caribbean curry sauce',
          image: '/images/vendors/curry-goat.jpg'
        }
      ]
    },
    {
      id: 'pizza-prince',
      name: 'Pizza Prince',
      description: 'Artisanal pizzas with unique toppings',
      menu: [
        {
          id: 'northern-special',
          name: 'Northern Special',
          price: 13.99,
          description: 'Black pudding, chorizo, and caramelized onions',
          image: '/images/vendors/northern-special.jpg'
        },
        {
          id: 'truffle-shuffle',
          name: 'Truffle Shuffle',
          price: 15.99,
          description: 'Wild mushrooms, truffle oil, and mozzarella',
          image: '/images/vendors/truffle-shuffle.jpg'
        }
      ]
    }
  ];

  const events = [
    { id: 'food-truck-fest', name: 'Food Truck Festival', date: '2024-05-15' },
    { id: 'northern-fest', name: 'Northern Food Festival', date: '2024-06-01' },
    { id: 'summer-market', name: 'Summer Food Market', date: '2024-06-15' }
  ];

  const addItem = (item: MenuItem) => {
    setFormData(prev => {
      const existingItem = prev.items.find(i => i.id === item.id);
      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return {
        ...prev,
        items: [...prev.items, { id: item.id, quantity: 1, name: item.name, price: item.price }]
      };
    });
  };

  const removeItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== itemId)
    }));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(i =>
        i.id === itemId ? { ...i, quantity } : i
      )
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create a Date object for today with the selected time
      const [hours, minutes] = formData.pickupTime.split(':');
      const pickupDate = new Date();
      pickupDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      const response = await fetch('/api/pre-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pickupTime: pickupDate.toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit pre-order');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventId: '',
        vendorId: '',
        items: [],
        specialInstructions: '',
        pickupTime: ''
      });
      setStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectedVendor = vendors.find(v => v.id === formData.vendorId);

  return (
    <div className="min-h-screen bg-zee-dark">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Pre-Order Your Food</h1>
            <div className="flex justify-center space-x-8 mb-8">
              <div className={`step ${step >= 1 ? 'text-zee-yellow' : 'text-gray-400'}`}>
                1. Select Event & Vendor
              </div>
              <div className={`step ${step >= 2 ? 'text-zee-yellow' : 'text-gray-400'}`}>
                2. Choose Items
              </div>
              <div className={`step ${step >= 3 ? 'text-zee-yellow' : 'text-gray-400'}`}>
                3. Details & Checkout
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {success ? (
            <div className="bg-green-500/10 border border-green-500 text-green-500 p-8 rounded-lg text-center">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
              <p className="mb-6">Your pre-order has been submitted successfully.</p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setStep(1);
                }}
                className="bg-zee-yellow text-black px-6 py-2 rounded-lg hover:bg-amber-500 transition-colors"
              >
                Place Another Order
              </button>
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-lg shadow-xl p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="eventId" className="block text-sm font-medium text-gray-300 mb-2">
                      Select Event
                    </label>
                    <select
                      id="eventId"
                      required
                      value={formData.eventId}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, eventId: e.target.value }));
                      }}
                      className="w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-zee-yellow focus:ring-zee-yellow"
                    >
                      <option value="">Choose an event</option>
                      {events.map(event => (
                        <option key={event.id} value={event.id}>
                          {event.name} - {event.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.eventId && (
                    <div>
                      <label htmlFor="vendorId" className="block text-sm font-medium text-gray-300 mb-2">
                        Select Vendor
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {vendors.map(vendor => (
                          <div
                            key={vendor.id}
                            className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                              formData.vendorId === vendor.id
                                ? 'border-zee-yellow bg-zee-yellow/10'
                                : 'border-gray-700 hover:border-gray-500'
                            }`}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, vendorId: vendor.id }));
                            }}
                          >
                            <h3 className="text-lg font-semibold text-white">{vendor.name}</h3>
                            <p className="text-gray-400 text-sm">{vendor.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.eventId && formData.vendorId && (
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-zee-yellow text-black px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
                    >
                      Continue to Menu
                    </button>
                  )}
                </div>
              )}

              {step === 2 && selectedVendor && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{selectedVendor.name} Menu</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {selectedVendor.menu.map(item => (
                      <div key={item.id} className="bg-gray-800/30 rounded-lg overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                            <span className="text-zee-yellow">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                          <button
                            onClick={() => addItem(item)}
                            className="w-full bg-zee-yellow text-black px-4 py-2 rounded hover:bg-amber-500 transition-colors"
                          >
                            Add to Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {formData.items.length > 0 && (
                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Your Order</h3>
                      <div className="space-y-4 mb-6">
                        {formData.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-white">{item.name}</h4>
                              <p className="text-gray-400">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-400 hover:text-white"
                              >
                                -
                              </button>
                              <span className="text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-400 hover:text-white"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-400"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-lg font-semibold text-white mb-6">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => setStep(3)}
                        className="w-full bg-zee-yellow text-black px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
                      >
                        Continue to Checkout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-zee-yellow focus:ring-zee-yellow"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-zee-yellow focus:ring-zee-yellow"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-zee-yellow focus:ring-zee-yellow"
                    />
                  </div>

                  <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-300">
                      Preferred Pickup Time
                    </label>
                    <input
                      type="time"
                      id="pickupTime"
                      required
                      min="11:00"
                      max="21:00"
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-zee-yellow focus:ring-zee-yellow"
                    />
                    <p className="mt-1 text-sm text-gray-400">Available between 11:00 AM and 9:00 PM</p>
                  </div>

                  <div>
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-300">
                      Special Instructions
                    </label>
                    <textarea
                      id="specialInstructions"
                      rows={3}
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-zee-yellow focus:ring-zee-yellow"
                      placeholder="Any allergies or special requests?"
                    />
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      {formData.items.map(item => (
                        <div key={item.id} className="flex justify-between text-gray-300">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold text-white mb-6">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Back to Menu
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-zee-yellow text-black px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Confirm Order'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PreOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zee-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zee-yellow mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <PreOrderForm />
    </Suspense>
  );
} 