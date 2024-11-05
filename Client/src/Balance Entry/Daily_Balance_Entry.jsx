import React, { useEffect, useState } from "react";
import MovingComponent from "react-moving-text";
import Swal from "sweetalert2";
import DailyBalanceCalculation from "./DailyBalanceCalculation";

const Daily_Balance_Entry = () => {
  const [amount, setAmount] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectDate, setSelectDate] = useState("");

  useEffect(() => {
    if (!isModalOpen) {
      handleDateSearch();
    }
  }, [isModalOpen]);

  const handleCancel = () => {
    // Reset form data or any other state variables

    setSelectDate("");
    // Close the modal
    setIsModalOpen(false);
  };
  const handleDateSelect = (e) => {
    const { value } = e.target;
    setSelectDate(value);
  };

  const handleDateSearch = () => {
    fetch(
      `https://dbb-server-cd2o.onrender.com/singleBankData?date=${selectDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAmount(data);

        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAddBalanceEntry = (event) => {
    event.preventDefault();
    const form = event.target;

    const BankAlfalahLtd = form.BankAlfalahLtd.value;
    const HSBC = form.HSBC.value;
    const BankAsia = form.BankAsia.value;
    const SCB = form.SCB.value;
    const DhakaBankLtd = form.DhakaBankLtd.value;
    const WooriBank = form.WooriBank.value;
    const PrimeBankLtd = form.PrimeBankLtd.value;
    const TheCityBankLtd = form.TheCityBankLtd.value;
    const CitibankNA = form.CitibankNA.value;
    const HabibBankLtd = form.HabibBankLtd.value;
    const EasternBankLtd = form.EasternBankLtd.value;
    const BRACBankLtd = form.BRACBankLtd.value;
    const StateBankOfIndia = form.StateBankOfIndia.value;
    const DutchBanglaBankLtd = form.DutchBanglaBankLtd.value;
    const DutchBanglaBankLtdOD = form.DutchBanglaBankLtdOD.value;
    const TheCityBankLtdOD = form.TheCityBankLtdOD.value;
    const PrimeBankLtdOD = form.PrimeBankLtdOD.value;
    const StateBankOfIndiaOD = form.StateBankOfIndiaOD.value;
    const MIDLANDBankLimited = form.MIDLANDBankLimited.value;
    const PubaliBankLtd = form.PubaliBankLtd.value;
    const IslamiBankBangladeshLtd = form.IslamiBankBangladeshLtd.value;
    const ShahjalalIslamiBankLtd = form.ShahjalalIslamiBankLtd.value;
    const AlarafahIslamiBankLtd = form.AlarafahIslamiBankLtd.value;
    const UnitedCommercialBankLtd = form.UnitedCommercialBankLtd.value;
    const SocialIslamiBankLtd = form.SocialIslamiBankLtd.value;
    const MercentileBankLtd = form.MercentileBankLtd.value;
    const NationalBankLtdGulshan = form.NationalBankLtdGulshan.value;
    const NationalBankLtdJoina = form.NationalBankLtdJoina.value;
    const SonaliBankLtd = form.SonaliBankLtd.value;
    const UttaraBankLtd = form.UttaraBankLtd.value;
    const AgraniBankLtd = form.AgraniBankLtd.value;
    const BangladeshKrishiBank = form.BangladeshKrishiBank.value;
    const ABBankLtd = form.ABBankLtd.value;
    const JanataBankLtd = form.JanataBankLtd.value;
    const RupaliBankLtd = form.RupaliBankLtd.value;

    event.target.reset();
    const date = selectDate;
    const bankData = {
      date,
      BankAlfalahLtd,
      HSBC,
      SCB,
      DhakaBankLtd,
      BankAsia,
      WooriBank,
      PrimeBankLtd,
      TheCityBankLtd,
      CitibankNA,
      HabibBankLtd,
      EasternBankLtd,
      BRACBankLtd,
      StateBankOfIndia,
      DutchBanglaBankLtd,
      DutchBanglaBankLtdOD,
      TheCityBankLtdOD,
      PrimeBankLtdOD,
      StateBankOfIndiaOD,
      MIDLANDBankLimited,
      PubaliBankLtd,
      IslamiBankBangladeshLtd,
      ShahjalalIslamiBankLtd,
      AlarafahIslamiBankLtd,
      UnitedCommercialBankLtd,
      SocialIslamiBankLtd,
      MercentileBankLtd,
      NationalBankLtdGulshan,
      NationalBankLtdJoina,
      SonaliBankLtd,
      UttaraBankLtd,
      AgraniBankLtd,
      BangladeshKrishiBank,
      ABBankLtd,
      JanataBankLtd,
      RupaliBankLtd,
    };

    fetch("https://dbb-server-cd2o.onrender.com/addBanksData", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bankData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.upsertedCount) {
          handleDateSearch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Balance Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        if (data.modifiedCount) {
          handleDateSearch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Balance Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="mx-12 ">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" ">
            <div className="relative bg-white p-12 rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={handleCancel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <form onSubmit={handleDateSearch}>
                <div className="form-control ">
                  <label className="label ">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2 ">
                      Select Date
                    </span>
                  </label>
                  <input
                    type="date"
                    name="selectDate"
                    value={selectDate}
                    onChange={handleDateSelect}
                    required
                    className="input input-bordered w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </div>

                <div className="form-control mt-8">
                  {selectDate && (
                    <button
                      type="submit"
                      className="btn bg-gray-800 text-white btn-block"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Search
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <MovingComponent
        type="slideInFromBottom"
        duration="3000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
        className="text-start text-xl font-bold leading-9 tracking-wide text-gray-800 md:me-12"
      >
        <span className="text-gray-700 tracking-wide">
          Daily Bank Wise Balance Sheet
        </span>
      </MovingComponent>

      <form onSubmit={handleAddBalanceEntry}>
        <div className="form-control">
          <div className="w-full">
            <DailyBalanceCalculation
              amount={amount[0]}
              selectDate={selectDate}
            ></DailyBalanceCalculation>
          </div>

          {/* Table start */}
          <table className="table border table-zebra ">
            <thead className="">
              <tr>
                <th className="w-2/12">SN</th>
                <th className="w-4/12">Bank Name</th>
                <th className="w-3/12">Amount in TK./Lac</th>
                <th className="w-3/12">Add / Edit Amount</th>
              </tr>
            </thead>
            <tbody className="tracking-widest ">
              {/* Row 1 */}

              <tr>
                <td>01</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      AB Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.ABBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="ABBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td>02</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Agrani Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.AgraniBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="AgraniBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td>03</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Al-arafah Islami Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.AlarafahIslamiBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="AlarafahIslamiBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td>04</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Bangladesh Krishi Bank
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.BangladeshKrishiBank}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="BangladeshKrishiBank"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 5 */}
              <tr>
                <td>05</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Bank Asia PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.BankAsia}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="BankAsia"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md overflow-hidden "
                  />
                </td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td>05</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Bank Alfalah Ltd
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.BankAlfalahLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="BankAlfalahLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md overflow-hidden "
                  />
                </td>
              </tr>
              {/* Row 6 */}
              <tr>
                <td>06</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      BRAC Bank Ltd
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.BRACBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="BRACBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 7 */}
              <tr>
                <td>07</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Citibank N.A.
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.CitibankNA}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="CitibankNA"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 8 */}
              <tr>
                <td>08</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Dhaka Bank Ltd.
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.DhakaBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="DhakaBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 9 */}
              <tr>
                <td>09</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Dutch-Bangla Bank Ltd.
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.DutchBanglaBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="DutchBanglaBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 10 */}
              <tr>
                <td>10</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Dutch-Bangla Bank Ltd (OD)
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.DutchBanglaBankLtdOD}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="DutchBanglaBankLtdOD"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 11 */}

              <tr>
                <td>11</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Eastern Bank PLC.
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.EasternBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="EasternBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 12 */}
              <tr>
                <td>12</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Habib Bank Ltd.
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.HabibBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="HabibBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 13 */}
              <tr>
                <td>13</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      HSBC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.HSBC}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="HSBC"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 14 */}
              <tr>
                <td>14</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Islami Bank Bangladesh PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.IslamiBankBangladeshLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="IslamiBankBangladeshLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 15 */}
              <tr>
                <td>15</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Janata Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.JanataBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="JanataBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 16 */}
              <tr>
                <td>16</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Mercentile Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.MercentileBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="MercentileBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 17 */}
              <tr>
                <td>17</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      MIDLAND Bank Limited
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.MIDLANDBankLimited}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="MIDLANDBankLimited"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 18 */}
              <tr>
                <td>18</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      National Bank Ltd, Gulshan
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.NationalBankLtdGulshan}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="NationalBankLtdGulshan"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 19 */}
              <tr>
                <td>19</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      National Bank Ltd, Joina
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.NationalBankLtdJoina}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="NationalBankLtdJoina"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 20 */}
              <tr>
                <td>20</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Prime Bank PLC.
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.PrimeBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="PrimeBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 21 */}
              <tr>
                <td>21</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Prime Bank PLC. (OD)
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.PrimeBankLtdOD}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="PrimeBankLtdOD"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 22 */}
              <tr>
                <td>22</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Pubali Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.PubaliBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="PubaliBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 23 */}
              <tr>
                <td>23</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Rupali Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.RupaliBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="RupaliBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 24 */}
              <tr>
                <td>24</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      SCB
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.SCB}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="SCB"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 25 */}
              <tr>
                <td>25</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Shahjalal Islami Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.ShahjalalIslamiBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="ShahjalalIslamiBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 26 */}
              <tr>
                <td>26</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Social Islami Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.SocialIslamiBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="SocialIslamiBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 27 */}
              <tr>
                <td>27</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Sonali Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.SonaliBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="SonaliBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 28 */}

              <tr>
                <td>28</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      State Bank Of India
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.StateBankOfIndia}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="StateBankOfIndia"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 29 */}
              <tr>
                <td>29</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      State Bank Of India (OD)
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.StateBankOfIndiaOD}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="StateBankOfIndiaOD"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 30 */}
              <tr>
                <td>30</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      The City Bank Ltd.
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.TheCityBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="TheCityBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>

              {/* Row 31 */}

              <tr>
                <td>31</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      The City Bank Ltd. (OD)
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.TheCityBankLtdOD}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="TheCityBankLtdOD"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 32 */}
              <tr>
                <td>32</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      United Commercial Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.UnitedCommercialBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="UnitedCommercialBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 33 */}
              <tr>
                <td>33</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Uttara Bank PLC
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.UttaraBankLtd}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="UttaraBankLtd"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
              {/* Row 34 */}
              <tr>
                <td>34</td>
                <td>
                  <label className="label">
                    <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                      Woori Bank
                    </span>
                  </label>
                </td>
                <td>{amount[0]?.WooriBank}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="WooriBank"
                    className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {/* Table End */}
        </div>

        <div className="flex justify-center mt-10 mb-20">
          <input
            className="btn bg-gray-800 text-white w-2/12"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Daily_Balance_Entry;
