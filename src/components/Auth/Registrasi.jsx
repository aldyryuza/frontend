import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registrasi() {
  const [name, setName] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [no_hp, setNoHp] = useState([]);
  const [jenis_kelamin, setJenisKelamin] = useState([]);

  const navigate = useNavigate();

  const resgistrasiUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/registrasi", {
        name,
        email,
        username,
        password,
        alamat,
        no_hp,
        jenis_kelamin,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <br />
      <div className="row">
        <div className="col">
          <div className="card w-50 mx-auto m-auto">
            <div className="card-header">
              <h3> Registrasi Page</h3>
            </div>
            <div className="card-body">
              <form onSubmit={resgistrasiUser}>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Alamat</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Alamat"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label htmlFor="jenis_kelamin" className="form-label">
                      Jenis Kelamin
                    </label>
                    <select
                      name="jenis_kelamin"
                      id="jenis_kelamin"
                      className="form-select"
                      value={jenis_kelamin}
                      onChange={(e) => setJenisKelamin(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Pilih Jenis Kelamin
                      </option>
                      <option value="Laki - Laki">Laki - Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">No Hp</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="No Hp"
                      value={no_hp}
                      onChange={(e) => setNoHp(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <br />
                <div className="row mb-2">
                  <div className="col-12 text-end">
                    <Link to="/login" className="btn btn-secondary mx-1">
                      Login
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Registrasi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrasi;
