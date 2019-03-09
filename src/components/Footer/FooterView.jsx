import React from 'react';

const FooterView = () => {
  return (
    <footer data-testid="footer" className="d-flex flex-column flex-sm-row justify-content-sm-between">
      <div>
        <p>Address</p>
        <p>Address 1234</p>
        <p>Singapore 21313</p>
      </div>
      <div className="d-flex flex-column flex-sm-row">
        <ul className="list-unstyled list-group ml-sm-4 mb-3 mb-sm-0">
          <li className="border-bottom">Item Header</li>
          <li className="">Item 1</li>
          <li className="">Item 2</li>
        </ul>
        <ul className="list-unstyled list-group ml-sm-4 mb-3 mb-sm-0">
          <li className="border-bottom">Item Header</li>
          <li className="">Item 1</li>
          <li className="">Item 2</li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterView;
