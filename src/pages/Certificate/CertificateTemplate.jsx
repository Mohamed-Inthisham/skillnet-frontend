// src/components/Certificate/CertificateTemplate.jsx
import React from 'react';

// Ensure you have a Poppins font available or change to a suitable one
// You might need to import Poppins in your main CSS or index.html
// e.g., @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

const CertificateTemplate = React.forwardRef(
  (
    {
      studentName,
      courseName,
      date,
      providerName,
      certificateNumber,
      siteLogoUrl,
      badgeUrl,
    },
    ref
  ) => {
    return (
      <div ref={ref} style={styles.certificateWrapper}>
        <div style={styles.leftPurpleBar}></div>

        {badgeUrl && (
          <img
            src={badgeUrl}
            alt="Badge"
            style={styles.badgeImage}
            crossOrigin="anonymous"
          />
        )}

        <div style={styles.contentArea}>
          {/* Top part of content area for main text */}
          <div>
            <h1 style={styles.mainTitle}>CERTIFICATE</h1>
            <p style={styles.subTitle}>OF ACHIEVEMENT</p>

            <p style={styles.presentedToText}>This certificate is presented to</p>
            <p style={styles.studentNameText}>{studentName}</p>

            <p style={styles.completionText}>
              by <strong>{providerName}</strong> for successfully completing
            </p>
            <p style={styles.courseNameText}>{courseName}</p>
          </div>

          {/* Footer section pushed to the bottom */}
          <div style={styles.footer}>
            <div style={styles.dateSection}>
              <p style={styles.dateValue}>{date}</p>
              <p style={styles.dateLabel}>DATE</p>
            </div>

            {siteLogoUrl ? (
              <img
                src={siteLogoUrl}
                alt={`${providerName} Logo`}
                style={styles.footerLogo}
                crossOrigin="anonymous"
              />
            ) : (
              <p style={styles.footerProviderName}>
                {providerName ? providerName.toUpperCase() : 'PROVIDER'}
              </p>
            )}
            <p style={styles.certificateNumberText}>
              Certification n°{certificateNumber}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';

// Define styles
const certificatePrimaryColor = '#6A0DAD'; // Example Purple - adjust to your branding
const certificateSecondaryColor = '#4B0082'; // Darker Purple for accents

const styles = {
  certificateWrapper: {
    width: '1056px', // Approx. A4 landscape width at 96dpi (11 inches)
    height: '792px', // Approx. A4 landscape height at 96dpi (8.27 inches)
    fontFamily: '"Poppins", Arial, sans-serif', // Ensure Poppins is loaded in your project
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '40px', // Overall padding inside the certificate border
    boxSizing: 'border-box',
    position: 'relative', // For absolute positioning of decorative elements
    border: '1px solid #e0e0e0', // A subtle border for the whole thing
    overflow: 'hidden', // Important for decorative elements like the skewed bar
  },
  leftPurpleBar: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    bottom: '0px',
    width: '70px', // Width of the skewed bar
    backgroundColor: certificatePrimaryColor,
    transform: 'skewX(-15deg)', // Skew effect
    marginLeft: '-20px', // Pull it slightly off-canvas to hide the straight edge created by skew
  },
  badgeImage: {
    position: 'absolute',
    top: '30px', // Distance from top
    right: '40px', // Distance from right
    width: '100px', // Adjust as needed
    height: 'auto',
    objectFit: 'contain',
  },
  contentArea: {
    // This area is to the right of the purple bar and within the main padding
    marginLeft: '70px', // Space for the (visible part of) purple bar
    height: '100%',    // Take full height of the padded certificateWrapper
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Pushes main content up and footer down
    textAlign: 'center',
    position: 'relative', // For z-index if ever needed
    zIndex: 1, // Ensure content is above decorative elements
  },
  mainTitle: {
    fontSize: '52px',
    fontWeight: 'bold', // Changed from 700 for common font weight name
    color: '#222222',
    margin: '50px 0 5px 0', // Added more top margin
    textTransform: 'uppercase',
    letterSpacing: '3px',
  },
  subTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#555555',
    margin: '0 0 60px 0', // Increased bottom margin
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  presentedToText: {
    fontSize: '18px',
    color: '#666666',
    margin: '0 0 15px 0',
  },
  studentNameText: {
    fontSize: '38px',
    fontWeight: '600',
    color: certificatePrimaryColor, // Use primary color for student name
    margin: '0 auto 40px auto', // Center if inline-block, more bottom margin
    paddingBottom: '10px',
    borderBottom: `2px solid ${certificatePrimaryColor}4D`, // Lighter purple with alpha (e.g., 4D for ~30% opacity)
    display: 'inline-block', // So border-bottom is only under the text
    minWidth: '50%', // Give it some minimum width
  },
  completionText: {
    fontSize: '17px',
    color: '#555555',
    margin: '40px 0 10px 0', // More top margin
    lineHeight: '1.6',
  },
  courseNameText: {
    fontSize: '26px',
    fontWeight: 'bold', // Changed from 700
    color: '#333333',
    margin: '0 0 30px 0', // Adjusted margin
    textTransform: 'uppercase',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Align items to the bottom of the flex container
    width: '100%',
    paddingTop: '30px', // Space above the footer content
    borderTop: `1px solid ${certificatePrimaryColor}33`, // Lighter purple border
    marginTop: 'auto', // Pushes footer to the bottom of its flex container (contentArea)
    boxSizing: 'border-box',
  },
  dateSection: {
    textAlign: 'left',
  },
  dateValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333333',
    margin: '0',
  },
  dateLabel: {
    fontSize: '12px',
    color: '#777777',
    textTransform: 'uppercase',
    margin: '2px 0 0 0',
    letterSpacing: '0.5px',
  },
  footerLogo: {
    maxHeight: '50px', // Adjust as needed
    maxWidth: '150px', // Adjust as needed
    objectFit: 'contain',
  },
  footerProviderName: { // Fallback if no logo
    fontSize: '28px',
    fontWeight: 'bold',
    color: certificateSecondaryColor, // Use secondary accent color
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  certificateNumberText: {
    fontSize: '12px',
    color: '#777777',
    textAlign: 'right',
  },
};

export default CertificateTemplate;