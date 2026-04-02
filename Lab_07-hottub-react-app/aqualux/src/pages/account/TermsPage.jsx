import { COLORS } from "../../styles/theme";
import { PageHeader } from "../../components/UI";

const TERMS = [
  ["1. Acceptance of Terms",    "By accessing or using the AquaLux website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services."],
  ["2. Products & Pricing",     "All prices are listed in USD and are subject to change without notice. AquaLux reserves the right to modify product specifications at any time. Images shown are for illustrative purposes."],
  ["3. Orders & Payment",       "Orders are subject to acceptance and availability. We reserve the right to refuse any order. Payment must be received in full before goods are dispatched. We accept major credit cards and PayPal."],
  ["4. Warranty",               "All AquaLux products come with a 5-year limited warranty covering manufacturing defects. This warranty does not cover damage caused by improper installation, misuse, or normal wear and tear."],
  ["5. Returns & Refunds",      "We offer a 30-day return policy for unused items in original packaging. Custom orders are non-refundable. Return shipping costs are the responsibility of the customer unless the item is defective."],
  ["6. Privacy Policy",         "We collect personal information necessary to fulfill orders and improve our services. We do not sell or share your information with third parties without your consent, except as required by law."],
  ["7. Limitation of Liability","AquaLux shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services beyond the purchase price of the item."],
];

export default function TermsPage() {
  return (
    <div>
      <PageHeader title="Terms & Conditions" breadcrumb={["Home", "Terms & Conditions"]} />

      <section style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>

          <div style={{ background: "#fff", borderRadius: 12, padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <p style={{ color: COLORS.gray, marginBottom: 32, lineHeight: 1.7 }}>
              Please read these Terms and Conditions carefully before using the AquaLux website or purchasing any of our products. These terms govern your access to and use of our services.
            </p>

            {TERMS.map(([title, content]) => (
              <div key={title} style={{ marginBottom: 32 }}>
                <h3 style={{ color: COLORS.primary, marginBottom: 12, fontFamily: "Georgia, serif" }}>{title}</h3>
                <p style={{ color: COLORS.gray, lineHeight: 1.8, margin: 0 }}>{content}</p>
              </div>
            ))}

            <div style={{
              marginTop: 40, padding: "20px 24px",
              background: COLORS.lightBg, borderRadius: 8,
              borderLeft: `4px solid ${COLORS.secondary}`,
            }}>
              <p style={{ color: COLORS.gray, fontSize: "0.88rem", margin: 0 }}>
                <strong>Last updated:</strong> March 2025 — AquaLux, Inc. All rights reserved.<br />
                If you have questions about these terms, please <a href="#contact" style={{ color: COLORS.secondary }}>contact us</a>.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
