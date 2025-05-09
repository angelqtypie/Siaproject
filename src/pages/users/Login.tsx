import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { Session } from '@supabase/supabase-js';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
      return;
    }

    if (data.session) {
      const session: Session = data.session;

      // Store the access token (optional, Supabase also persists it internally)
      localStorage.setItem('access_token', session.access_token);

      // Fetch user data from 'users' table
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError) {
        setLoginError('User profile not found.');
        return;
      }

      // Redirect based on profile completeness
      if (!user.full_name || !user.course) {
        history.push('/profile-update');
      } else {
        history.push('/dashboard');
      }
    } else {
      setLoginError('No session returned.');
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      {loginError && <div className="error">{loginError}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Don't have an account? <a href="/sign-up">Sign up now</a>
      </p>
    </div>
  );
};

export default Login;
