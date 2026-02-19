"use client";
import Image from "next/image";
import React, { useState } from "react";
import Png from "@/assets/Png";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Page() {
  const [formData, setFormData] = useState({
    country: "UNITED STATES",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="nft-checkout-main">
        <div className="nft-checkout-inner">
          <div className="nft-checkout-left">
            <div className="nft-checkout-content-sec">
              <Image
                className="logo-checkout"
                src={Png.logoBlack}
                width={61}
                height={48}
                alt="JOY"
              />
              <Image
                className="check-left-img"
                src={Png.checkoutImg}
                alt="check-left-img"
              />
              <h1 className="checkout-title">Joy Console</h1>
              <p className="common-text">
                Vivamus malesuada varius consequat. Nulla facilisi. Quisque
                fermentum tempus quam congue ornare. In molestie egestas turpis,
                et luctus eros sagittis at.
              </p>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                className="best-for-btn-sec"
              >
                <ToggleButton
                  value="left"
                  aria-label="left aligned"
                  className="cus-toggle-btn"
                >
                  16 GB
                </ToggleButton>
                <ToggleButton
                  value="center"
                  aria-label="centered"
                  className="cus-toggle-btn"
                >
                  32 GB
                </ToggleButton>
              </ToggleButtonGroup>
              <h1 className="checkout-value">
                $499<span>.99</span>
              </h1>
            </div>
          </div>
          <div className="nft-checkout-right">
            <div className="nft-tab-sec">
              <Box sx={{ width: "100%" }} className="tab-container">
                <Box className="tabs-sec">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className="cus-tabs"
                  >
                    <Tab
                      className="cus-tab"
                      label="Credit card"
                      {...a11yProps(0)}
                    />
                    <Tab className="cus-tab" label="Crypto" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="cus-tab-content">
                    <div className="form-section">
                      <h2 className="section-title">Delivery</h2>
 <div className="input-label-wrapper">
                          <p className="cus-inp-label">Country / region</p>
                      <div className="form-control">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value="UNITED STATES">UNITED STATES</option>
                          <option value="United states">United states</option>
                          <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                        </select>
                      </div>
                      </div>

                      <div className="form-row">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="FIRST NAME"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="LAST NAME"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <input
                        type="text"
                        name="address"
                        placeholder="ADDRESS"
                        value={formData.address}
                        onChange={handleInputChange}
                      />

                      <input
                        type="text"
                        name="address2"
                        placeholder="ADDRESS 2, SUITE, UNIT (OPTIONAL)"
                        value={formData.address2}
                        onChange={handleInputChange}
                      />

                      <div className="form-row">
                        <input
                          type="text"
                          name="city"
                          placeholder="CITY"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        >
                          <option value="">STATE</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                        </select>
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="ZIP CODE"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Shipping Section */}
                    <div className="form-section">
                      <h2 className="section-title">Shipping</h2>
                      <div className="shipping-info">
                        Enter your shipping address to view available shipping
                        methods.
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="form-section">
                      <h2 className="section-title">Payment</h2>

                      <div className="input-label-wrapper">
                      <div className="card-input-wrapper">
                        <p className="cus-inp-label">Credit card</p>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="XXXX - XXXX - XXXX - XXXX"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          // maxLength="19"
                        />
                        <span className="card-icon">
                          <Image
                            src={Png.visa}
                            alt="Visa"
                            className="visa-icon"
                          />
                        </span>
                      </div>
                      </div>

                      <div className="form-row">
                         <div className="input-label-wrapper">
                          <p className="cus-inp-label">Date</p>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="XX/XX"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          // maxLength="5"
                        />
                        </div>
                        <div className="input-label-wrapper">
                        <p className="cus-inp-label">CVC</p>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="XXX"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          // maxLength="3"
                        />
                      </div>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button className="pay-button">PAY NOW</button>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className="cus-tab-content">
                    <div className="form-section">
                      <h2 className="section-title">Delivery</h2>

                      <div className="form-control">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value="UNITED STATES">UNITED STATES</option>
                          <option value="United states">United states</option>
                          <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                        </select>
                      </div>

                      <div className="form-row">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="FIRST NAME"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="LAST NAME"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <input
                        type="text"
                        name="address"
                        placeholder="ADDRESS"
                        value={formData.address}
                        onChange={handleInputChange}
                      />

                      <input
                        type="text"
                        name="address2"
                        placeholder="ADDRESS 2, SUITE, UNIT (OPTIONAL)"
                        value={formData.address2}
                        onChange={handleInputChange}
                      />

                      <div className="form-row">
                        <input
                          type="text"
                          name="city"
                          placeholder="CITY"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        >
                          <option value="">STATE</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                        </select>
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="ZIP CODE"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Shipping Section */}
                    <div className="form-section">
                      <h2 className="section-title">Shipping</h2>
                      <div className="shipping-info">
                        Enter your shipping address to view available shipping
                        methods.
                      </div>
                    </div>

                  

                    {/* Pay Button */}
                    <button className="pay-button">PAY NOW</button>
                  </div>
                </CustomTabPanel>
              </Box>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
