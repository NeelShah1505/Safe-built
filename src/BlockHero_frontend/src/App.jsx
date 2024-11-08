import { useState } from 'react';
import { BlockHero_backend } from 'declarations/BlockHero_backend';
import { AuthClient } from '@dfinity/auth-client';

function App() {
  const [greeting, setGreeting] = useState('');
  const [identity, setIdentity] = useState('');
  const [isIdentityLogin, setIsIdentityLogin] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    BlockHero_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  async function authenticate() {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        console.log(identity.getPrincipal().toString());
        setIdentity(identity.getPrincipal().toString())
        setIsIdentityLogin(true);
      },
    });
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <div className="auth-section">
        <button className="auth-button" onClick={authenticate}>Identity Login</button>
      </div>
      <br />
      {isIdentityLogin ? 
      <div>
        <p>Identity : {identity}</p>
      </div>
      :
      <div></div>
      }
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
