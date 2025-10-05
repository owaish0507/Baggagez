import React from "react"

const TermsPage = () => (
    <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <section className="space-y-4 text-gray-700 text-base">
            <p>Welcome to Baggages! By using our website and services, you agree to the following terms and conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Online booking and advance payment are required for all storage services.</li>
                <li>Valid government-issued ID must be presented at check-in.</li>
                <li>Storage of illegal, hazardous, or high-value items is strictly prohibited.</li>
                <li>Insurance coverage is included for eligible items as per our policy.</li>
                <li>Please check operating hours of your selected storage partner before booking.</li>
                <li>Cancellations made at least 2 hours before drop-off are eligible for a refund.</li>
                <li>For full details, please contact our support team.</li>
            </ul>
            <p className="mt-6 font-semibold text-red-600">Travel light. Explore more!</p>
        </section>
    </main>
)

export default TermsPage
