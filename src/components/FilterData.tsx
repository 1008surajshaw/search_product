import React, { useState, useEffect, ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
}

const FilterData: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [record, setRecord] = useState<Product[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchDatas = async () => {
    const API_URL = "https://fakestoreapi.com/products";
    setLoading(true);
    try {
      const resp = await fetch(API_URL);
      const datas: Product[] = await resp.json();
      setData(datas);
      setRecord(datas);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const filterData = debounce((value: string) => {
    setSearchText(value);
    const filteredData = data.filter(product =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setRecord(filteredData);

    // Automatically select the first option when filtering
    if (filteredData.length > 0) {
      setSelectedOption(filteredData[0].title);
    } else {
      setSelectedOption(null);
    }
  }, 300);
  
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    filterData(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = event.target.value;
    setSelectedOption(selectedTitle);

    // Find the corresponding product
    const selectedProduct = record.find(product => product.title === selectedTitle);

    if (selectedProduct) {
      // Navigate to the selected product
      navigate(`/product/${selectedProduct.id}`);
    }
  };

  return (
    <div className="form-content">
      
      <div className="form-data">
        <input
          type="text"
          onChange={handleInputChange}
          className="input-box"
          placeholder="Search here..."
        />
        <select
          value={selectedOption || ""}
          onChange={handleSelectChange}
          className="option-select"
        >
          <option value="" disabled>
            Select an option
          </option>
          {record.map((option) => (


            <option key={option.id} value={option.title}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterData;
