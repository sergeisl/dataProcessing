import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

class Layout extends React.Component {

  static propTypes = {
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired
    }).isRequired
  }

  shouldComponentUpdate(nextProps) {
    return this.props.location !== nextProps.location
  }

  render() {
    const {location: {pathname}, children} = this.props

    return (
      <main className="wrapper">
        <nav className="navigation">
          <section className="container">
            <Link className="navigation-title" to="/">App</Link>
            <ul className="navigation-list float-right">
              <li className={`navigation-item${pathname.startsWith("/home") ? " active" : ""}`}>
                  <Link className="navigation-link" to="/home">Страница 1</Link>
              </li>
            </ul>
          </section>
        </nav>
        <section className="container main-container">
          {children}
        </section>
      </main>
    )
  }
}

export default connect()(Layout)
