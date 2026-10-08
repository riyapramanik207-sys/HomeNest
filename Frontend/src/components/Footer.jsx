import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1e293b",
        color: "white",
        padding: "40px 20px 20px",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "30px",
        }}
      >
        {/* HomeNest */}
        <div>
          <h2 style={{ color: "#38bdf8" }}>HomeNest</h2>

          <p style={{ lineHeight: "1.6", color: "#cbd5e1" }}>
            HomeNest is an AI-based PG rental and booking platform that helps
            students and working professionals find safe, affordable and
            comfortable accommodation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li>
              <a href="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                Home
              </a>
            </li>

            <li>
              <a
                href="/properties"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                Properties
              </a>
            </li>

            <li>
              <a
                href="/about"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                About Us
              </a>
            </li>

            <li>
              <a
                href="/contact"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3>Our Services</h3>

          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li>Find PG</li>
            <li>PG Booking</li>
            <li>Property Listing</li>
            <li>Customer Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact Us</h3>

          <p style={{ color: "#cbd5e1" }}>
            📍 Kolkata, West Bengal, India
          </p>

          <p style={{ color: "#cbd5e1" }}>
            📧 support@homenest.com
          </p>

          <p style={{ color: "#cbd5e1" }}>
            📞 +91 98765 43210
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: "1px solid #475569",
          marginTop: "30px",
          paddingTop: "20px",
          textAlign: "center",
          color: "#cbd5e1",
        }}
      >
        <p>
          © {new Date().getFullYear()} HomeNest. All Rights Reserved.
        </p>

        <p style={{ fontSize: "14px" }}>
          AI-Based PG Rental & Booking Platform
        </p>
      </div>
    </footer>
  );
};

export default Footer;
 
