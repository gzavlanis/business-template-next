'use client';
import { useState, useCallback } from 'react';
import { MailIcon } from 'lucide-react';

// --- ContactPage Component ---
function Contact({ theme }) {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const formBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const inputBgClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const inputTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputBorderClass = theme === 'dark' ? 'border-gray-600 focus:border-blue-500' : 'border-gray-300 focus:border-blue-700';
  const buttonBgClass = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800';
  const buttonTextColor = 'text-white';
  const paragraphClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmitStatus(null); // Clear previous status

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    console.log('Contact form submitted:', formData);
    // Simulate API call or data processing
    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      setTimeout(() => setSubmitStatus(null), 5000); // Clear status message after 5 seconds
    }, 1000);
  }, [formData]);

  return (
    <div className={`p-4 rounded-lg w-full max-w-7xl mx-auto flex flex-col space-y-8`}>
      <h2 className={`text-3xl font-bold mb-6 ${textColorClass}`}>Contact Us</h2>
      <p className={`mb-6 ${paragraphClass}`}>
        Have questions, feedback, or need support? Reach out to us using the form below,
        or find our location on the map.
      </p>

      {/* Contact Form Section */}
      <section className={`p-8 rounded-lg shadow-md ${formBgClass}`}>
        <h3 className={`text-2xl font-semibold mb-6 ${textColorClass}`}>Send us a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Your Name</label>
            <input
              type="text" id="name" name="name"
              className={`w-full p-3 rounded-md border ${inputBorderClass} ${inputBgClass} ${inputTextColor} focus:ring-2 focus:outline-none`}
              value={formData.name} onChange={handleChange} required
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Your Email</label>
            <input
              type="email" id="email" name="email"
              className={`w-full p-3 rounded-md border ${inputBorderClass} ${inputBgClass} ${inputTextColor} focus:ring-2 focus:outline-none`}
              value={formData.email} onChange={handleChange} required
            />
          </div>
          <div>
            <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Subject</label>
            <input
              type="text" id="subject" name="subject"
              className={`w-full p-3 rounded-md border ${inputBorderClass} ${inputBgClass} ${inputTextColor} focus:ring-2 focus:outline-none`}
              value={formData.subject} onChange={handleChange} required
            />
          </div>
          <div>
            <label htmlFor="message" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Message</label>
            <textarea
              id="message" name="message" rows="5"
              className={`w-full p-3 rounded-md border ${inputBorderClass} ${inputBgClass} ${inputTextColor} focus:ring-2 focus:outline-none resize-y`}
              value={formData.message} onChange={handleChange} required
            ></textarea>
          </div>

          {submitStatus && (
            <div className={`p-3 rounded-md text-sm ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold transition-colors duration-200 ${buttonBgClass} ${buttonTextColor} flex items-center justify-center space-x-2`}
          >
            <MailIcon size={20} />
            <span>Send Message</span>
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className={`p-8 rounded-lg shadow-md ${formBgClass}`}>
        <h3 className={`text-2xl font-semibold mb-6 ${textColorClass}`}>Find Us on the Map</h3>
        <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2062772522774!2d-73.9878584846401!3d40.7484400793279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2593457a3e74b%3A0xf6930521e428e21a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1678912345678!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location on Google Maps"
          ></iframe>
        </div>
        <p className={`mt-4 text-center ${paragraphClass}`}>
          123 Main Street, Suite 400, New York, NY 10001, USA
        </p>
      </section>
    </div>
  );
}

export default Contact;