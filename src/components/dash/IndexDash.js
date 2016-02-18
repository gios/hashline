import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class IndexDash extends Component {

  render() {
    return (
      <nav role='navigation' className='navbar navbar-dark navbar-static'>
        <div className='navbar-info'>
          <p className='navbar-logo'>Sportalking</p>
          <div className='navbar-user-info'>
            <div>Oneal</div>
            <div>oneal@gmail.com</div>
          </div>
        </div>
        <div className='collapse navbar-toggleable-xs'>
          <ul className='nav sidebar-list-static'>
            <li className='nav-item active'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-dashcube'></i>
                <span className='sidebar-list-item'>Dash</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' data-toggle='collapse' href='#soccerCollapse' aria-expanded='false' aria-controls='soccerCollapse'>
                <i className='fa fa-angle-down'></i>
                <span className='sidebar-list-item'>Soccer</span>
              </a>
            </li>
            <div className='collapse' id='soccerCollapse'>
              <ul className='nav sidebar-list-static'>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link-nested' href='#'>
                    <i className='fa fa-angle-right'></i>
                    <span className='sidebar-list-item'>English Premier League</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link-nested' href='#'>
                    <i className='fa fa-angle-right'></i>
                    <span className='sidebar-list-item'>Bundesliga</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link-nested' href='#'>
                    <i className='fa fa-angle-right'></i>
                    <span className='sidebar-list-item'>La Liga</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link-nested' href='#'>
                    <i className='fa fa-angle-right'></i>
                    <span className='sidebar-list-item'>Ukrainian Premier League</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link-nested' href='#'>
                    <i className='fa fa-angle-right'></i>
                    <span className='sidebar-list-item'>Serie A</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link-nested' href='#'>
                    <i className='fa fa-angle-right'></i>
                    <span className='sidebar-list-item'>Eredivisie</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link sidebar-link-nested' href='#'>
                    <i className='fa fa-angle-right'></i>
                    <span className='sidebar-list-item'>Major League Soccer</span>
                  </a>
                </li>
              </ul>
            </div>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-down'></i>
                <span className='sidebar-list-item'>Basketball</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-down'></i>
                <span className='sidebar-list-item'>American Football</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-down'></i>
                <span className='sidebar-list-item'>Hockey</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-angle-down'></i>
                <span className='sidebar-list-item'>Tennis</span>
              </a>
            </li>
            <li className='nav-item deactivate'></li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='#'>
                <i className='fa fa-rss'></i>
                <span className='sidebar-list-item'>Feed</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default IndexDash
