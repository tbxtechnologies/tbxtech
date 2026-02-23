==================================================
DIGITAL QR MENU TEMPLATE - MOBILE FLAVORS
==================================================

Thank you for your purchase! This template will allow you to get your digital menu ready in minutes.

--------------------------------------------------
1. ZIP FILE CONTENTS
--------------------------------------------------
When you unzip the file, you will find the following folders and files:
- index.html
- /css/styles.css
- /js/menu.js
- /images/ (Placeholder images)
- README.txt (This document)

--------------------------------------------------
2. INSTALLATION AND FUNCTIONALITY
--------------------------------------------------
For your menu to work, simply upload *all* the files and folders to the root of your hosting server or use a static hosting service (e.g., Netlify, Vercel, GitHub).

The menu will be accessible via your domain's URL (e.g., www.your-restaurant.com/menu).

--------------------------------------------------
3. QUICK CUSTOMIZATION (Very Important!)
--------------------------------------------------

A. CHANGING TEXT AND ADDING DISHES:
1. Open the `index.html` file in a text editor (like VS Code, Sublime Text, or Notepad++).
2. To **ADD a Dish**:
    * Locate the menu section where it belongs (e.g., look for a comment like ``).
    * **Copy the complete structure of an existing dish card**, which is defined by the tags: `<div class="card">...</div>`.
    * Paste the copied code below the last dish in that section.
3. To **EDIT the text** of a Dish:
    * To change the name, look for the `<h3>Dish Name</h3>` tag.
    * For the description, look for the `<p class="desc">Description</p>` tag.
    * For the price, look for the value inside `<span class="price">$XX.XX</span>`.

B. CHANGING GLOBAL COLORS:
This template uses CSS variables for easy customization:
1. Open the `/css/styles.css` file.
2. Find the `:root` section at the beginning of the file:

   :root{
     --bg: #0d1b12; /* Main background (Dark Mode) */
     --card: #14271c; /* Card color */
     --accent: #3ae374; /* Accent color (Neon/Details) */
     --muted: #a0b0a5; /* Secondary text color */
     /* ... other variables ... */
   }

3. Edit the variable values (e.g., change `--accent` to #FF4500 for an orange accent).

C. CHANGING IMAGES:
1. Upload your own dish images to the `/images/` folder.
2. Rename your images or edit the path in `index.html`.
   Search for: `<img src="images/crepas.jpg" alt="Dish Name">`
   Change to: `<img src="images/my_appetizer_photo.jpg" alt="Dish Name">`

--------------------------------------------------
4. SUPPORT AND LICENSING
--------------------------------------------------
If you have any questions about the code, contact us at [alcantarasotomiguelarturo@gmail.com].
This purchase includes a usage license for **ONE UNIQUE PROJECT** (One restaurant or website).