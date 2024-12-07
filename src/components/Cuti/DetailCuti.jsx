import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
function DetailCuti() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [username, setUsername] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [jenis_kelamin, setJenisKelamin] = useState([]);
  const [no_hp, setNoHP] = useState([]);
  const [status_pengajuan_cuti, setStatusPengajuanCuti] = useState([]);
  const [tanggal_awal, setTanggalAwal] = useState([]);
  const [tanggal_akhir, setTanggalAkhir] = useState([]);
  const [keterangan, setKeterangan] = useState([]);

  const { id } = useParams();

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/cuti/${id}`);
    // console.log(response.data.id_karyawan);

    setName(response.data.id_karyawan.name);
    setEmail(response.data.id_karyawan.email);
    setPassword(response.data.id_karyawan.password);
    setAlamat(response.data.id_karyawan.alamat);
    setJenisKelamin(response.data.id_karyawan.jenis_kelamin);
    setNoHP(response.data.id_karyawan.no_hp);
    setStatusPengajuanCuti(response.data.status);
    setTanggalAwal(response.data.tanggal.awal);
    setTanggalAkhir(response.data.tanggal.akhir);
    setKeterangan(response.data.keterangan);
  };
  useEffect(() => {
    getUserById();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date"; // Jika kosong, kembalikan teks default
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date"; // Jika format salah, kembalikan teks default
    return date.toISOString().split("T")[0];
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
          <h4>Detail Cuti Karyawan</h4>
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
                      <td>Keterangan Cuti</td>
                      <td>:</td>
                      <td>{keterangan}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Cuti</td>
                      <td>:</td>
                      <td>{formatDate(tanggal_awal)}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Akhir Cuti</td>
                      <td>:</td>
                      <td>{formatDate(tanggal_akhir)}</td>
                    </tr>
                    <tr>
                      <td>Lama Cuti</td>
                      <td>:</td>
                      <td>{hitung_lama_cuti(tanggal_awal, tanggal_akhir)}</td>
                    </tr>
                    <tr>
                      <td>Status Pengajuan Cuti</td>
                      <td>:</td>
                      <td>
                      <span
                            className={`badge ${
                              status_pengajuan_cuti === "approved"
                                ? "bg-success"
                                : status_pengajuan_cuti === "rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {status_pengajuan_cuti}
                          </span>
                        </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <br />
          <Link to="/cuti" className="btn btn-secondary mx-1">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default DetailCuti;
