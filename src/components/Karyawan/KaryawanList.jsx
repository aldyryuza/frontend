import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function KaryawanList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/karyawan");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletekaryawan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/karyawan/${id}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <br />
      <div className="row mb-2">
        <div className="col-12 text-center">
          <h4>Data Karyawan</h4>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Jenis Kelamin</th>
                      <th>No Hp</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((karyawan, index) => (
                      <tr key={karyawan._id}>
                        <td>{index + 1}</td>
                        <td>{karyawan.name}</td>
                        <td>{karyawan.alamat}</td>
                        <td>{karyawan.jenis_kelamin}</td>
                        <td>{karyawan.no_hp}</td>
                        <td>
                          <Link
                            to={`/detail-karyawan/${karyawan._id}`}
                            className="btn btn-primary mx-1"
                          >
                            Detail
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => deletekaryawan(karyawan._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KaryawanList;
