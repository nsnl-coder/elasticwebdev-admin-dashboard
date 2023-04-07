import Pagination from '@src/common/table/pagination/Pagination';
import Table from '@src/common/table/Table';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export default function Home() {
  return (
    <div>
      <Table />
      <Pagination
        totalPages={10}
        matchedResults={50}
        currentPage={1}
        results={10}
      />
    </div>
  );
}
