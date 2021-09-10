import useLoggedIn from '../libs/hooks/useLoggedIn';

function IndexPage() {
  useLoggedIn();

  return <div>IndexPage</div>;
}

export default IndexPage;
