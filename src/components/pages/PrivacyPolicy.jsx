

function PrivacyPolicy() {
  return (
    <main className="w-screen flex justify-center items-center overflow-x-hidden overflow-y-scroll p-7">

        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">1. Introduction</h2>
            <p className="text-gray-700">Welcome to Salesverse. This Privacy Policy explains how we collect, use, and protect your personal information when you use our workforce management platform. By using Salesverse, you agree to the terms outlined in this policy.</p>
            <p className="text-gray-700"><strong>Company Details:</strong><br/>Salesverse, Montreal, QC, Canada<br/>Email: customer.support@salesverse.org<br/>Phone: 343-462-8385</p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">2. Information We Collect</h2>
            <p className="text-gray-700">We collect both personal and non-personal data to improve our services.</p>
            <ul className="list-disc list-inside text-gray-700">
            <li><strong>Personal:</strong> Name, Email, Phone Number, and other necessary identifiers.</li>
            <li><strong>Non-Personal:</strong> Usage analytics, performance cookies.</li>
            <li><strong>Third-Party Services:</strong> Stripe for payment processing.</li>
            </ul>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700">
            <li>Account management and authentication</li>
            <li>Service improvement and feature enhancements</li>
            <li>Data analytics for platform optimization</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">4. Data Security</h2>
            <ul className="list-disc list-inside text-gray-700">
            <li>Strong password policies</li>
            <li>Multi-Factor Authentication (MFA) for password changes</li>
            <li>Password salting and hashing</li>
            <li>Limited user permissions and separation of duties</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">5. Data Retention & Deletion</h2>
            <p className="text-gray-700">Upon termination, data is retained for 6 months and then deleted. For active accounts, data is stored for 14 months before deletion.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">6. User Rights & Choices</h2>
            <p className="text-gray-700">Users can access and update their information via the Salesverse platform or request data deletion.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">7. Changes to This Policy</h2>
            <p className="text-gray-700">Salesverse reserves the right to update this Privacy Policy at any time. Changes will be communicated via our website or email.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">8. Contact Information</h2>
            <p className="text-gray-700">For any privacy-related inquiries, contact us at:</p>
            <p className="text-gray-700">Email: customer.support@salesverse.org<br/>Phone: 343-462-8385</p>
        </section>
        </div>
    </main>
  )
}

export default PrivacyPolicy