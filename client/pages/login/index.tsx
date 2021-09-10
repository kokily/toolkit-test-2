import useLogin from './hooks/useLogin';

function LoginPage() {
  const { password, onChange, onLogin } = useLogin();

  return (
    <div>
      <h2>LoginPage</h2>

      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <button onClick={onLogin}>LOGIN</button>
      </div>
    </div>
  );
}

export default LoginPage;
