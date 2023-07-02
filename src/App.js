import React from "react";
import * as Components from './Components';
import WeatherPage from './WeatherPage';
import rightPanelImage from './rain.jpg';

function App() {
  const [signIn, toggle] = React.useState(true);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = React.useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    return password.length >= 8;
  };

  const handleLogin = () => {
    // Check if the entered email and password are valid
    const requiredEmail = 'mickey@gmail.com';
    const requiredPassword = 'mickey@123';

    if (formData.email === requiredEmail && formData.password === requiredPassword) {
      // Successful login
      setLoggedIn(true);
      setFormErrors({});
    } else {
      // Failed login, display error message
      setLoggedIn(false);
      setFormErrors({ login: 'Invalid email or password' });
    }
  };

  const handleLogout = () => {
    // Implement logout logic here.
    // For this example, we'll just set the isLoggedIn state to false.
    setLoggedIn(false);
  };

  return (
    <React.Fragment>
      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        <WeatherPage onLogout={handleLogout} />
      ) : (
        <Components.Container>
          <Components.Image src={rightPanelImage} alt="Background Image" />
          <Components.SignInContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {formErrors.email && <Components.Error>{formErrors.email}</Components.Error>}
              <Components.Input
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {formErrors.password && <Components.Error>{formErrors.password}</Components.Error>}
              {formErrors.login && <Components.Error>{formErrors.login}</Components.Error>}
              <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
              <Components.Button onClick={handleLogin}>Sign In</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us, please login with your personal info.
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      )}
    </React.Fragment>
  );
}

export default App;

