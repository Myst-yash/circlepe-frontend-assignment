
# CirclePe Front-End Development Assignment

## Technologies Used
- **React**: A JavaScript library for building user interfaces. The project utilizes functional components and hooks for managing state and lifecycle methods.
- **TypeScript**: Adds static typing to JavaScript, helping catch errors during development and improving code quality.
- **Tailwind CSS**: A utility-first CSS framework that allows for responsive design with minimal effort. It is used for styling the components and ensuring a modern look.
- **JavaScript ES6+**: Utilizes modern JavaScript features such as arrow functions, destructuring, and async/await for cleaner and more efficient code.

## Features
- **Responsive Design**: The component changes its layout based on the screen size. Mobile and desktop versions are implemented using media queries.
- **Keyboard Interaction**: Users can toggle the slider using the spacebar, making it accessible and enhancing user experience.
- **Auto Slide Functionality**: The slider automatically transitions between slides every 2 seconds, with the functionality to pause on user interaction.

## Challenges Faced
1. **State Management**:
   - **Challenge**: Managing the state of the current index for the slider and the toggle state for pause/resume functionality required careful consideration.
   - **Solution**: Utilized React's `useState` hook to maintain the slider's index and the pause state effectively. 

2. **Responsive Design**:
   - **Challenge**: Ensuring the component is visually appealing and functional across various screen sizes was initially challenging.
   - **Solution**: Employed Tailwind CSS utility classes to manage responsive layouts consistently across mobile and desktop screens.

3. **Keyboard Accessibility**:
   - **Challenge**: Implementing keyboard control for the slider without interfering with other interactions.
   - **Solution**: A keydown event listener was implemented using the `useEffect` hook to toggle the slider state when the spacebar is pressed.

4. **CSS Transition Effects**:
   - **Challenge**: Creating smooth transitions for the slider animations while ensuring they are performant across devices.
   - **Solution**: Explored and implemented various CSS properties like `transition`, `opacities`, and `transform` to facilitate smooth animations.

## Installation
To set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DJ-LIFE/circlepe-frontend-task.git
   cd my-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

## Usage
component can be integrated into your project by importing it and passing the appropriate data structure as props.

```javascript
import Home from './path/to/Home';
```
Open http://localhost:3000 with your browser to launch.

## Deployment
View live Project on vercel  [Link](https://circlepe-frontend-task.vercel.app/).

Feel free to modify and adapt the project to suit your needs!
