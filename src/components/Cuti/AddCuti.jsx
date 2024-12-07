import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCuti = () => {
  const [keterangan, setKeterangan] = useState("");
  const [tanggal_awal, setTanggalAwal] = useState("");
  const [tanggal_akhir, setTanggalAkhir] = useState("");
  const [error, setError] = useState(""); // Untuk menampilkan pesan error

  const navigate = useNavigate();

  const saveuser = async (e) => {
    e.preventDefault();

    // Validasi tanggal akhir harus lebih besar dari tanggal awal
    if (new Date(tanggal_awal) >= new Date(tanggal_akhir)) {
      setError("Tanggal Akhir harus lebih besar dari Tanggal Awal.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/cuti", {
        keterangan,
        tanggal_awal,
        tanggal_akhir,
        id_user: localStorage.getItem("id_user"),
      });
      navigate("/cuti");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={saveuser}>
                {/* Pesan Error */}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row mb-2">
                  <div className="col-6">
                    <label className="form-label">Tanggal Awal</label>
                    <input
                      type="date"
                      className="form-control"
                      value={tanggal_awal}
                      onChange={(e) => setTanggalAwal(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Tanggal Akhir</label>
                    <input
                      type="date"
                      className="form-control"
                      value={tanggal_akhir}
                      onChange={(e) => setTanggalAkhir(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Keterangan</label>
                    <textarea
                      className="form-control"
                      name="keterangan"
                      id="keterangan"
                      cols="30"
                      rows="10"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <br />
                <div className="row mb-2">
                  <div className="col-12">
                    <Link to="/cuti" className="btn btn-secondary mx-1">
                      Back
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Submit
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
};

export default AddCuti;
