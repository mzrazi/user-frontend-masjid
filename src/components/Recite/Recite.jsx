import React from 'react';
import './Recite.css';
import Navbar from '../Navbar/Navbar';
import image from '../../assets/quran.jpg'
import image1 from '../../assets/hadith.png'


const books = [
   
    
  {
    title: "Quran",
    description: "The holy book of Islam, containing the revelations given to Prophet Muhammad.",
    coverImage: image,
    link: 'https://media.islamicity.org/wp-content/uploads/quran/arabic-quran-white.pdf'
  },
  {
    title: "Hadith",
    description: "A collection of sayings, actions, and approvals of the Prophet Muhammad.",
    coverImage: image1,
    link: "https://www.holybooks.com/wp-content/uploads/The-Complete-Hadith.pdf"
  }
];

const Recite = () => {
  return (
   
    
    <div className="recite">
      <Navbar />
      <h1 className="reading-title">Reading Collection </h1>
      <div className="book-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img src={book.coverImage} alt={book.title} className="book-cover" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-description">{book.description}</p>
            <a href={book.link} target="_blank" rel="noopener noreferrer" className="read-button">Read Now</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recite;
