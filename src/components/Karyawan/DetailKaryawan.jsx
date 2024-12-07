import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
function DetailKaryawan() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [username, setUsername] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [jenis_kelamin, setJenisKelamin] = useState([]);
  const [no_hp, setNoHP] = useState([]);

  const { id } = useParams();

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/karyawan/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setPassword(response.data.password);
    setAlamat(response.data.alamat);
    setJenisKelamin(response.data.jenis_kelamin);
    setNoHP(response.data.no_hp);
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <>
      <br />
      <div className="row mb-2">
        <div className="col-12 text-center">
          <h4>Detail Karyawan</h4>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <table className="table table-borderless">
                    <tr>
                      <td>Nama</td>
                      <td>:</td>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>:</td>
                      <td>{alamat}</td>
                    </tr>
                    <tr>
                      <td>Jenis Kelamin</td>
                      <td>:</td>
                      <td>{jenis_kelamin}</td>
                    </tr>
                    <tr>
                      <td>No HP</td>
                      <td>:</td>
                      <td>{no_hp}</td>
                    </tr>
                  </table>
                </div>
                <div className="col-6">
                  <table className="table table-borderless">
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>:</td>
                      <td>{username}</td>
                    </tr>
                    <tr>
                      <td>Password</td>
                      <td>:</td>
                      <td>{password}</td>
                    </tr>
                    
                  </table>
                </div>
              </div>
            </div>
          </div>
          <br />
          <Link to="/karyawan" className="btn btn-secondary mx-1">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default DetailKaryawan;
