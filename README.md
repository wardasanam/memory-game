# **React Memory Game**

A classic card-matching memory game built with React and styled with Tailwind CSS. The objective is to find all the matching pairs of cards in the fewest moves possible.

## **Features**

* **Interactive Game Board:** A clean 4x4 grid of cards.  
* **Card Flip Animation:** Smooth 3D flip animation for turning cards over.  
* **Memorization Timer:** At the start of each game, players have 5 seconds to memorize the card positions before they flip back.  
* **Move Counter:** Tracks the number of pairs you've attempted to match.  
* **Win Condition:** A congratulatory modal appears when you've successfully matched all the pairs.  
* **Reset Functionality:** Start a new game at any time.

## **Getting Started**

Follow these instructions to get a copy of the project up and running on your local machine.

### **Prerequisites**

You need to have Node.js and npm (or yarn) installed on your system.

* [Node.js](https://nodejs.org/) (which includes npm)

### **Installation**

1. **Clone the repository:**  
   git clone \[https://github.com/your-username/react-memory-game.git\](https://github.com/your-username/react-memory-game.git)  
   cd react-memory-game

2. **Install dependencies:**  
   npm install  
   \# or  
   yarn install

## **Project Setup**

This project uses **Tailwind CSS** for styling and requires a small amount of custom CSS for the card animations.

1. Set up Tailwind CSS:  
   If you haven't already, make sure Tailwind CSS is configured for your React project. You can follow the official Tailwind CSS guide for Create React App or Vite.  
2. Add Custom CSS for Animations:  
   The 3D card flip animation requires a few custom CSS utility classes. Add the following code to your global CSS file (e.g., src/index.css or src/App.css):  
   .perspective-1000 {  
     perspective: 1000px;  
   }  
   .transform-style-3d {  
     transform-style: preserve-3d;  
   }  
   .rotate-y-180 {  
     transform: rotateY(180deg);  
   }  
   .backface-hidden {  
     backface-visibility: hidden;  
   }

## **Running the Application**

Once the dependencies are installed and the CSS is configured, you can start the development server:

npm start  
\# or  
yarn dev

This will run the app in development mode. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or the port specified by your setup) to view it in your browser.

## **Built With**

* [**React**](https://reactjs.org/) \- The web framework used.  
* [**Tailwind CSS**](https://tailwindcss.com/) \- For styling.