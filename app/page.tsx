'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FranchiseForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    preferredAddress: '',
    businessExperience: '',
    messengerAccount: '',
  });

  useEffect(() => {
    // Detect if user is on mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const mobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate required fields
    if (!formData.fullName || !formData.contactNumber || !formData.email || !formData.businessExperience) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Validate phone number
    if (formData.contactNumber.length !== 10) {
      setError('Contact number must be 10 digits (without +63).');
      setIsSubmitting(false);
      return;
    }

    // Optimistic navigation - redirect immediately for faster UX
    const submissionData = {
      ...formData,
      contactNumber: `+63${formData.contactNumber}`
    };

    // Navigate immediately
    router.push('/thank-you');

    // Submit in background
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    }).catch(error => {
      console.error('Error submitting form:', error);
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#FEEE07'}}>
      {/* Header */}
      <div className="text-white py-4 md:py-6 px-4 text-center" style={{backgroundColor: '#FF0016'}}>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-1">
          CALAMIAS FRIED CHICKEN
        </h1>
        <p className="text-base md:text-xl font-semibold">
          FRANCHISE INQUIRY FORM
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-8 border-cfc-red">
          
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#FF0016'}}>
              START YOUR CFC JOURNEY!
            </h2>
            <p className="text-lg font-semibold text-gray-900">
              Fill out the form below and we'll get back to you soon.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-4 border-red-500 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="font-semibold text-red-800 mb-1">Submission Error</p>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-lg font-semibold text-gray-800 mb-2">
                Full Name <span className="text-cfc-red">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:border-cfc-red focus:ring-2 focus:ring-cfc-red outline-none transition text-lg text-gray-900"
                placeholder="Juan Dela Cruz"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-lg font-semibold text-gray-800 mb-2">
                Contact Number <span className="text-cfc-red">*</span>
              </label>
              <div className="flex items-stretch gap-2">
                <div className="flex items-center text-lg font-semibold text-gray-700 px-3 bg-gray-100 border-3 border-gray-300 rounded-xl shrink-0">+63</div>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setFormData(prev => ({ ...prev, contactNumber: value }));
                  }}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="flex-1 min-w-0 px-4 py-3 border-3 border-gray-300 rounded-xl focus:border-cfc-red focus:ring-2 focus:ring-cfc-red outline-none transition text-lg text-gray-900"
                  placeholder="912 345 6789"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-2">
                Email Address <span className="text-cfc-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:border-cfc-red focus:ring-2 focus:ring-cfc-red outline-none transition text-lg text-gray-900"
                placeholder="juandelacruz@email.com"
              />
            </div>

            {/* Preferred Franchise Address */}
            <div>
              <label htmlFor="preferredAddress" className="block text-lg font-semibold text-gray-800 mb-2">
                Preferred Franchise Location Address <span className="text-gray-400 text-base font-normal">(Optional)</span>
              </label>
              <textarea
                id="preferredAddress"
                name="preferredAddress"
                value={formData.preferredAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:border-cfc-red focus:ring-2 focus:ring-cfc-red outline-none transition text-lg resize-none text-gray-900"
                placeholder="Full address or specific area you're considering..."
              />
            </div>

            {/* Business Experience */}
            <div>
              <label htmlFor="businessExperience" className="block text-lg font-semibold text-gray-800 mb-2">
                Do you have business experience? <span className="text-cfc-red">*</span>
              </label>
              <select
                id="businessExperience"
                name="businessExperience"
                required
                value={formData.businessExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:border-cfc-red focus:ring-2 focus:ring-cfc-red outline-none transition text-lg bg-white text-gray-900"
              >
                <option value="">-- Select an option --</option>
                <option value="yes-foodservice">Yes - Food Service Industry</option>
                <option value="yes-other">Yes - Other Industry</option>
                <option value="no">No - First Time Business Owner</option>
              </select>
            </div>

            {/* Messenger Account */}
            <div>
              <label htmlFor="messengerAccount" className="block text-lg font-semibold text-gray-800 mb-2">
                Facebook Messenger Account Name <span className="text-gray-400 text-base font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="messengerAccount"
                name="messengerAccount"
                value={formData.messengerAccount}
                onChange={handleChange}
                className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:border-cfc-red focus:ring-2 focus:ring-cfc-red outline-none transition text-lg text-gray-900"
                placeholder="e.g., Juan Dela Cruz or @juandelacruz"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white font-bold py-5 px-8 rounded-full text-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{backgroundColor: isSubmitting ? '#999999' : '#FF0016'}}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SENDING...
                </span>
              ) : (
                'SUBMIT'
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t-4 border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Questions? Call or message us:
            </p>
            <a href="tel:+639099394352" className="text-2xl font-bold hover:underline block mb-6" style={{color: '#FF0016'}}>
              (+63) 909 939 4352
            </a>
            
            {/* Messenger Option */}
            <div className="bg-cfc-light-blue border-4 border-blue-500 rounded-xl p-4">
              <p className="text-gray-800 mb-3 font-bold">Prefer to chat?</p>
              <a
                href={isMobile ? "https://m.me/100817225723018" : "https://www.facebook.com/messages/t/100817225723018"}
                target={isMobile ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.89 1.432 5.478 3.678 7.162V22l3.378-1.854c.902.249 1.855.383 2.844.383 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.2 12.417l-2.578-2.75-5.031 2.75 5.531-5.865 2.64 2.75 4.969-2.75-5.531 5.865z"/>
                </svg>
                Chat on Messenger
              </a>
              <p className="text-xs text-gray-600 mt-2">Instant responses during business hours</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
