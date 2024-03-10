import React from 'react'
import { FilterSelectorWrapper } from "./styled"

interface FilterSelectorProps {
  selectedValue: string
  handleChange: (value: string) => void
}

const FilterSelector: React.FC<FilterSelectorProps> = ({ selectedValue, handleChange }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    handleChange(selectedValue); // Вызываем переданный обработчик с новым значением
  };

  return (
    <FilterSelectorWrapper>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="price">По цене</option>
        <option value="product">По названию</option>
        <option value="brand">По бренду</option>
      </select>
    </FilterSelectorWrapper>
  );
}

export default FilterSelector
