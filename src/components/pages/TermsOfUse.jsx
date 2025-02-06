import styles from  "./css-files/TermsOfUse.module.css"
import { Link } from "react-router-dom"

function TermsOfUse() {
  return (
    <main className={styles.body}>

        <div className={styles.container}>

            <h1 className="lg:text-2xl sm:text-xl font-bold">Terms and Conditions</h1>
            <h2 className="lg:text-xl sm:text-lg font-semibold">1. Introduction</h2>
            <p className={styles.paragraph} >Welcome to Salesverse! These Terms and Conditions govern your use of our workforce management software.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">2. User Responsibilities</h2>
            <p className={styles.paragraph}>By using Salesverse, you agree to use the platform lawfully, maintain account security, and follow applicable laws.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">3. Intellectual Property Rights</h2>
            <p className={styles.paragraph}>All content within Salesverse is owned by us. You may not copy or distribute any material without permission.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">4. Pricing and Refund Policy</h2>
            <p className={styles.paragraph}>Subscription: $1,000 maintenance fee + $10 per employee + tax. Refunds are available for unused days in a subscription period.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">5. Termination of Use</h2>
            <p className={styles.paragraph}>We may terminate accounts due to non-payment or misuse. Data is retained for six months post-termination before deletion.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">6. Limitation of Liability</h2>
            <p className={styles.paragraph}>Salesverse is provided {"as is"} without warranties. We are not liable for indirect damages.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">7. Privacy Policy</h2>
            <p className={styles.paragraph}>We collect and process data as described in our <span><Link to={"/privacy-policy"} target="_blank" className="underline underline-offset-1">Privacy Policy</Link></span>. Cookies and tracking technologies are used.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">8. Third-Party Links & Services</h2>
            <p className={styles.paragraph}>Salesverse may contain links to third-party sites. We are not responsible for their content.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">9. Changes to Terms</h2>
            <p className={styles.paragraph}>We reserve the right to update these Terms at any time. Continued use signifies acceptance.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">10. Governing Law & Dispute Resolution</h2>
            <p className={styles.paragraph}>These Terms are governed by Ontario, Canada laws. Disputes will be resolved through mediation or courts in Ontario.</p>
            
            <h2 className="lg:text-xl sm:text-lg font-semibold">11. Contact Information</h2>
            <p className={styles.paragraph}>Email: customer.support@salesverse.org | Phone: 343-462-8385</p>
        </div>

    </main>
  )
}

export default TermsOfUse