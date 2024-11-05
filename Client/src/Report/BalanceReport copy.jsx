import React, { useState, useEffect } from "react";
import MovingComponent from "react-moving-text";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BalanceReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allBankData, setAllBankData] = useState([]);

  useEffect(() => {
    if (!isModalOpen) {
      handleSearch();
    }
  }, [isModalOpen]);

  useEffect(() => {
    fetch("https://dbb-server-cd2o.onrender.com/allBankData")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = [...data].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
        setAllBankData(sortedData);
      });
  }, []);

  // console.log(allBankData);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    // console.log(name, value);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    if (startDate && endDate) {
      const filtered = allBankData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(allBankData);
    }
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["SN", "Bank Name", ...filteredData.map((item) => item.date)],
    ];

    // Define bank names and their corresponding property keys in the filteredData objects
    const banks = [
      { name: "Bank Alfalah Ltd", key: "BankAlfalahLtd" },
      { name: "HSBC", key: "HSBC" },
      { name: "SCB", key: "SCB" },
      { name: "Dhaka Bank Ltd", key: "DhakaBankLtd" },
      { name: "Woori Bank", key: "WooriBank" },
      { name: "Prime Bank PLC", key: "PrimeBankLtd" },
      { name: "The City Bank Ltd", key: "TheCityBankLtd" },
      { name: "Citibank N.A.", key: "CitibankNA" },
      { name: "Habib Bank Ltd.", key: "HabibBankLtd" },
      { name: "Eastern Bank PLC.", key: "EasternBankLtd" },
      { name: "BRAC Bank Ltd.", key: "BRACBankLtd" },
      { name: "State Bank Of India", key: "StateBankOfIndia" },
      { name: "Dutch Bangla Bank Ltd", key: "DutchBanglaBankLtd" },
      { name: "Dutch Bangla Bank Ltd (OD)", key: "DutchBanglaBankLtdOD" },
      { name: "The City Bank Ltd (OD)", key: "TheCityBankLtdOD" },
      { name: "Prime Bank PLC (OD)", key: "PrimeBankLtdOD" },
      { name: "State Bank Of India (OD)", key: "StateBankOfIndiaOD" },
      { name: "MIDLAND Bank Limited", key: "MIDLANDBankLimited" },
      { name: "Pubali Bank PLC", key: "PubaliBankLtd" },
      { name: "Islami Bank Bangladesh PLC", key: "IslamiBankBangladeshLtd" },
      { name: "Shahjalal Islami Bank PLC", key: "ShahjalalIslamiBankLtd" },
      { name: "Al-arafah Islami Bank PLC", key: "AlarafahIslamiBankLtd" },
      { name: "United Commercial Bank PLC", key: "UnitedCommercialBankLtd" },
      { name: "Social Islami Bank PLC", key: "SocialIslamiBankLtd" },
      { name: "Mercentile Bank PLC", key: "MercentileBankLtd" },
      { name: "National Bank Ltd,Gulshan", key: "NationalBankLtdGulshan" },
      { name: "National Bank Ltd,Joina", key: "NationalBankLtdJoina" },
      { name: "Sonali Bank PLC", key: "SonaliBankLtd" },
      { name: "Uttara Bank PLC", key: "UttaraBankLtd" },
      { name: "Agrani Bank PLC", key: "AgraniBankLtd" },
      { name: "Bangladesh Krishi Bank", key: "BangladeshKrishiBank" },
      { name: "AB Bank PLC", key: "ABBankLtd" },
      { name: "Janata Bank PLC", key: "JanataBankLtd" },
      { name: "Rupali Bank PLC", key: "RupaliBankLtd" },
    ];

    // Add rows for each bank
    banks.forEach((bank, index) => {
      wsData.push([
        (index + 1).toString(),
        bank.name,
        ...filteredData.map((item) => (item[bank.key] / 10000000).toFixed(2)),
      ]);
    });

    // Add summary rows
    wsData.push(
      [
        "",
        "Total",
        ...filteredData.map((item) => (item.total / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance With Savings Account",
        ...filteredData.map((item) =>
          (item.savings_account / 10000000).toFixed(2)
        ),
      ],
      [
        "",
        "Balance For Feedmill operation Bank (SFM & RFM)",
        ...filteredData.map((item) => (item.sfm_rfm / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance with LC facility & Local Payment Bank",
        ...filteredData.map((item) => (item.lc / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance with OD Account",
        ...filteredData.map((item) => (item.od / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance with sales Collection Bank Account",
        ...filteredData.map((item) => (item.scb / 10000000).toFixed(2)),
      ]
    );

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Bank Data");

    // Ensure numeric values are recognized as numbers
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = 2; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        const cell = ws[cell_ref];
        if (cell && !isNaN(cell.v)) {
          cell.t = "n"; // Set cell type to number
          cell.v = parseFloat(cell.v); // Ensure the value is a number
        }
      }
    }

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "bank_data.xlsx"
    );
  };

  const handleExportCR = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["SN", "Bank Name", ...filteredData.map((item) => item.date)],
    ];

    // Define bank names and their corresponding property keys in the filteredData objects
    const banks = [
      { name: "Bank Alfalah Ltd", key: "BankAlfalahLtd" },
      { name: "HSBC", key: "HSBC" },
      { name: "SCB", key: "SCB" },
      { name: "Dhaka Bank Ltd", key: "DhakaBankLtd" },
      { name: "Woori Bank", key: "WooriBank" },
      { name: "Prime Bank PLC", key: "PrimeBankLtd" },
      { name: "The City Bank Ltd", key: "TheCityBankLtd" },
      { name: "Citibank N.A.", key: "CitibankNA" },
      { name: "Habib Bank Ltd.", key: "HabibBankLtd" },
      { name: "Eastern Bank PLC.", key: "EasternBankLtd" },
      { name: "BRAC Bank Ltd.", key: "BRACBankLtd" },
      { name: "State Bank Of India", key: "StateBankOfIndia" },
      { name: "Dutch Bangla Bank Ltd", key: "DutchBanglaBankLtd" },
      { name: "Dutch Bangla Bank Ltd (OD)", key: "DutchBanglaBankLtdOD" },
      { name: "The City Bank Ltd (OD)", key: "TheCityBankLtdOD" },
      { name: "Prime Bank PLC (OD)", key: "PrimeBankLtdOD" },
      { name: "State Bank Of India (OD)", key: "StateBankOfIndiaOD" },
      { name: "MIDLAND Bank Limited", key: "MIDLANDBankLimited" },
      { name: "Pubali Bank PLC", key: "PubaliBankLtd" },
      { name: "Islami Bank Bangladesh PLC", key: "IslamiBankBangladeshLtd" },
      { name: "Shahjalal Islami Bank PLC", key: "ShahjalalIslamiBankLtd" },
      { name: "Al-arafah Islami Bank PLC", key: "AlarafahIslamiBankLtd" },
      { name: "United Commercial Bank PLC", key: "UnitedCommercialBankLtd" },
      { name: "Social Islami Bank PLC", key: "SocialIslamiBankLtd" },
      { name: "Mercentile Bank PLC", key: "MercentileBankLtd" },
      { name: "National Bank Ltd,Gulshan", key: "NationalBankLtdGulshan" },
      { name: "National Bank Ltd,Joina", key: "NationalBankLtdJoina" },
      { name: "Sonali Bank PLC", key: "SonaliBankLtd" },
      { name: "Uttara Bank PLC", key: "UttaraBankLtd" },
      { name: "Agrani Bank PLC", key: "AgraniBankLtd" },
      { name: "Bangladesh Krishi Bank", key: "BangladeshKrishiBank" },
      { name: "AB Bank PLC", key: "ABBankLtd" },
      { name: "Janata Bank PLC", key: "JanataBankLtd" },
      { name: "Rupali Bank PLC", key: "RupaliBankLtd" },
    ];

    // Add rows for each bank
    banks.forEach((bank, index) => {
      wsData.push([
        (index + 1).toString(),
        bank.name,
        ...filteredData.map((item) => (item[bank.key] / 10000000).toFixed(2)),
      ]);
    });

    // Add summary rows
    wsData.push(
      [
        "",
        "Total",
        ...filteredData.map((item) => (item.total / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance With Savings Account",
        ...filteredData.map((item) =>
          (item.savings_account / 10000000).toFixed(2)
        ),
      ],
      [
        "",
        "Balance For Feedmill operation Bank (SFM & RFM)",
        ...filteredData.map((item) => (item.sfm_rfm / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance with LC facility & Local Payment Bank",
        ...filteredData.map((item) => (item.lc / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance with OD Account",
        ...filteredData.map((item) => (item.od / 10000000).toFixed(2)),
      ],
      [
        "",
        "Balance with sales Collection Bank Account",
        ...filteredData.map((item) => (item.scb / 10000000).toFixed(2)),
      ]
    );

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Bank Data");

    // Ensure numeric values are recognized as numbers
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = 2; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        const cell = ws[cell_ref];
        if (cell && !isNaN(cell.v)) {
          cell.t = "n"; // Set cell type to number
          cell.v = parseFloat(cell.v); // Ensure the value is a number
        }
      }
    }

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "bank_data.xlsx"
    );
  };

  return (
    <div className="md:mx-12 ">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <form onSubmit={handleSearch}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                    Start Date
                  </span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={handleDateChange}
                  required
                  className="input input-bordered w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                    End Date
                  </span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={handleDateChange}
                  required
                  className="input input-bordered w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                />
              </div>
              <div className="form-control mt-8">
                {startDate && endDate && (
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
      )}

      <MovingComponent
        type="slideInFromBottom"
        duration="3000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
        className="text-start text-lg font-bold leading-9 tracking-wide text-gray-800"
      >
        <span className="text-gray-700 tracking-wide">
          Daily Bank Statement Report
        </span>
      </MovingComponent>

      <div className="flex flex-col py-5 ">
        <div className="shadow-lg p-8 rounded-lg overflow-x-auto mt-4 md:w-full bg-white">
          <div className="flex m-5">
            <div className=" justify-between mb-4">
              <button
                onClick={handleExport}
                className="btn bg-green-500 text-white"
              >
                Export to Excel
              </button>
            </div>
            <div className="mx-5 justify-between mb-4">
              <button
                onClick={handleExportCR}
                className="btn bg-indigo-500 text-white"
              >
                Value in CR
              </button>
            </div>
          </div>
          {/* Table Component Start */}
          <div className="overflow-x-auto">
            {/* <table className="table-auto border-collapse w-full text-sm">  */}
            <table className="table">
              <thead>
                <tr>
                  <th className="border px-2 py-1 bg-gray-200">SN</th>
                  <th className="border px-20 py-1 bg-gray-200 ">Bank Name</th>
                  {filteredData.map((item, index) => (
                    <th key={index} className="border px-2 py-1 bg-gray-200">
                      {item.date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1 ">1</td>
                  <td className="border px-2 py-1 ">Bank Alfalah Ltd</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.BankAlfalahLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">2</td>
                  <td className="border px-2 py-1">HSBC</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.HSBC?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">3</td>
                  <td className="border px-2 py-1">SCB</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.SCB?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">4</td>
                  <td className="border px-2 py-1">Dhaka Bank Ltd</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.DhakaBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">5</td>
                  <td className="border px-2 py-1">Woori Bank</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.WooriBank?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">6</td>
                  <td className="border px-2 py-1"> Prime Bank PLC</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.PrimeBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">7</td>
                  <td className="border px-2 py-1">The City Bank Ltd</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.TheCityBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">8</td>
                  <td className="border px-2 py-1">Citibank N.A.</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.CitibankNA?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">9</td>
                  <td className="border px-2 py-1">Habib Bank Ltd.</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.HabibBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">10</td>
                  <td className="border px-2 py-1">Eastern Bank PLC.</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.EasternBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">11</td>
                  <td className="border px-2 py-1">BRAC Bank Ltd.</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.BRACBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">12</td>
                  <td className="border px-2 py-1">State Bank Of India</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.StateBankOfIndia?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">13</td>
                  <td className="border px-2 py-1">Dutch Bangla Bank Ltd</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.DutchBanglaBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">14</td>
                  <td className="border px-2 py-1">
                    Dutch Bangla Bank Ltd (OD)
                  </td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.DutchBanglaBankLtdOD?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">15</td>
                  <td className="border px-2 py-1">The City Bank Ltd (OD)</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.TheCityBankLtdOD?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">16</td>
                  <td className="border px-2 py-1"> Prime Bank PLC (OD)</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.PrimeBankLtdOD?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">17</td>
                  <td className="border px-2 py-1">State Bank Of India (OD)</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.StateBankOfIndiaOD?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">18</td>
                  <td className="border px-2 py-1">MIDLAND Bank Limited</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.MIDLANDBankLimited?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">19</td>
                  <td className="border px-2 py-1">Pubali Bank PLC</td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.PubaliBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">20</td>
                  <td className="border px-2 py-1">
                    Islami Bank Bangladesh PLC
                  </td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.IslamiBankBangladeshLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">21</td>
                  <td className="border px-2 py-1">
                    Shahjalal Islami Bank PLC
                  </td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.ShahjalalIslamiBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">22</td>
                  <td className="border px-2 py-1">
                    Al-arafah Islami Bank PLC
                  </td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.AlarafahIslamiBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">23</td>
                  <td className="border px-2 py-1">
                    United Commercial Bank PLC
                  </td>
                  {filteredData.map((item, index) => (
                    <td key={index} className="border px-2 py-1">
                      {item.UnitedCommercialBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">24</td>
                  <td className="border px-2 py-1">Social Islami Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.SocialIslamiBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">25</td>
                  <td className="border px-2 py-1">Mercentile Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.MercentileBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">26</td>
                  <td className="border px-2 py-1">
                    National Bank Ltd,Gulshan
                  </td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.NationalBankLtdGulshan?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">27</td>
                  <td className="border px-2 py-1">National Bank Ltd,Joina</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.NationalBankLtdJoina?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">28</td>
                  <td className="border px-2 py-1">Sonali Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.SonaliBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">29</td>
                  <td className="border px-2 py-1">Uttara Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.UttaraBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">30</td>
                  <td className="border px-2 py-1">Agrani Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.AgraniBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">31</td>
                  <td className="border px-2 py-1">Bangladesh Krishi Bank</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.BangladeshKrishiBank?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border px-2 py-1">
                  <td className="border px-2 py-1">32</td>
                  <td className="border px-2 py-1">AB Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.ABBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">33</td>
                  <td className="border px-2 py-1">Janata Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.JanataBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-2 py-1">34</td>
                  <td className="border px-2 py-1">Rupali Bank PLC</td>
                  {filteredData.map((item) => (
                    <td key={item.date} className="border px-2 py-1">
                      {item.RupaliBankLtd?.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  <td className="font-bold text-indigo-800 font-serif border px-2 py-1">
                    Total
                  </td>
                  {filteredData.map((item) => (
                    <td
                      key={item.date}
                      className="font-bold text-indigo-800 border px-2 py-1"
                    >
                      {item.total
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  <td className="font-bold text-indigo-800 font-serif border px-2 py-1">
                    Balance With Savings Account
                  </td>
                  {filteredData.map((item) => (
                    <td
                      key={item.date}
                      className="font-bold text-indigo-800 border px-2 py-1"
                    >
                      {item.savings_account
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  <td className="font-bold text-indigo-800 font-serif border px-2 py-1">
                    Balance For Feedmill operation Bank (SFM & RFM)
                  </td>
                  {filteredData.map((item) => (
                    <td
                      key={item.date}
                      className="font-bold text-indigo-800 border px-2 py-1"
                    >
                      {item.sfm_rfm
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  <td className="font-bold text-indigo-800 font-serif border px-2 py-1">
                    Balance with LC facility & Local Payment Bank
                  </td>
                  {filteredData.map((item) => (
                    <td
                      key={item.date}
                      className="font-bold text-indigo-800 border px-2 py-1"
                    >
                      {item.lc
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  <td className="font-bold text-indigo-800 font-serif border px-2 py-1">
                    Balance with OD Account{" "}
                  </td>
                  {filteredData.map((item) => (
                    <td
                      key={item.date}
                      className="font-bold text-indigo-800 border px-2 py-1"
                    >
                      {item.od
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  <td className="font-bold text-indigo-800 font-serif border px-2 py-1">
                    Balance with sales Collection Bank Account{" "}
                  </td>
                  {filteredData.map((item) => (
                    <td
                      key={item.date}
                      className="font-bold text-indigo-800 border px-2 py-1"
                    >
                      {item.scb
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceReport;
