const fetch = require('node-fetch');

async function testAuth() {
  try {
    // Test signup
    console.log('Testing signup...');
    const signupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
      }),
    });
    const signupData = await signupResponse.json();
    console.log('Signup response:', signupData);

    // Test signin
    console.log('\nTesting signin...');
    const signinResponse = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123',
      }),
    });
    const signinData = await signinResponse.json();
    console.log('Signin response:', signinData);

    // Test signout
    console.log('\nTesting signout...');
    const signoutResponse = await fetch('http://localhost:3000/api/auth/signout', {
      method: 'POST',
    });
    const signoutData = await signoutResponse.json();
    console.log('Signout response:', signoutData);

  } catch (error) {
    console.error('Error testing auth:', error);
  }
}

testAuth(); 