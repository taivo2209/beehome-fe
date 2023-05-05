import React from 'react';
import Button from 'react-bootstrap/Button';

function FormInfoBookDayToMeet({ customer, setBook }) {
  return (
    <>
      <form>
        <div className="input-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="First Name"
            defaultValue={customer.firstName}
            onChange={(e) =>
              setBook({ ...customer, firstName: e.target.value })
            }
          />
        </div>
        <div className="input-group form-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="Last Name"
            defaultValue={customer.lastName}
            onChange={(e) => setBook({ ...customer, lastName: e.target.value })}
          />
        </div>
        <div className="input-group form-group mb-2 mr-sm-2">
          <input
            type="email"
            className="form-control"
            required
            placeholder="Email"
            defaultValue={customer.email}
            onChange={(e) => setBook({ ...customer, email: e.target.value })}
          />
        </div>

        <div className="input-group form-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="Phone number"
            defaultValue={customer.phoneNumber}
            onChange={(e) =>
              setBook({ ...customer, phoneNumber: e.target.value })
            }
          />
        </div>
      </form>
    </>
  );
}

export default FormInfoBookDayToMeet;
