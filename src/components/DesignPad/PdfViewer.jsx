
// src/components/DesignPad/PdfViewer.jsx
import React from 'react';
import './styles/PdfViewer.css';

export const PdfViewer = () => {
  const pdfs = [
    { name: 'Document1.pdf', path: '/path/to/doc1.pdf' },
    { name: 'Document2.pdf', path: '/path/to/doc2.pdf' }
  ];

  return (
    <div className="pdf-container">
      {pdfs.map((pdf, index) => (
        <div key={index} className="pdf-card">
          <i className="fa-regular fa-file-pdf pdf-icon" />
          <span className="file-name">{pdf.name}</span>
          <a href={pdf.path} download className="download-btn">
            Download
          </a>
        </div>
      ))}
    </div>
  );
};
