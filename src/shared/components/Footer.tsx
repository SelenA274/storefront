import Link from "next/link"
import { DEPARTMENTS } from "@/features/products/types"

export default function Footer() {
  return (
    <footer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
        .footer-link:hover { color: #c9a96e !important; transform: translateX(3px); }
        .footer-link { transition: color 0.2s, transform 0.2s; display: inline-block; }
        .social-icon:hover { color: #c9a96e !important; transform: translateY(-2px); }
        .social-icon { transition: color 0.2s, transform 0.2s; }
        .newsletter-input:focus { outline: none; border-color: #c9a96e !important; box-shadow: 0 0 0 3px rgba(201,169,110,0.12) !important; }
        .newsletter-input::placeholder { color: #c8b99a; }
        .sub-btn:hover { background: linear-gradient(135deg, #d4b87a, #b8904a) !important; box-shadow: 0 8px 24px rgba(201,169,110,0.4) !important; transform: translateY(-1px); }
        .sub-btn { transition: all 0.25s ease !important; }
        .legal-link:hover { color: #c9a96e !important; }
        .legal-link { transition: color 0.2s; }

        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 24px 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
            padding: 60px 32px 48px;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.4fr 1fr 1fr 1fr;
            gap: 60px;
            padding: 80px 48px 64px;
          }
        }

        .footer-bottom {
          border-top: 1px solid rgba(201,169,110,0.2);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            padding: 24px 48px;
          }
        }

        .legal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 20px;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .legal-links {
            gap: 24px;
            justify-content: flex-end;
          }
        }

        /* Brand col spans full width on the 2-col sm layout */
        @media (min-width: 640px) and (max-width: 1023px) {
          .footer-brand-col {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      {/* Gold top divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9a96e 30%, #c9a96e 70%, transparent)", opacity: 0.5 }} />

      <div style={{ background: "linear-gradient(160deg, #faf7f2 0%, #f2ebe0 60%, #ede4d3 100%)" }}>

        {/* Main grid */}
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand-col" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 500, letterSpacing: "0.15em", color: "#2a1f14", margin: "0 0 4px", lineHeight: 1 }}>
                VELO
              </h2>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a96e", margin: 0, fontWeight: 500 }}>
                Luxury Beauty
              </p>
            </div>

            <p style={{ fontSize: "0.88rem", color: "#9a8870", lineHeight: 1.8, margin: 0, maxWidth: "260px" }}>
              Curated beauty essentials for the discerning woman. Elegance, crafted.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "16px" }}>
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  ), label: "Instagram"
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ), label: "Facebook"
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.82 1.55V6.79a4.85 4.85 0 0 1-1.05-.1z" />
                    </svg>
                  ), label: "TikTok"
                },
              ].map(({ icon, label }) => (
                <button key={label} className="social-icon" aria-label={label} style={{ background: "none", border: "none", cursor: "pointer", color: "#b0a090", padding: "8px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {icon}
                </button>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", borderRadius: "20px", border: "1px solid rgba(201,169,110,0.2)", padding: "24px", boxShadow: "0 4px 20px rgba(180,150,100,0.08)" }}>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", margin: "0 0 6px", fontWeight: 600 }}>
                The Insider List
              </p>
              <p style={{ fontSize: "0.82rem", color: "#9a8870", margin: "0 0 16px", lineHeight: 1.6 }}>
                Exclusive launches, beauty tips & member offers.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="newsletter-input"
                  style={{ flex: 1, border: "1.5px solid rgba(201,169,110,0.25)", borderRadius: "12px", padding: "11px 14px", fontSize: "0.82rem", background: "rgba(255,255,255,0.8)", color: "#2a1f14", fontFamily: "sans-serif", transition: "border-color 0.2s, box-shadow 0.2s", minWidth: 0 }}
                />
                <button className="sub-btn" style={{ background: "linear-gradient(135deg, #c9a96e, #a8803d)", color: "#fff", border: "none", borderRadius: "12px", padding: "11px 16px", fontSize: "0.82rem", cursor: "pointer", fontWeight: 600, boxShadow: "0 4px 14px rgba(201,169,110,0.28)", whiteSpace: "nowrap", flexShrink: 0 }}>
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "24px", fontWeight: 600 }}>Shop</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {DEPARTMENTS.map(({ slug, label }: any) => (
                <Link key={slug} href={`/products?department=${slug}`} className="footer-link" style={{ fontSize: "0.88rem", color: "#6a5a4a", textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
              <Link href="/products" className="footer-link" style={{ fontSize: "0.88rem", color: "#6a5a4a", textDecoration: "none" }}>
                All Products
              </Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "24px", fontWeight: 600 }}>Help</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {["Contact Us", "Shipping & Returns", "Order Tracking", "FAQ"].map((item) => (
                <span key={item} className="footer-link" style={{ fontSize: "0.88rem", color: "#6a5a4a", cursor: "default" }}>{item}</span>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "24px", fontWeight: 600 }}>About</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {["Our Story", "Sustainability", "Careers", "Press"].map((item) => (
                <span key={item} className="footer-link" style={{ fontSize: "0.88rem", color: "#6a5a4a", cursor: "default" }}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ fontSize: "0.7rem", color: "#b0a090", letterSpacing: "0.1em", margin: 0 }}>
            © 2026 VELO BEAUTY. ALL RIGHTS RESERVED.
          </p>
          <div className="legal-links">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
              <span key={item} className="legal-link" style={{ fontSize: "0.7rem", color: "#b0a090", letterSpacing: "0.08em", cursor: "pointer" }}>
                {item.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}