import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function CutiList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cuti");
      setData(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletecuti = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cuti/${id}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Mengambil hanya tanggal
  };

  const hitung_lama_cuti = (tanggal_awal, tanggal_akhir) => {
    const awal = new Date(tanggal_awal);
    const akhir = new Date(tanggal_akhir);
    const diffTime = akhir.getTime() - awal.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <br />
      <div className="row mb-2">
        <div className="col-12 text-center">
          <h4>Data Cuti Karyawan</h4>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          <Link to="/add-cuti" className="btn btn-success">
            Add Cuti
          </Link>
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
                      <th>Tanggal Awal Cuti</th>
                      <th>Tanggal Akhir Cuti</th>
                      <th>Lama Cuti</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((cuti, index) => (
                      <tr key={cuti._id}>
                        <td>{index + 1}</td>
                        <td>{cuti.id_karyawan.name}</td>
                        <td>{formatDate(cuti.tanggal.awal)}</td>
                        <td>{formatDate(cuti.tanggal.akhir)}</td>
                        <td>
                          {hitung_lama_cuti(
                            cuti.tanggal.awal,
                            cuti.tanggal.akhir
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              cuti.status === "approved"
                                ? "bg-success"
                                : cuti.status === "rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {cuti.status}
                          </span>
                        </td>

                        <td>
                          <Link
                            to={`/detail-cuti/${cuti._id}`}
                            className="btn btn-primary mx-1"
                          >
                            Detail
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => deletecuti(cuti._id)}
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

export default CutiList;
