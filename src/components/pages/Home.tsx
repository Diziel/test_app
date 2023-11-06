import React from 'react';
import Table from '../UI/Table/Table';
import Form from '../UI/Form/Form';
import CloneTable from '../UI/CloneTable/CloneTable';
import { selectClonedTableData, isCloneVisible } from '../../store/tableSlice';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import './Home.scss'

const Home: React.FC = () => {
  const isCloneTableVisible = useSelector(isCloneVisible);
  const clonedTableData = useSelector(selectClonedTableData);
  
  const cloneTableAnimation = useSpring({
    opacity: isCloneTableVisible ? 1 : 0,
  });
  
  return (
    <div id="home">
      <Form />
      <Table />
      <animated.div style={cloneTableAnimation}>
        {clonedTableData.length !== 0 && <CloneTable tableData={clonedTableData} />}
      </animated.div>
    </div>
  );
};

export default Home;
