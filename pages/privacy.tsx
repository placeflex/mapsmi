import { Layout } from "@/components/Layout";
import { Container } from "@/components/Container";
const PrivacyPolicy = () => {
  return (
    <Layout scroll fixed headerProps={{ classNames: "bg-secondary" }}>
      <Container>
        <div className="py-[2rem] pb-[4rem]">
          <h1 className="text-h3 mb-[2rem]">Privacy Policy</h1>
          <p className="text-bodySmall">
            At MapsMi Inc. (“MapsMi”, “we”, “our”, or “us”), we are
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website
            <a href="https://mapsmingle.com">mapsmingle.com</a> (the “Site”),
            and use the services provided on or through the Site (collectively,
            the “Service”). By accessing or using the Service, you agree to the
            terms of this Privacy Policy. If you do not agree with these terms,
            please do not use the Service.
          </p>
          <h2 className="text-h5">1. Information We Collect</h2>
          <p className="text-bodySmall">
            We collect various types of information, including:
          </p>
          <ul className="text-bodySmall">
            <li>
              <strong>Personal Information:</strong> This includes your name,
              email address, postal address, payment information, and other
              contact details provided when you make a purchase or sign up for
              our newsletter.
            </li>
            <li>
              <strong>Usage Data:</strong> We automatically collect certain
              information when you visit or use our Site, such as your IP
              address, browser type, device information, and browsing actions on
              the Site.
            </li>
            <li>
              <strong>Cookies:</strong> We may use cookies or similar tracking
              technologies to collect information to help improve your
              experience on the Site.
            </li>
          </ul>
          <h2 className="text-h5">2. How We Use Your Information</h2>
          <p className="text-bodySmall">
            We may use the information we collect from you for the following
            purposes:
          </p>
          <ul className="text-bodySmall">
            <li>
              To process your orders and provide the services you request.
            </li>
            <li>
              To personalize your experience and improve the Site’s content and
              functionality.
            </li>
            <li>
              To communicate with you regarding your order or other inquiries.
            </li>
            <li>
              To comply with legal obligations or respond to legal requests.
            </li>
          </ul>
          <h2 className="text-h5">3. Sharing Your Information</h2>
          <p className="text-bodySmall">
            We do not sell, trade, or otherwise transfer your Personal
            Information to third parties except in the following circumstances:
          </p>
          <ul className="text-bodySmall">
            <li>
              <strong>Service Providers:</strong> We may share your information
              with third-party service providers who assist us in operating the
              Site, processing payments, or delivering your orders. These third
              parties are required to maintain the confidentiality of your
              information.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required by law, such as in response to a subpoena
              or court order.
            </li>
            <li>
              <strong>Business Transfers:</strong> If MapsMi is involved in
              a merger, acquisition, or sale of assets, your information may be
              transferred as part of that transaction.
            </li>
          </ul>
          <h2 className="text-h5">4. Data Retention</h2>
          <p className="text-bodySmall">
            We retain your Personal Information for as long as necessary to
            provide you with our services or comply with legal obligations. If
            you would like your information to be deleted, you may request this
            by contacting us at
            <a href="mailto:support@mapsmingle.com">support@mapsmingle.com</a>.
          </p>
          <h2 className="text-h5">5. Your Rights</h2>
          <p className="text-bodySmall">
            Depending on your location, you may have the right to:
          </p>
          <ul className="text-bodySmall">
            <li>Access the Personal Information we hold about you.</li>
            <li>
              Request correction or deletion of your Personal Information.
            </li>
            <li>
              Object to or restrict the processing of your Personal Information.
            </li>
            <li>Withdraw your consent where applicable.</li>
          </ul>
          <p className="text-bodySmall">
            To exercise any of these rights, please contact us at
            <a href="mailto:support@mapsmingle.com">support@mapsmingle.com</a>.
          </p>
          <h2 className="text-h5">6. Security</h2>
          <p className="text-bodySmall">
            We take the security of your information seriously and implement
            appropriate technical and organizational measures to safeguard your
            data. However, please note that no method of transmission over the
            internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>
          <h2 className="text-h5">7. Changes to This Privacy Policy</h2>
          <p className="text-bodySmall">
            We may update this Privacy Policy from time to time to reflect
            changes to our practices or for other operational, legal, or
            regulatory reasons. We encourage you to periodically review this
            page for the latest information on our privacy practices.
          </p>
          <h2 className="text-h5">8. Contact Us</h2>
          <p className="text-bodySmall">
            If you have any questions about this Privacy Policy or how we handle
            your information, please contact us at
            <a href="mailto:support@mapsmingle.com">support@mapsmingle.com</a>.
          </p>
          <p className="text-bodySmall">
            This Privacy Policy is governed by and construed in accordance with
            the laws of [Your Country], and any disputes relating to this Policy
            shall be subject to the exclusive jurisdiction of the courts of
            [Your Country/City].
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
