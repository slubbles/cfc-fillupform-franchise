export default function ThankYou() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{backgroundColor: '#FEEE07'}}>
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-8" style={{borderColor: '#FF0016'}}>
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto" style={{backgroundColor: '#FF0016'}}>
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center" style={{color: '#FF0016'}}>
            THANK YOU!
          </h1>
          
          <p className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Your Franchise Inquiry Has Been Received!
          </p>

          {/* What to Expect */}
          <div className="rounded-2xl p-6 md:p-8 mb-8 text-left" style={{backgroundColor: '#E5F5F9'}}>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{color: '#FF0016'}}>
              WHAT TO EXPECT NEXT:
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cfc-red rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">📧 Confirmation Email</h3>
                  <p className="text-gray-700">
                    You'll receive a confirmation email shortly with your inquiry details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cfc-red rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">📱 Text Message</h3>
                  <p className="text-gray-700">
                    Expect a text message from our franchise team within 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cfc-red rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">📞 Follow-up Call</h3>
                  <p className="text-gray-700">
                    Our franchise consultant will call you to discuss the opportunity in detail.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t-4 border-gray-200 pt-8 text-center">
            <p className="text-gray-800 mb-4 text-lg font-semibold">
              Questions? Don't hesitate to reach out!
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-gray-700 text-sm mb-1 font-semibold">Call or Text:</p>
                <a href="tel:+639099394352" className="text-2xl font-bold hover:underline block" style={{color: '#FF0016'}}>
                  (+63) 909 939 4352
                </a>
              </div>
              <div>
                <p className="text-gray-700 text-sm mb-1 font-semibold">Visit Our Website:</p>
                <a href="https://calamiasfriedchicken.com" className="text-lg font-semibold hover:underline block" style={{color: '#FF0016'}}>
                  calamiasfriedchicken.com
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            {/* Messenger Button - Primary */}
            <div className="bg-cfc-light-blue border-4 border-blue-500 rounded-xl p-6 text-center">
              <p className="text-lg font-bold text-gray-800 mb-2">💬 Have questions?</p>
              <p className="text-gray-700 mb-4">Continue our conversation on Messenger for instant answers!</p>
              <a 
                href="https://m.me/calamiasfriedchicken?ref=franchise_form_complete"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.89 1.432 5.478 3.678 7.162V22l3.378-1.854c.902.249 1.855.383 2.844.383 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.2 12.417l-2.578-2.75-5.031 2.75 5.531-5.865 2.64 2.75 4.969-2.75-5.531 5.865z"/>
                </svg>
                Chat with Us on Messenger
              </a>
            </div>

            {/* Back to Website - Secondary */}
            <a 
              href="https://calamiasfriedchicken.com"
              className="inline-block w-full text-center bg-white hover:bg-gray-50 text-cfc-red border-3 border-cfc-red font-bold py-3 px-6 rounded-full text-base transition-all hover:scale-105"
            >
              ← Back to Main Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
