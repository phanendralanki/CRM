const Home = () => {
  return (
    <>
      <div className="home-page">
        <h1 className="Title">The new CRM:</h1>
        <p className="sub-title">
          from <span>teams</span> to dreams
        </p>
        <button className="get-started">Get Started</button>
      </div>

      <div className="app-features">
        <div className="feature">
          <img
            className="feature-img"
            src="https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/j9r7crv6mz8g566kwqh9zv5/software.svg"
          />
          <p className="feature-text">Software</p>
        </div>
        <div className="feature">
          <img
            className="feature-img"
            src="https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/tvm6cp9vpg8v9t8fkx4fjg7k/prod-management.svg"
          />
          <p className="feature-text">Product Management</p>
        </div>
        <div className="feature">
          <img
            className="feature-img"
            src="https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/k34vvccq4jr79sn4vrt6x9b/proj-management-hover.svg"
          />
          <p className="feature-text">Marketing</p>
        </div>
        <div className="feature">
          <img
            className="feature-img"
            src="https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/vsk3xn63rrsfk7f3xbzxhfk/design-hover.svg"
          />
          <p className="feature-text">Project Management</p>
        </div>
      </div>

      <div className="about">
        <h3>About Us</h3>
        <p>
          With Oneyes CRM, everything regarding project maintenance is done for
          us, and there’s less downtime and better performance.
        </p>
        <p>
          Connect and consolidate scattered docs and disconnected teammates in
          one, central source of truth.
        </p>
        <p className="mb-4 text-slate-700">
          If your mind thinks about mobile/website development, then we have
          created a niche for ourselves. We started in 2012 with just 3
          employees and now have expanded ourselves to 50+ which shows about
          growth and quality of work that we did over the years.
        </p>
        <p className="mb-4 text-slate-700">
          If your mind thinks about mobile/website development, then we have
          created a niche for ourselves. We started in 2012 with just 3
          employees and now have expanded ourselves to 50+ which shows about
          growth and quality of work that we did over the years.
        </p>
        <p className="mb-4 text-slate-700">
          If your mind thinks about mobile/website development, then we have
          created a niche for ourselves. We started in 2012 with just 3
          employees and now have expanded ourselves to 50+ which shows about
          growth and quality of work that we did over the years.
        </p>
      </div>

      <div className="images">
        <div className="img-1">
          <img src="https://miro.medium.com/v2/resize:fit:1400/0*7VyEZgzwUhQMeBqb" />
        </div>
        <div className="img-2">
          <img src="https://theqalead.com/wp-content/cache/theqalead.com/static/static.crozdesk.com/web-app-library-categories-providers-screenshots-001-096-435-pub-visual-studio-code-screenshot-1694985643.png" />
        </div>
      </div>
    </>
  );
};

export default Home;
