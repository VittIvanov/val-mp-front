import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PaginationWrapper } from './styled';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, goToPage }) => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    goToPage(currentPage + 1);
    navigate(`/?page=${currentPage + 1}`);
  };

  const handlePreviousPage = () => {
    goToPage(currentPage - 1);
    navigate(`/?page=${currentPage - 1}`);
  };

  return (
    <PaginationWrapper>
      <h1>Рекомендуемые товары:</h1>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Предыдущая страница
      </button>
      <span>Страница {currentPage} из {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Следующая страница
      </button>
    </PaginationWrapper>
  );
};

export default Pagination;
