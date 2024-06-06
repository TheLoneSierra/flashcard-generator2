# flashcard-generator
This is my frontend project that involves creating and managing flashcards.

The features which it includes are:
  1. Flashcard group creation: Users can create groups of flashcards with a title, description, and an optional group image.
  2. Term and Definition Management: Within each flashcard group, users can add multiple terms, each with a description and an optional image.
  3. File Uploads: Users can upload images for both the flashcard group and individual terms through a custom-styled file input button which has label as “Upload Image”. 
  4. Local Storage: The flashcards are stored in the browser’s local storage,that allows users to save and retrieve their data without the need for a backend server.
  5. Form Handling: This application allows users to add and remove terms in the flashcard creation form.

Technologies Used
  1. React: For building the user interface and managing state.
  2. React Icons: For including icons in the form, such as the file upload and delete icons.
  3. Tailwind CSS: For styling the application, i have used TailwindCSS.

Key Components
  1. Navbar: A reusable component for navigation.
  2. FlashcardForm: The main form component where users input their flashcard group details, add terms and manage images. This component can be reused for future purposes.

Future Enhancements
  1. I will Integrate this project with backend technologies to store flashcards persistently.
  2. User authentication to allow multiple users to create and manage their own flashcards.
  3. Enhanced styling and user experience improvements.
