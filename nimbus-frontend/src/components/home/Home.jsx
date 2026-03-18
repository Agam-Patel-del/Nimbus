import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="home-header">
        <nav className="home-nav">
          <div className="nav-left">
            <a className="brand-logo" href="#">
              <div className="brand-icon">
                <span className="material-symbols-outlined">cloud_done</span>
              </div>
              <span className="brand-name">Nimbus</span>
            </a>
            <div className="nav-links">
              <a href="#features-section" onClick={(e) => { e.preventDefault(); document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
              <a href="#about-section" onClick={(e) => { e.preventDefault(); document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' }); }}>About</a>
            </div>
          </div>
          <div className="nav-right">
            <button className="btn-login" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
          <div className="hero-content" style={{ margin: '0 auto', alignItems: 'center' }}>
            <h1 className="hero-title">
              Intelligence at Your Service
            </h1>
            <p className="hero-description">
              Orchestrate your creative and administrative workflow. From generating professional emails to designing logos and posters, Nimbus handles the heavy lifting using advanced AI.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <button className="btn-primary-large" onClick={handleCTA}>
                Start Creating Now
              </button>
            </div>
            <div className="trust-indicator" style={{ justifyContent: 'center' }}>
              <p>Powered by <span>Google Gemini</span> and <span>Stable Diffusion XL</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Matrix */}
      <section id="features-section" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Core AI Tools</h2>
          </div>
          <div className="bento-grid">
            <div className="bento-card col-span-3">
              <div className="bento-content">
                <div className="bento-icon icon-blue">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <h3>AI Email Generator</h3>
                <p>Context-aware drafting for professional communication. Scale your outreach with personalized messaging that sounds human.</p>
              </div>
              <div className="bento-link" onClick={() => navigate('/email-generator')}>
                Explore Tool <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
            <div className="bento-card col-span-3">
              <div className="bento-content">
                <div className="bento-icon icon-purple">
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <h3>AI Poster Creator</h3>
                <p>Instant visual marketing assets for any campaign. Professional design layouts generated from simple text prompts.</p>
              </div>
              <div className="bento-link" onClick={() => navigate('/poster-generator')}>
                Explore Tool <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
            <div className="bento-card col-span-2">
              <div className="bento-content">
                <div className="bento-icon icon-orange">
                  <span className="material-symbols-outlined">token</span>
                </div>
                <h3>AI Logo Generator</h3>
                <p>Unique brand identity generation in seconds. Vector-ready assets for your next big idea.</p>
              </div>
              <div className="bento-link" onClick={() => navigate('/logo-generator')}>
                Explore Tool <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
            <div className="bento-card col-span-4 card-row">
              <div className="bento-content flex-1">
                <div className="bento-icon icon-green">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <h3>AI Report Writer</h3>
                <p>Data-driven document synthesis and analysis. Turn complex spreadsheets into readable, professional executive summaries.</p>
                <div className="bento-link mt-auto" onClick={() => navigate('/report-generator')}>
                  Explore Tool <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
              <div className="card-illustration">
                <div className="line full"></div>
                <div className="line partial"></div>
                <div className="line full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2>How to Use Nimbus</h2>
          </div>
          <div className="steps-container">
            <div className="connector-line"></div>
            <div className="step">
              <div className="step-number" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>psychology</span>
              </div>
              <h4>Provide Context</h4>
              <p>Type what you need in plain English. No complex prompting required.</p>
            </div>
            <div className="step">
              <div className="step-number" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>auto_awesome</span>
              </div>
              <h4>AI Generation</h4>
              <p>Our dual-engine AI processes your request and creates high-quality assets.</p>
            </div>
            <div className="step">
              <div className="step-number" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>download_done</span>
              </div>
              <h4>Review &amp; Export</h4>
              <p>Get ready-to-use professional emails, graphics, and reports instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Supercharge Your Workflow?</h2>
          <p>Experience the full power of Nimbus completely free. No subscriptions, no hidden fees, just pure productivity accessible to everyone.</p>
          <div className="cta-buttons">
            <button className="btn-primary-large" onClick={() => {navigate('/signup')}}>
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      <footer id="about-section" className="footer" style={{ padding: '64px 24px 48px', backgroundColor: '#F8FAFC', color: '#0F172A', borderTop: '1px solid #E2E8F0' }}>
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto', flexWrap: 'wrap', gap: '48px' }}>
          
          <div className="footer-left" style={{ flex: '1', minWidth: '300px', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#1D4ED8' }}>&lt;</span>
              <span style={{ color: '#2563EB' }}>Nimbus</span>
              <span style={{ color: '#1D4ED8' }}>/&gt;</span>
              <span style={{ color: '#60A5FA' }}>2025</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
              <strong>Nimbus</strong> is the next generation of AI orchestration. Orchestrate your creative and administrative workflow. From generating professional emails to designing logos and posters, Nimbus handles the heavy lifting using advanced AI.
            </p>
          </div>

          <div className="footer-right" style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '20px' }}>Contact Nimbus</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#475569', alignItems: 'flex-start' }}>
              <div><strong>Email:</strong> <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=webcseiiitism@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>webcseiiitism@gmail.com</a></div>
              <div><strong>Society:</strong> WebCSE - Computer Science Society</div>
              <div><strong>Department:</strong> Computer Science and Engineering</div>
              <div><strong>Institution:</strong> IIT ISM Dhanbad</div>
              <div><strong>Location:</strong> Dhanbad, Jharkhand, India</div>
            </div>
          </div>

        </div>
        <div className="footer-bottom" style={{ maxWidth: '1280px', margin: '48px auto 0', paddingTop: '24px', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
          <p className="copyright" style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>© 2026 Nimbus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
